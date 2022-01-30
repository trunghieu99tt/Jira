import { Injectable } from '@nestjs/common';
import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
} from 'src/common/constants/common.constant';
import { BoardListService } from '../board-list/board-list.service';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';

@Injectable()
export class BoardService {
  constructor(
    private readonly repository: BoardRepository,
    private readonly boardListService: BoardListService,
  ) {}

  async findAllBoards(
    offset = DEFAULT_OFFSET,
    limit = DEFAULT_LIMIT,
  ): Promise<Board[]> {
    return this.repository.find({
      order: {
        updatedAt: 'DESC',
      },
      skip: offset,
      take: limit,
    });
  }

  async findBoardById(id: number): Promise<Board> {
    const board = await this.repository.findOne(id);
    if (!board) throw new Error('Board not found');
    return board;
  }
}
