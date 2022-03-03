import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async findUserById(id: number): Promise<User> {
    const user = await this.repository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findUserByUserBoardId(userBoardId: number): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        boardUsers: {
          id: userBoardId,
        },
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
