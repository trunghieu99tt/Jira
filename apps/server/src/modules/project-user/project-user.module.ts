import { Module } from '@nestjs/common';
import { OrmModule } from 'src/orm.module';
import { ProjectUserService } from './services/project-user.service';

@Module({
  imports: [OrmModule],
  providers: [ProjectUserService],
  exports: [ProjectUserService],
})
export class ProjectUserModule {}
