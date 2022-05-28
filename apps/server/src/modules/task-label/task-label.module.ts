import { Module } from '@nestjs/common';
import { OrmModule } from 'src/orm.module';
import { LabelModule } from '../label/label.module';
import { TaskLabelResolver } from './task-label.resolver';
import { TaskLabelService } from './task-label.service';

@Module({
  imports: [OrmModule, LabelModule],
  providers: [TaskLabelService, TaskLabelResolver],
  exports: [TaskLabelService],
})
export class TaskLabelModule {}
