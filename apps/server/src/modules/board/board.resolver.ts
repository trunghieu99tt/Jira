import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { BoardList } from '../board-list/board-list.entity';
import { BoardListService } from '../board-list/board-list.service';
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
    return this.boardUserService.findBoardUserByBoardId(id);
  }
}
