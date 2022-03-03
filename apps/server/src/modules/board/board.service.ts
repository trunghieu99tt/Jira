import { Injectable, NotFoundException } from '@nestjs/common';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';

@Injectable()
export class BoardService {
  constructor(private readonly repository: BoardRepository) {}

  async findBoardListById(id: number): Promise<Board> {
    const boardList = await this.repository.findOne(id);
    if (!boardList) {
      throw new NotFoundException('BoardList not found');
    }
    return boardList;
  }

  async findBoardsByProjectId(projectId: number): Promise<Board[]> {
    return this.repository.find({
      where: { project: { id: projectId } },
    });
  }
}
