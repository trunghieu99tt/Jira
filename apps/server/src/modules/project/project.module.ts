import { Module } from '@nestjs/common';
import { OrmModule } from 'src/orm.module';
import { FileModule } from '../file/file.module';
import { UserModule } from '../user/user.module';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';

@Module({
  imports: [OrmModule, FileModule, UserModule, FileModule],
  exports: [ProjectService],
  providers: [ProjectService, ProjectResolver],
})
export class ProjectModule {}
