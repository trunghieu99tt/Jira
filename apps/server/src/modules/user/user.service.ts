import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Service } from 'src/common/generics/service.generic';
import { In } from 'typeorm';
import { FileService } from '../file/services/file.service';
import { UserOutput } from './dtos/user-output.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { compare, hash } from 'bcrypt';
import { RegisterInput } from '../auth/dtos/register-input.dto';

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

  async getUserInfo(userId: number): Promise<Partial<User>> {
    const user = await this.findOne({
      where: {
        id: userId,
      },
      select: ['id', 'name', 'avatarFileId'],
    });
    let avatar = '';
    if (user?.avatarFileId && typeof user.avatarFileId === 'number') {
      avatar = await this.fileService.getFileUrl(user.avatarFileId);
    }

    return plainToClass(UserOutput, {
      ...user,
      avatar,
    });
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

  async validateUsernamePassword(
    username: string,
    password: string,
  ): Promise<Partial<User>> {
    const user = await this.repository.findOne({
      where: {
        username,
      },
      select: ['id', 'username'],
    });

    if (!user) {
      throw new NotFoundException('Invalid username.');
    }

    const match = await compare(password, user.password);
    if (!match) {
      throw new NotFoundException('Invalid password.');
    }

    return user;
  }

  async createUser(input: RegisterInput): Promise<User> {
    const user = plainToClass(User, input);
    user.password = await hash(user.password, 10);
    return this.repository.save(user);
  }
}
