/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AttachmentOutput } from './dtos/attachment-output.dto';
import { CreateTaskInput } from './dtos/create-task-input.dto';
import { TaskUser } from './dtos/task-user-output.dto';
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

  @ResolveField(() => TaskUser)
  async assignee(@Parent() task: Task): Promise<TaskUser> {
    return this.taskService.getTaskUser(task.assigneeUserId);
  }

  @ResolveField(() => TaskUser)
  async reporter(@Parent() task: Task): Promise<TaskUser> {
    return this.taskService.getTaskUser(task.reporterUserId);
  }

  @ResolveField(() => [AttachmentOutput])
  async attachments(@Parent() task: Task): Promise<AttachmentOutput[]> {
    return this.taskService.getTaskAttachments(task.id);
  }
}
