import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Service } from 'src/common/generics/service.generic';
import { Connection, In } from 'typeorm';
import { AttachmentService } from '../attachment/attachment.service';
import { FileService } from '../file/services/file.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { BoardTask } from './dtos/board-task-output.dto';
import { CreateTaskInput } from './dtos/create-task-input.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { ObjectTool } from 'tools';
import { UpdateTaskInput } from './dtos/update-task-input.dto';
import { UPDATE_TYPE } from './constants/task.constant';
import { TaskUser } from './dtos/task-user-output.dto';
import { ProjectUserService } from '../project-user/services/project-user.service';
import { AttachmentOutput } from './dtos/attachment-output.dto';

@Injectable()
export class TaskService extends Service<Task, TaskRepository> {
  constructor(
    repository: TaskRepository,
    private readonly connection: Connection,
    private readonly userService: UserService,
    private readonly fileService: FileService,
    private readonly attachmentService: AttachmentService,
    private readonly projectUserService: ProjectUserService,
  ) {
    super(repository);
  }

  async findTaskById(id: number): Promise<Task> {
    const task = await this.repository.findOne(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async findTasksByIds(ids: number[]): Promise<Task[]> {
    return this.repository.findByIds(ids);
  }

  async findTasksByBoardId(boardId: number): Promise<BoardTask[]> {
    const boardTasks = await this.findList({
      where: {
        boardId,
      },
      select: [
        'id',
        'name',
        'priority',
        'type',
        'assigneeUserId',
        'listPosition',
      ],
      order: {
        updatedAt: 'DESC',
      },
    });

    let assigneeUserIds =
      boardTasks
        .map((task: Partial<Task>) => task.assigneeUserId)
        .filter(Boolean) || [];
    assigneeUserIds = [...new Set(assigneeUserIds)];
    const users = await this.userService.findList({
      where: {
        id: In(assigneeUserIds),
      },
      select: ['avatarFileId', 'name', 'id'],
    });

    const userAvatarFileIds = (users
      ?.map((user: Partial<User>) => user?.avatarFileId)
      .filter(Boolean) || []) as number[];

    const userAvatarList = await this.fileService.getFileUrls(
      userAvatarFileIds,
    );

    return plainToClass(
      BoardTask,
      boardTasks.map((boardTask: Partial<Task>) => {
        let assignee = null;
        if (boardTask?.assigneeUserId) {
          assignee = users?.find((user: Partial<User>) => {
            if (!boardTask?.assigneeUserId) {
              return false;
            }
            if (!user.id || !boardTask?.assigneeUserId) return false;
            return +user.id === +boardTask.assigneeUserId;
          });
        }

        let assigneeAvatar = '';
        let assigneeName = '';
        if (assignee?.avatarFileId) {
          assigneeAvatar = userAvatarList[assignee.avatarFileId];
        }
        if (assignee?.name) {
          assigneeName = assignee.name;
        }

        return {
          ...ObjectTool.omit(boardTask, ['assigneeUserId']),
          assigneeAvatar,
          assigneeName,
        };
      }),
    );
  }

  async createNewTask(input: CreateTaskInput): Promise<Task> {
    const attachmentIds = input.attachmentFileIds.split(',').map(Number);
    const attachments = await this.attachmentService.findList({
      where: {
        id: In(attachmentIds),
      },
    });
    const newTaskObj = plainToClass(Task, input);

    return this.connection.transaction(async (manager) => {
      const newTaskDb = await manager.save(newTaskObj);
      const updatedAttachments = attachments.map((attachment) => {
        attachment.taskId = newTaskDb.id;
        return attachment;
      });
      await manager.save(updatedAttachments);
      return newTaskDb;
    });
  }

  async updateTask(input: UpdateTaskInput): Promise<Task> {
    const { updateType, id } = input;

    const task = await this.findOne({
      where: {
        id,
      },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    switch (updateType) {
      case UPDATE_TYPE.MOVE_TASK:
        {
          const { newBoardId, listPosition } = input;
          if (!newBoardId || !listPosition) {
            throw new Error(
              'newBoardId and listPosition is required for move task update.Please check your input',
            );
          }
          task.boardId = newBoardId;
          task.listPosition = listPosition;
        }
        break;
      case UPDATE_TYPE.UPDATE_BOARD:
        {
          const { newBoardId } = input;
          if (!newBoardId) {
            throw new Error(
              'newBoardId is required for update board update.Please check your input',
            );
          }
          task.boardId = newBoardId;
        }
        break;
      case UPDATE_TYPE.UPDATE_ASSIGNEE:
        {
          const { assigneeUserId } = input;
          if (!assigneeUserId) {
            throw new Error(
              'assigneeUserId is required for update assignee update.Please check your input',
            );
          }
          task.assigneeUserId = assigneeUserId;
        }
        break;
      case UPDATE_TYPE.UPDATE_DESCRIPTION:
        {
          const { description } = input;
          if (!description) {
            throw new Error(
              'description is required for update description update.Please check your input',
            );
          }
          task.description = description;
        }
        break;
      case UPDATE_TYPE.UPDATE_PRIORITY:
        {
          const { priority } = input;
          if (!priority) {
            throw new Error(
              'priority is required for update priority update.Please check your input',
            );
          }
          task.priority = priority;
        }
        break;
      case UPDATE_TYPE.UPDATE_NAME:
        {
          const { name } = input;
          if (!name) {
            throw new Error(
              'name is required for update name update.Please check your input',
            );
          }
          task.name = name;
        }
        break;
      case UPDATE_TYPE.UPDATE_TYPE:
        {
          const { type } = input;
          if (!type) {
            throw new Error(
              'type is required for update type update.Please check your input',
            );
          }
          task.type = type;
        }
        break;
      case UPDATE_TYPE.UPDATE_SUMMARY:
        {
          const { summary } = input;
          if (!summary) {
            throw new Error(
              'summary is required for update summary update.Please check your input',
            );
          }
          task.summary = summary;
        }
        break;
      default: {
        console.error(`updateType ${updateType} is not supported`);
      }
    }

    return this.repository.save(task);
  }

  async getTaskUser(userId: number): Promise<TaskUser> {
    const taskUser = await this.userService.findOne({
      where: {
        id: userId,
      },
      select: ['id', 'name', 'avatarFileId'],
    });
    if (!taskUser) {
      throw new NotFoundException('User not found');
    }

    let avatar = '';
    if (taskUser?.avatarFileId) {
      avatar = await this.fileService.getFileUrl(taskUser.avatarFileId);
    }

    return plainToClass(TaskUser, {
      userId: taskUser.id,
      name: taskUser.name,
      avatar,
    });
  }

  async getTaskAttachments(taskId: number): Promise<AttachmentOutput[]> {
    const attachments = await this.attachmentService.findList({
      where: {
        taskId,
      },
      select: ['id', 'fileId', 'taskId'],
    });

    const attachmentFileIds =
      attachments
        ?.map((attachment) => attachment?.fileId || null)
        ?.filter(Boolean) || [];

    const files = await this.fileService.findList({
      where: {
        id: In(attachmentFileIds),
      },
      select: ['id', 'filename', 'type'],
    });
    const attachmentFileUrls = await this.fileService.getFileUrls(
      attachmentFileIds as number[],
    );

    return plainToClass(
      AttachmentOutput,
      attachments.map((attachment) => ({
        id: attachment.id,
        url: attachment?.fileId ? attachmentFileUrls[attachment.fileId] : '',
        name: files?.find((file) => file.id === attachment.fileId)?.filename,
        taskId: attachment.taskId,
        type: files?.find((file) => file.id === attachment.fileId)?.type,
        fileId: attachment.fileId,
      })),
    );
  }
}
