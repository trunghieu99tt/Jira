import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardListRepository } from './board-list.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BoardListRepository])],
})
export class BoardListModule {}
