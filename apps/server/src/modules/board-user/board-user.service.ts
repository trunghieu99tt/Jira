import { Injectable } from '@nestjs/common';
import { BoardUser } from './board-user.entity';
import { BoardUserRepository } from './board-user.repository';

@Injectable()
export class BoardUserService {
  constructor(private readonly repository: BoardUserRepository) {}

  async findBoardUsersByBoardId(
    boardId: number,
    offset = 0,
    limit = 5,
  ): Promise<BoardUser[]> {
    return this.repository.find({
      where: { board: { id: boardId } },
      skip: offset,
      take: limit,
      relations: ['user'],
    });
  }

  async countNumberOfBoardUsers(boardId: number): Promise<number> {
    return this.repository.count({
      where: {
        board: { id: boardId },
      },
    });
  }
}
