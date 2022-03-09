import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { BoardTask } from '../task/dtos/board-task-output.dto';
import { TaskService } from '../task/task.service';
import { Board } from './board.entity';
import { BoardService } from './board.service';

@Resolver((of: any) => Board)
export class BoardResolver {
  constructor(
    private readonly boardListService: BoardService,
    private readonly taskService: TaskService,
  ) {}

  @Query((returns: any) => Board)
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
