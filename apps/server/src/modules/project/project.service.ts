import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Connection, EntityManager } from 'typeorm';

// generic
import { Service } from 'src/common/generics/service.generic';

// entities
import { User } from '../user/user.entity';
import { Project } from './project.entity';

// repositories
import { ProjectRepository } from './project.repository';

import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
} from 'src/common/constants/common.constant';
import { CreateBoardInput } from './dtos/create-project-input.dto';

@Injectable()
export class ProjectService extends Service<Project, ProjectRepository> {
  constructor(
    repository: ProjectRepository,
    private readonly connection: Connection,
  ) {
    super(repository);
  }

  async findAllProjects(
    offset = DEFAULT_OFFSET,
    limit = DEFAULT_LIMIT,
  ): Promise<Partial<Project>[]> {
    return this.findList({
      order: {
        updatedAt: 'DESC',
      },
      skip: offset,
      take: limit,
    });
  }

  async findProjectById(id: number): Promise<Partial<Project>> {
    return this.findOne({
      where: {
        id,
      },
    });
  }

  async createNewProject(createBoardInput: CreateBoardInput): Promise<Project> {
    const response = await this.connection.transaction(
      async (manager: EntityManager) => {
        const newBoard = plainToClass(Project, createBoardInput);
        const user = await manager.findOne(User, createBoardInput.ownerId);
        if (!user) throw new Error('User not found');
        newBoard.owner = user;
        const board = await manager.save(newBoard);
        return board;
      },
    );

    return response;
  }
}
