import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { ProjectUserRepository } from './project-user.repository';
import { ProjectUserResolver } from './project-user.resolver';
import { ProjectUserService } from './project-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectUserRepository]), UserModule],
  providers: [ProjectUserService, ProjectUserResolver],
  exports: [ProjectUserService, ProjectUserResolver],
})
export class BoardUserModule {}
