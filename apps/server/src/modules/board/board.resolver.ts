import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';
import { BoardList } from '../board-list/board-list.entity';
import { BoardListService } from '../board-list/board-list.service';
import { BoardUser } from '../board-user/board-user.entity';
import { BoardUserService } from '../board-user/board-user.service';
import { Board } from './board.entity';
import { BoardService } from './board.service';

@Resolver((of: any) => Board)
export class BoardResolver {
  constructor(
    private readonly boardService: BoardService,
    private readonly boardListService: BoardListService,
    private readonly boardUserService: BoardUserService,
  ) {}

  @Query((returns) => [Board])
  async boards(@Args() paginationArgs: PaginationArgs): Promise<Board[]> {
    return this.boardService.findAllBoards(
      paginationArgs.offset,
      paginationArgs.limit,
    );
  }

  @Query((returns: any) => Board)
  async board(@Args('id', { type: () => Int }) id: number): Promise<Board> {
    return this.boardService.findBoardById(id);
  }

  @ResolveField()
  async boardLists(@Parent() board: Board): Promise<BoardList[]> {
    const { id } = board;
    return this.boardListService.findBoardListsByBoardId(id);
  }

  @ResolveField()
  async boardUsers(@Parent() board: Board): Promise<any> {
    const { id } = board;
    return this.boardUserService.findBoardUsersByBoardId(id);
  }

  @ResolveField()
  async userCount(@Parent() board: Board): Promise<number> {
    const { id } = board;
    return this.boardUserService.countNumberOfBoardUsers(id);
  }
}
