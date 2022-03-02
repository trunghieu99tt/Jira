import { EntityRepository, Repository } from 'typeorm';
import { ProjectUser } from './project-user.entity';

@EntityRepository(ProjectUser)
export class ProjectUserRepository extends Repository<ProjectUser> {}
