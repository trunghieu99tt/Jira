import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import _ from 'lodash';
import { Service } from 'src/common/generics/service.generic';
import { ObjectTool } from 'tools';
import { In } from 'typeorm';
import {
  runOnTransactionRollback,
  Transactional,
} from 'typeorm-transactional-cls-hooked';
import { Attachment } from '../attachment/attachment.entity';
import { AttachmentRepository } from '../attachment/attachment.repository';
import { CommentRepository } from '../comment/comment.repository';
import { FileService } from '../file/services/file.service';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { AttachmentOutput } from './dtos/attachment-output.dto';
import { BoardTask } from './dtos/board-task-output.dto';
import { CreateTaskInput } from './dtos/create-task-input.dto';
import { TaskUser } from './dtos/task-user-output.dto';
import { UpdateTaskInput } from './dtos/update-task-input.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService extends Service<Task, TaskRepository> {
  constructor(
    repository: TaskRepository,
    private readonly userRepository: UserRepository,
    private readonly fileService: FileService,
    private readonly commentRepository: CommentRepository,
    private readonly attachmentRepository: AttachmentRepository,
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
        'coverPhoto',
        'updatedAt',
      ],
      order: {
        listPosition: 'ASC',
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

        return plainToInstance(BoardTask, {
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

  @Transactional()
  async createNewTask(input: CreateTaskInput): Promise<Task> {
    const attachmentIds = input.attachmentFileIds.split(',').map(Number);
    const attachments = await this.attachmentRepository.find({
      where: {
        id: In(attachmentIds),
      },
    });
    const countTasks = await this.count({
      where: {
        boardId: input.boardId,
      },
    });
    const newTaskObj = plainToInstance(Task, {
      ...input,
      coverPhoto: input?.coverPhoto || '',
      listPosition: countTasks + 1,
    });
    const newTask = await this.repository.save(newTaskObj);
    const updatedAttachments = attachments.map((attachment: Attachment) => {
      attachment.taskId = newTask.id;
      return attachment;
    });
    await this.attachmentRepository.save(updatedAttachments);
    runOnTransactionRollback(() => {
      throw new Error('Internal server error');
    });
    return newTask;
  }

  async updateTask(input: UpdateTaskInput): Promise<Task> {
    const { id } = input;
    const task = await this.findOne({
      where: {
        id,
      },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    const updatedTask = {
      ...task,
      ..._.omit(input, 'updatedType'),
    };

    return this.repository.save(updatedTask);
  }

  async getTaskUser(userId: number): Promise<TaskUser> {
    const taskUser = await this.userRepository.findOne({
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

    return plainToInstance(TaskUser, {
      userId: taskUser.id,
      name: taskUser.name,
      avatar,
    });
  }

  async getTaskAttachments(taskId: number): Promise<AttachmentOutput[]> {
    const attachments = await this.attachmentRepository.find({
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

    return plainToInstance(
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
    return this.userRepository.find({
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
      return user.id == assigneeUserId;
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
      this.attachmentRepository.count({
        where: {
          taskId,
        },
      }),
      this.commentRepository.count({
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
