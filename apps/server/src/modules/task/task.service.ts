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

@Injectable()
export class TaskService extends Service<Task, TaskRepository> {
  constructor(
    repository: TaskRepository,
    private readonly connection: Connection,
    private readonly userService: UserService,
    private readonly fileService: FileService,
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
      select: ['id', 'name', 'priority', 'type', 'assigneeUserId'],
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
      select: ['avatarFileId', 'name'],
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
        const assignee = users?.find(
          (user: Partial<User>) => user.id === boardTask.assigneeUserId,
        );
        let assigneeAvatar = '';
        let assigneeName = '';
        if (assignee?.avatarFileId && assignee?.name) {
          assigneeAvatar = userAvatarList[assignee.avatarFileId];
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
}
