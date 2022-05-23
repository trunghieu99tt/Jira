import { Module } from '@nestjs/common';
import { OrmModule } from 'src/orm.module';
import { AttachmentModule } from '../attachment/attachment.module';
import { CommentModule } from '../comment/comment.module';
import { FileModule } from '../file/file.module';
import { ProjectUserModule } from '../project-user/project-user.module';
import { UserModule } from '../user/user.module';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';

@Module({
  imports: [
    OrmModule,
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
