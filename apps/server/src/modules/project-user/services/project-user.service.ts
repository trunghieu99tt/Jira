import { Injectable } from '@nestjs/common';
import { Service } from 'src/common/generics/service.generic';
import { ProjectUser } from '../entities/project-user.entity';
import { ProjectUserRepository } from '../repositories/project-user.repository';

@Injectable()
export class ProjectUserService extends Service<
  ProjectUser,
  ProjectUserRepository
> {
  constructor(repository: ProjectUserRepository) {
    super(repository);
  }
}
