import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Connection, In } from 'typeorm';
import { AttachmentService } from '../attachment/attachment.service';
import { CreateTaskInput } from './dtos/create-task-input.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(
    private readonly connection: Connection,
    private readonly repository: TaskRepository,
    private readonly attachmentService: AttachmentService,
  ) {}

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

  async findTasksByBoardListId(boardListId: number): Promise<Task[]> {
    return this.repository.find({
      where: { boardList: { id: boardListId } },
    });
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
