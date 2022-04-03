import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Connection, EntityManager } from 'typeorm';

// generic
import { Service } from 'src/common/generics/service.generic';

// entities
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
import { ProjectUser } from '../project-user/entities/project-user.entity';

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
    const project = await this.findOne({
      where: {
        id,
      },
    });

    if (!project) {
      throw new Error('Project not found');
    }
    return project;
  }

  async createNewProject(
    createBoardInput: CreateProjectInput,
  ): Promise<Project> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const newProjectObj = plainToClass(Project, createBoardInput);
      const newProjectDb = await manager.save(newProjectObj);

      const newBoardList = [];
      for (let i = 0; i < DEFAULT_BOARD_NAMES.length; i += 1) {
        const newBoard = plainToClass(Board, {
          name: DEFAULT_BOARD_NAMES[i],
          projectId: newProjectDb.id,
        });
        newBoardList.push(newBoard);
      }
      await manager.save(newBoardList);

      const newProjectUser = plainToClass(ProjectUser, {
        projectId: newProjectDb.id,
        userId: newProjectDb.ownerUserId,
        role: 0,
      });
      await manager.save(newProjectUser);
      return newProjectDb;
    });
  }
}
