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
import { CommentService } from '../comment/comment.service';

@Injectable()
export class TaskService extends Service<Task, TaskRepository> {
  constructor(
    repository: TaskRepository,
    private readonly connection: Connection,
    private readonly userService: UserService,
    private readonly fileService: FileService,
    private readonly commentService: CommentService,
    private readonly projectUserService: ProjectUserService,
    private readonly attachmentService: AttachmentService,
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
        'updatedAt',
      ],
      order: {
        updatedAt: 'DESC',
      },
    });

    const assignees = await this.getTasksAssignees(boardTasks);
    const assigneesAvatars = await this.getAssigneesAvatars(assignees);

    return Promise.all(
      boardTasks?.map(async (task: Partial<Task>) => {
        const { numberOfAttachments, numberOfComments } =
          await this.getTaskStatistic(task.id);
        const assignee =
          (task?.assigneeUserId &&
            this.getTaskAssignee(assignees, task.assigneeUserId)) ||
          null;

        return plainToClass(BoardTask, {
          ...ObjectTool.omit(task, ['assigneeUserId']),
          assigneeAvatar:
            (assignee?.avatarFileId &&
              assigneesAvatars?.[assignee?.avatarFileId]) ||
            '',
          assigneeName: assignee?.name || '',
          numberOfAttachments,
          numberOfComments,
        });
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
    const countTasks = await this.count({
      where: {
        boardId: input.boardId,
      },
    });
    const newTaskObj = plainToClass(Task, {
      ...input,
      listPosition: countTasks + 1,
    });

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
          if (!newBoardId) {
            throw new Error(
              'newBoardId is required for move task update.Please check your input',
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

  private async getTasksAssignees(
    tasks: Partial<Task>[],
  ): Promise<Partial<User>[]> {
    const assigneeUserIds = tasks
      .map((task: Partial<Task>) => task.assigneeUserId)
      .filter(Boolean);
    return this.userService.findList({
      where: {
        id: In(assigneeUserIds),
      },
      select: ['avatarFileId', 'name', 'id'],
    });
  }

  private getTaskAssignee(
    assignees: Partial<User>[],
    assigneeUserId: number,
  ): Partial<User> | undefined {
    return assignees?.find((user: Partial<User>) => {
      if (!assigneeUserId) {
        return false;
      }
      if (!user.id || !assigneeUserId) return false;
      return +user.id === +assigneeUserId;
    });
  }

  private async getAssigneesAvatars(assignees: Partial<User>[]): Promise<{
    [key: string]: string;
  }> {
    const userAvatarFileIds = (assignees
      ?.map((user: Partial<User>) => user?.avatarFileId)
      .filter(Boolean) || []) as number[];
    return this.fileService.getFileUrls(userAvatarFileIds);
  }

  private async getTaskStatistic(taskId: number | undefined): Promise<{
    numberOfComments: number;
    numberOfAttachments: number;
  }> {
    if (!taskId) {
      return {
        numberOfComments: 0,
        numberOfAttachments: 0,
      };
    }

    const [numberOfAttachments, numberOfComments] = await Promise.all([
      this.attachmentService.count({
        where: {
          taskId,
        },
      }),
      this.commentService.count({
        where: {
          taskId,
        },
      }),
    ]);

    return {
      numberOfAttachments,
      numberOfComments,
    };
  }
}
