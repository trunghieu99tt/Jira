import { EntityRepository, Repository } from 'typeorm';
import { BoardList } from './board-list.entity';

@EntityRepository(BoardList)
export class BoardListRepository extends Repository<BoardList> {}
