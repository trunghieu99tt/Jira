import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
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
  async boardList(@Args('id', { type: () => Int }) id: number): Promise<Board> {
    return this.boardListService.findBoardById(id);
  }

  @ResolveField()
  async tasks(@Parent() boardList: Board): Promise<any> {
    const { id } = boardList;
    return this.taskService.findTasksByBoardListId(id);
  }
}
