import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Service } from 'src/common/generics/service.generic';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { CommentOutput } from './dtos/comment-output.dto';
import { CreateCommentInput } from './dtos/create-comment-input.dto';

@Injectable()
export class CommentService extends Service<Comment, CommentRepository> {
  constructor(
    repository: CommentRepository,
    private readonly userService: UserService,
  ) {
    super(repository);
  }

  async findCommentsByTaskId(taskId: number): Promise<CommentOutput[]> {
    const comments = await this.findList({
      where: {
        taskId,
      },
      select: ['id', 'content', 'taskId', 'userId', 'updatedAt'],
      order: {
        createdAt: 'DESC',
      },
    });
    const commentUserIds = comments.map((comment) => comment.userId);
    const users = await this.userService.getUserInfos(
      commentUserIds as number[],
    );

    return plainToClass(
      CommentOutput,
      comments.map((comment: Partial<Comment>) => {
        let author = {
          name: '',
          avatar: '',
        };

        if (comment.userId) {
          author = users[comment.userId];
        }
        return {
          ...comment,
          userName: author?.name || '',
          userAvatar: author?.avatar || '',
        };
      }),
    );
  }

  async createComment(input: CreateCommentInput): Promise<Comment> {
    const newComment = await this.repository.save(input);
    return {
      ...newComment,
      owner: await this.getOwnerInfo(input.userId),
    };
  }

  async getOwnerInfo(userId: number): Promise<Partial<User>> {
    return this.userService.getUserInfo(userId);
  }
}
