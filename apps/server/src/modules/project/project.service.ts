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
import { CreateProjectInput } from './dtos/create-project-input.dto';
import { DEFAULT_BOARD_NAMES } from './constants/project.constant';
import { Board } from '../board/board.entity';

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
      relations: ['boards'],
    });
  }

  async createNewProject(
    createBoardInput: CreateProjectInput,
  ): Promise<Project> {
    const response = await this.connection.transaction(
      async (manager: EntityManager) => {
        const newProject = plainToClass(Project, createBoardInput);
        const user = await manager.findOne(User, createBoardInput.ownerId);
        if (!user) throw new Error('User not found');
        newProject.owner = user;
        const board = await manager.save(newProject);

        // create some default boards
        for (let i = 0; i < DEFAULT_BOARD_NAMES.length; i += 1) {
          const newBoard = plainToClass(Board, {
            name: DEFAULT_BOARD_NAMES[i],
            project: board,
          });
          await manager.save(newBoard);
        }
        return board;
      },
    );
    return response;
  }
}
