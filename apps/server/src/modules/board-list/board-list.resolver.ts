import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TaskService } from '../task/task.service';
import { BoardList } from './board-list.entity';
import { BoardListService } from './board-list.service';

@Resolver((of: any) => BoardList)
export class BoardListResolver {
  constructor(
    private readonly boardListService: BoardListService,
    private readonly taskService: TaskService,
  ) {}

  @Query((returns: any) => BoardList)
  async boardList(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<BoardList> {
    return this.boardListService.findBoardListById(id);
  }

  @ResolveField()
  async tasks(@Parent() boardList: BoardList): Promise<any> {
    const { id } = boardList;
    return this.taskService.findTasksByBoardListId(id);
  }
}
