/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTaskInput } from './dtos/create-task-input.dto';
import { UpdateTaskInput } from './dtos/update-task-input.dto';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Resolver((of: any) => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query((returns) => Task)
  async task(@Args('id', { type: () => Int }) id: number): Promise<Task> {
    return this.taskService.findTaskById(id);
  }

  @Mutation((returns) => Task)
  async createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
  ): Promise<Task> {
    return this.taskService.createNewTask(createTaskInput);
  }

  @Mutation((returns) => Task)
  async updateTask(
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
  ): Promise<Task> {
    return this.taskService.updateTask(updateTaskInput);
  }
}
