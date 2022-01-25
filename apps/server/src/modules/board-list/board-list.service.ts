import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardList } from './board-list.entity';
import { BoardListRepository } from './board-list.repository';

@Injectable()
export class BoardListService {
  constructor(private readonly repository: BoardListRepository) {}

  async findBoardListById(id: number): Promise<BoardList> {
    const boardList = await this.repository.findOne(id);
    if (!boardList) {
      throw new NotFoundException('BoardList not found');
    }
    return boardList;
  }

  async findBoardListsByBoardId(boardId: number): Promise<BoardList[]> {
    return this.repository.find({
      where: { board: { id: boardId } },
    });
  }
}
