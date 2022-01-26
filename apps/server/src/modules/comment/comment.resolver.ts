import { Args, Int, Resolver, Query } from '@nestjs/graphql';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';

@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query((returns: any) => [Comment])
  async comments(
    @Args('taskId', { type: () => Int }) taskId: number,
  ): Promise<Comment[]> {
    return this.commentService.findCommentsByTaskId(taskId);
  }
}
