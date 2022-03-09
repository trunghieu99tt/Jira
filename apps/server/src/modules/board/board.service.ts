import { Injectable, NotFoundException } from '@nestjs/common';
import { Service } from 'src/common/generics/service.generic';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';

@Injectable()
export class BoardService extends Service<Board, BoardRepository> {
  constructor(repository: BoardRepository) {
    super(repository);
  }

  async findBoardById(id: number): Promise<Board> {
    const boardList = await this.repository.findOne(id);
    if (!boardList) {
      throw new NotFoundException('BoardList not found');
    }
    return boardList;
  }

  async findBoardsByProjectId(projectId: number): Promise<Board[]> {
    return this.repository.find({
      where: { projectId },
      select: ['id', 'name'],
    });
  }
}
