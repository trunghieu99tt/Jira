import { Args, Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { BoardUser } from './board-user.entity';
import { BoardUserService } from './board-user.service';
import { GetBoardUsersArgs } from './dtos/get-board-user.args';

@Resolver(BoardUser)
export class BoardUserResolver {
  constructor(
    private readonly boardUserService: BoardUserService,
    private readonly userService: UserService,
  ) {}

  @Query(() => [BoardUser])
  async getBoardUsers(@Args() args: GetBoardUsersArgs): Promise<BoardUser[]> {
    return this.boardUserService.findBoardUsersByBoardId(
      args.boardId,
      args.offset,
      args.limit,
    );
  }

  @ResolveField()
  async user(@Parent() boardUser: BoardUser): Promise<any> {
    console.log('boardUser', boardUser);
    return this.userService.findUserById(boardUser.user.id);
  }
}
