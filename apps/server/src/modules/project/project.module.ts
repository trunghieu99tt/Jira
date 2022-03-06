import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from '../board/board.module';
import { FileModule } from '../file/file.module';
import { ProjectUserModule } from '../project-user/project-user.module';
import { UserModule } from '../user/user.module';
import { ProjectRepository } from './project.repository';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectRepository]),
    BoardModule,
    FileModule,
    ProjectUserModule,
    UserModule,
    FileModule,
  ],
  exports: [ProjectService],
  providers: [ProjectService, ProjectResolver],
})
export class ProjectModule {}
