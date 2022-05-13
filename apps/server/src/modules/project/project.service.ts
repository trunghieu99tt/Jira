import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';
import { Service } from 'src/common/generics/service.generic';
import { paginate } from 'src/common/tools/paginate';
import { Connection, EntityManager } from 'typeorm';
import { Board } from '../board/board.entity';
import { ProjectUser } from '../project-user/entities/project-user.entity';
import { DEFAULT_BOARD_NAMES } from './constants/project.constant';
import { CreateProjectInput } from './dtos/create-project-input.dto';
import { PaginatedProjects } from './dtos/paginated-project';
import { UpdateProjectInput } from './dtos/update-project-input.dto';
import { Project } from './project.entity';
import _ from 'lodash';
import { ProjectRepository } from './project.repository';

_.map;

@Injectable()
export class ProjectService extends Service<Project, ProjectRepository> {
  constructor(
    repository: ProjectRepository,
    private readonly connection: Connection,
  ) {
    super(repository);
  }

  async findAllProjects(
    paginationArgs: PaginationArgs,
  ): Promise<PaginatedProjects> {
    const query = this.repository.createQueryBuilder().select();
    return paginate(query, paginationArgs);
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
    createProjectInput: CreateProjectInput,
  ): Promise<Project> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const newProjectObj = plainToClass(Project, createProjectInput);
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
      const newProjectUsers = [
        plainToClass(ProjectUser, {
          projectId: newProjectDb.id,
          userId: newProjectDb.ownerUserId,
          role: 0,
        }),
      ];

      createProjectInput?.projectUserIds?.forEach((userId) => {
        newProjectUsers.push(
          plainToClass(ProjectUser, {
            projectId: newProjectDb.id,
            userId,
            role: 1,
          }),
        );
      });

      await manager.save(newProjectUsers);
      return newProjectDb;
    });
  }

  async updateProject(input: UpdateProjectInput): Promise<Partial<Project>> {
    const oldProject = await this.findOne({
      where: {
        id: input.id,
      },
    });

    const newProject = {
      ...oldProject,
      ..._.omit(input, ['id']),
    };
    const updateResponse = await this.repository.save(newProject);
    console.log('updateResponse', updateResponse);
    return updateResponse;
  }
}
