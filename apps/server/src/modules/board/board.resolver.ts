import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { BoardTask } from '../task/dtos/board-task-output.dto';
import { TaskService } from '../task/task.service';
import { Board } from './board.entity';
import { BoardService } from './board.service';
import { CreateBoardInput } from './dtos/create-board-input.dto';

@Resolver(() => Board)
export class BoardResolver {
  constructor(
    private readonly boardService: BoardService,
    private readonly taskService: TaskService,
  ) {}

  @Query(() => Board)
  async board(
    @Args('boardId', { type: () => Int }) boardId: number,
  ): Promise<Board> {
    console.log('boardId', boardId);
    return this.boardService.findBoardById(boardId);
  }

  @Mutation(() => Board)
  async createBoard(
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ): Promise<Board> {
    return this.boardService.createNewBoard(createBoardInput);
  }

  @ResolveField(() => [BoardTask])
  async tasks(@Parent() board: Board): Promise<BoardTask[]> {
    const { id } = board;
    return this.taskService.findTasksByBoardId(id);
  }
}
