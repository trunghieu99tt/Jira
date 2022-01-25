/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Resolver((of: any) => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query((returns) => Task)
  async task(@Args('id', { type: () => Int }) id: number): Promise<Task> {
    return this.taskService.findTaskById(id);
  }
}
