import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardListModule } from '../board-list/board-list.module';
import { BoardUserModule } from '../board-user/board-user.module';
import { BoardRepository } from './board.repository';
import { BoardResolver } from './board.resolver';
import { BoardService } from './board.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardRepository]),
    BoardListModule,
    BoardUserModule,
  ],
  exports: [BoardService],
  providers: [BoardService, BoardResolver],
})
export class BoardModule {}
