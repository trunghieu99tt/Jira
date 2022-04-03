import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskLabel } from './task-label.entity';
import { TaskLabelService } from './task-label.service';
import { LabelService } from '../label/label.service';
import { CreateCommentInput } from '../comment/dtos/create-comment-input.dto';
import { UpdateTaskLabelsInputDto } from './dtos/update-task-labels-input.dto';
import { TaskLabelOutput } from './dtos/task-label-output.dto';

@Resolver(() => TaskLabel)
export class TaskLabelResolver {
  constructor(private readonly taskLabelService: TaskLabelService) {}

  @Query(() => [TaskLabelOutput])
  async taskLabels(
    @Args('taskId', { type: () => Int }) taskId: number,
  ): Promise<TaskLabelOutput[]> {
    return this.taskLabelService.getTaskLabels(taskId);
  }

  @Mutation(() => Boolean)
  async updateTaskLabels(
    @Args('updateTaskLabelsInput') input: UpdateTaskLabelsInputDto,
  ): Promise<boolean> {
    return this.taskLabelService.updateTaskLabels(input);
  }
}
