import { Injectable } from '@nestjs/common';
import { Service } from 'src/common/generics/service.generic';
import { ProjectUser } from './project-user.entity';
import { ProjectUserRepository } from './project-user.repository';

@Injectable()
export class ProjectUserService extends Service<
  ProjectUser,
  ProjectUserRepository
> {
  constructor(repository: ProjectUserRepository) {
    super(repository);
  }

  async findProjectUsersByProjectId(
    projectId: number,
    offset = 0,
    limit = 5,
  ): Promise<Partial<ProjectUser>[]> {
    return this.findList({
      where: { project: projectId },
      skip: offset,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async countNumberOfProjectUsers(boardId: number): Promise<number> {
    return this.count({
      where: {
        board: { id: boardId },
      },
    });
  }
}
