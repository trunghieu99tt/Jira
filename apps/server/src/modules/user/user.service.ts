import { Injectable, NotFoundException } from '@nestjs/common';
import { Service } from 'src/common/generics/service.generic';
import { In } from 'typeorm';
import { FileService } from '../file/services/file.service';
import { UserOutput } from './dtos/user-output.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService extends Service<User, UserRepository> {
  constructor(
    repository: UserRepository,
    private readonly fileService: FileService,
  ) {
    super(repository);
  }

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

  async getUserInfos(userIds: number[]): Promise<{
    [key: number]: UserOutput;
  }> {
    const users = await this.findList({
      where: {
        id: In(userIds),
      },
      select: ['id', 'name', 'avatarFileId'],
    });

    const avatarFileIds = users
      .map((user) => user?.avatarFileId)
      .filter(Boolean) as number[];
    const avatarFiles = await this.fileService.getFileUrls(avatarFileIds);

    return users.reduce((acc, user) => {
      if (user?.id && typeof user.id === 'number' && user?.avatarFileId) {
        (acc as any)[user.id] = {
          ...user,
          avatar: avatarFiles[user.avatarFileId],
        };
      }
      return acc;
    }, {});
  }
}
