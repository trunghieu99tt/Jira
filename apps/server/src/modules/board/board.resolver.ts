import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';
import { BoardList } from '../board-list/board-list.entity';
import { BoardListService } from '../board-list/board-list.service';
import { BoardUserService } from '../board-user/board-user.service';
import { Board } from './board.entity';
import { BoardService } from './board.service';
import { CreateBoardInput } from './dtos/create-board-input.dto';

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

  @Mutation((returns) => Board)
  async createBoard(
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ): Promise<Board> {
    return this.boardService.createBoard(createBoardInput);
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
