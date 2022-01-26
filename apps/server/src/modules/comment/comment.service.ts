import { Injectable } from '@nestjs/common';
import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {
  constructor(private readonly repository: CommentRepository) {}

  async findCommentsByTaskId(taskId: number): Promise<Comment[]> {
    return this.repository.find({
      where: { task: { id: taskId } },
    });
  }
}
