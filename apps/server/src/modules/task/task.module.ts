import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttachmentModule } from '../attachment/attachment.module';
import { CommentModule } from '../comment/comment.module';
import { FileModule } from '../file/file.module';
import { ProjectUserModule } from '../project-user/project-user.module';
import { UserModule } from '../user/user.module';
import { TaskRepository } from './task.repository';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]),
    UserModule,
    FileModule,
    AttachmentModule,
    ProjectUserModule,
    CommentModule,
  ],
  providers: [TaskService, TaskResolver],
  exports: [TaskService],
})
export class TaskModule {}
