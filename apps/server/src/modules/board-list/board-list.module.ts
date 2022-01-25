import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardListRepository } from './board-list.repository';
import { BoardListService } from './board-list.service';

@Module({
  imports: [TypeOrmModule.forFeature([BoardListRepository])],
  providers: [BoardListService],
  exports: [BoardListService],
})
export class BoardListModule {}
