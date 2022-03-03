import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/generics/paginated.generic';
import { Project } from '../project.entity';

@ObjectType()
export class PaginatedBoard extends Paginated(Project) {}
