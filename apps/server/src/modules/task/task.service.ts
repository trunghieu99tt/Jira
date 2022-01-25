import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly repository: TaskRepository) {}

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
}
