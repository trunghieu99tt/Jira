import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskLabelRepository } from './task-label.repository';
import { TaskLabelService } from './task-label.service';
import { LabelModule } from '../label/label.module';
import { TaskLabelResolver } from './task-label.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([TaskLabelRepository]), LabelModule],
  providers: [TaskLabelService, TaskLabelResolver],
  exports: [TaskLabelService],
})
export class TaskLabelModule {}
