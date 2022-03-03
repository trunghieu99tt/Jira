import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from '../task/task.module';
import { BoardRepository } from './board.repository';
import { BoardResolver } from './board.resolver';
import { BoardService } from './board.service';

@Module({
  imports: [TypeOrmModule.forFeature([BoardRepository]), TaskModule],
  providers: [BoardService, BoardResolver],
  exports: [BoardService],
})
export class BoardModule {}
