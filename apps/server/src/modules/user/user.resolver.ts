import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserOutput } from './dtos/user-output.dto';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  async findUserByUserBoardId(userBoardId: number): Promise<any> {
    return this.userService.findUserByUserBoardId(userBoardId);
  }

  @Query(() => [UserOutput])
  async searchUsers(@Args('search') search: string): Promise<UserOutput[]> {
    return this.userService.searchUser(search);
  }
}
