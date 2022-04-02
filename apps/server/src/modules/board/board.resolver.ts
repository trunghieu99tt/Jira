import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { BoardTask } from '../task/dtos/board-task-output.dto';
import { TaskService } from '../task/task.service';
import { Board } from './board.entity';
import { BoardService } from './board.service';

@Resolver(() => Board)
export class BoardResolver {
  constructor(
    private readonly boardListService: BoardService,
    private readonly taskService: TaskService,
  ) {}

  @Query(() => Board)
  async board(
    @Args('boardId', { type: () => Int }) boardId: number,
  ): Promise<Board> {
    console.log('boardId', boardId);
    return this.boardListService.findBoardById(boardId);
  }

  @ResolveField(() => [BoardTask])
  async tasks(@Parent() board: Board): Promise<BoardTask[]> {
    const { id } = board;
    return this.taskService.findTasksByBoardId(id);
  }
}
