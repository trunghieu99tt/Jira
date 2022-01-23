import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { TaskResolver } from './task.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository])],
  providers: [TaskResolver],
})
export class TaskModule {}
