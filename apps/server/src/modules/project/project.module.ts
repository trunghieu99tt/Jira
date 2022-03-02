import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from '../board/board.module';
import { BoardUserModule } from '../project-user/project-user.module';
import { ProjectRepository } from './project.repository';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectRepository]),
    BoardModule,
    BoardUserModule,
  ],
  exports: [ProjectService],
  providers: [ProjectService, ProjectResolver],
})
export class ProjectModule {}
