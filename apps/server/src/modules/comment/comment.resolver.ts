import {
  Args,
  Int,
  Resolver,
  Query,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { User } from '../user/user.entity';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { CommentOutput } from './dtos/comment-output.dto';
import { CreateCommentInput } from './dtos/create-comment-input.dto';

@Resolver(() => Comment)
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
    const response = await this.commentService.createComment(input);
    console.log('response', response);
    return response;
  }

  @ResolveField(() => User)
  async owner(@Parent() comment: Comment): Promise<Partial<User>> {
    const { userId } = comment;
    return this.commentService.getOwnerInfo(userId);
  }
}
