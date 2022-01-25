import { Injectable } from '@nestjs/common';
import { BoardUser } from './board-user.entity';
import { BoardUserRepository } from './board-user.repository';

@Injectable()
export class BoardUserService {
  constructor(private readonly repository: BoardUserRepository) {}

  async findBoardUserByBoardId(boardId: number): Promise<BoardUser[]> {
    return this.repository.find({
      where: { board: { id: boardId } },
    });
  }
}
