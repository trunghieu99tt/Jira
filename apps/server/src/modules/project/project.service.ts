import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import _ from 'lodash';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';
import { Service } from 'src/common/generics/service.generic';
import { paginate } from 'src/common/tools/paginate';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { Board } from '../board/board.entity';
import { BoardRepository } from '../board/board.repository';
import { ProjectUser } from '../project-user/entities/project-user.entity';
import { ProjectUserRepository } from '../project-user/repositories/project-user.repository';
import { DEFAULT_BOARD_NAMES } from './constants/project.constant';
import { CreateProjectInput } from './dtos/create-project-input.dto';
import { PaginatedProjects } from './dtos/paginated-project';
import { UpdateProjectInput } from './dtos/update-project-input.dto';
import { Project } from './project.entity';
import { ProjectRepository } from './project.repository';

@Injectable()
export class ProjectService extends Service<Project, ProjectRepository> {
  constructor(
    repository: ProjectRepository,
    private readonly projectUserRepository: ProjectUserRepository,
    private readonly boardRepository: BoardRepository,
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

  @Transactional()
  async createNewProject(
    createProjectInput: CreateProjectInput,
  ): Promise<Project> {
    const newProject = await this.repository.save(
      plainToInstance(Project, createProjectInput),
    );

    const newBoardList = [];
    for (let i = 0; i < DEFAULT_BOARD_NAMES.length; i += 1) {
      const newBoard = plainToInstance(Board, {
        name: DEFAULT_BOARD_NAMES[i],
        projectId: newProject.id,
      });
      newBoardList.push(newBoard);
    }
    await this.boardRepository.save(newBoardList);
    const newProjectUsers = [
      plainToInstance(ProjectUser, {
        projectId: newProject.id,
        userId: newProject.ownerUserId,
        role: 0,
      }),
    ];

    createProjectInput?.projectUserIds?.forEach((userId) => {
      newProjectUsers.push(
        plainToInstance(ProjectUser, {
          projectId: newProject.id,
          userId,
          role: 1,
        }),
      );
    });

    await this.projectUserRepository.save(newProjectUsers);
    return newProject;
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
    return updateResponse;
  }
}
