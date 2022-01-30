import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/generics/paginated.generic';
import { Board } from '../board.entity';

@ObjectType()
export class PaginatedBoard extends Paginated(Board) {}
