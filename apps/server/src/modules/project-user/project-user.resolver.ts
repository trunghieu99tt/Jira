import { Args, Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { ProjectUser } from './project-user.entity';
import { GetProjectUserArgs } from './dtos/get-board-user.args';
import { ProjectUserService } from './project-user.service';

@Resolver(ProjectUser)
export class ProjectUserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly projectUserService: ProjectUserService,
  ) {}

  @Query(() => [ProjectUser])
  async getProjectUsers(
    @Args() args: GetProjectUserArgs,
  ): Promise<Partial<ProjectUser>[]> {
    return this.projectUserService.findProjectUsersByProjectId(
      args.projectId,
      args.offset,
      args.limit,
    );
  }

  @ResolveField()
  async user(@Parent() boardUser: ProjectUser): Promise<any> {
    return this.userService.findUserById(boardUser.user.id);
  }
}
