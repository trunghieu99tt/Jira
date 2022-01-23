import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository])],
})
export class CommentModule {}
