import { EntityRepository, Repository } from 'typeorm';
import { BoardUser } from './board-user.entity';

@EntityRepository(BoardUser)
export class BoardUserRepository extends Repository<BoardUser> {}
