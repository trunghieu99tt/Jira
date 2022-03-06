import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectUserRepository } from './repositories/project-user.repository';
import { ProjectUserService } from './services/project-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectUserRepository])],
  providers: [ProjectUserService],
  exports: [ProjectUserService],
})
export class ProjectUserModule {}
