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
import { Board } from '../board/board.entity';
import { BoardService } from '../board/board.service';
import { Project } from './project.entity';
import { ProjectService } from './project.service';
import { CreateProjectInput } from './dtos/create-project-input.dto';
import { ProjectUserService } from '../project-user/project-user.service';

@Resolver((of: any) => Project)
export class ProjectResolver {
  constructor(
    private readonly projectService: ProjectService,
    private readonly boardService: BoardService,
    private readonly projectUserService: ProjectUserService,
  ) {}

  @Query((returns) => [Project])
  async projects(
    @Args() paginationArgs: PaginationArgs,
  ): Promise<Partial<Project>[]> {
    return this.projectService.findAllProjects(
      paginationArgs.offset,
      paginationArgs.limit,
    );
  }

  @Query((returns: any) => Project)
  async project(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Partial<Project>> {
    return this.projectService.findProjectById(id);
  }

  @Mutation((returns) => Project)
  async CreateProject(
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
  ): Promise<Project> {
    return this.projectService.createNewProject(createProjectInput);
  }

  @ResolveField()
  async boards(@Parent() board: Project): Promise<Board[]> {
    const { id } = board;
    return this.boardService.findBoardListsByBoardId(id);
  }

  @ResolveField()
  async projectUsers(@Parent() board: Project): Promise<any> {
    const { id } = board;
    return this.projectUserService.findProjectUsersByProjectId(id);
  }

  @ResolveField()
  async userCount(@Parent() board: Project): Promise<number> {
    const { id } = board;
    return this.projectUserService.countNumberOfProjectUsers(id);
  }
}
