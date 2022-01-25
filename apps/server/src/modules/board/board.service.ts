import { Injectable } from '@nestjs/common';
import { BoardListService } from '../board-list/board-list.service';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';

@Injectable()
export class BoardService {
  constructor(
    private readonly repository: BoardRepository,
    private readonly boardListService: BoardListService,
  ) {}

  async findBoardById(id: number): Promise<Board> {
    const board = await this.repository.findOne(id);
    if (!board) throw new Error('Board not found');
    return board;
  }
}
