import { Args, Int, Resolver, Query, Mutation } from '@nestjs/graphql';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { CommentOutput } from './dtos/comment-output.dto';
import { CreateCommentInput } from './dtos/create-comment-input.dto';

@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => [Comment])
  async comments(
    @Args('taskId', { type: () => Int }) taskId: number,
  ): Promise<CommentOutput[]> {
    return this.commentService.findCommentsByTaskId(taskId);
  }

  @Mutation(() => Comment)
  async createComment(
    @Args('createCommentInput') input: CreateCommentInput,
  ): Promise<Comment> {
    return this.commentService.createComment(input);
  }
}
