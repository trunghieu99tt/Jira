import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { plainToClass } from 'class-transformer';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';
import { In } from 'typeorm';
import { Board } from '../board/board.entity';
import { BoardService } from '../board/board.service';
import { FileService } from '../file/services/file.service';
import { ProjectUserService } from '../project-user/services/project-user.service';
import { UserService } from '../user/user.service';
import { CreateProjectInput } from './dtos/create-project-input.dto';
import { PaginatedProjects } from './dtos/paginated-project';
import { ProjectUserOutput } from './dtos/project-user-output.dto';
import { Project } from './project.entity';
import { ProjectService } from './project.service';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(
    private readonly userService: UserService,
    private readonly fileService: FileService,
    private readonly boardService: BoardService,
    private readonly projectService: ProjectService,
    private readonly projectUserService: ProjectUserService,
  ) {}

  @Query(() => PaginatedProjects)
  async projects(
    @Args('first', {
      type: () => Int,
      nullable: true,
    })
    first: number,
    @Args('after', {
      nullable: true,
    })
    after: string,
    @Args('last', {
      type: () => Int,
      nullable: true,
    })
    last?: number,
    @Args('before', {
      nullable: true,
    })
    before?: string,
  ): Promise<PaginatedProjects> {
    return this.projectService.findAllProjects({
      first,
      after,
      last: last || undefined,
      before: before || undefined,
    });
  }

  @Query(() => Project)
  async project(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Partial<Project>> {
    return this.projectService.findProjectById(id);
  }

  @Mutation(() => Project)
  async createProject(
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
  ): Promise<Project> {
    return this.projectService.createNewProject(createProjectInput);
  }

  @ResolveField()
  async boards(@Parent() project: Project): Promise<Board[]> {
    const { id } = project;
    return this.boardService.findBoardsByProjectId(id);
  }

  @ResolveField()
  async projectUsers(@Parent() project: Project): Promise<ProjectUserOutput[]> {
    const { id } = project;
    const projectUsers = await this.projectUserService.findList({
      where: {
        projectId: id,
      },
      select: ['userId', 'role', 'id'],
    });

    if (!projectUsers?.length) return [];
    const userIds = projectUsers.map(({ userId }) => userId);
    const users = await this.userService.findList({
      where: {
        id: In(userIds),
      },
      select: ['id', 'name', 'avatarFileId'],
    });

    const fileIds: number[] = [];
    users?.forEach((user) => {
      if (user?.avatarFileId) {
        fileIds.push(user.avatarFileId);
      }
    });

    const fileUrlsMapping = await this.fileService.getFileUrls(fileIds);

    return plainToClass(
      ProjectUserOutput,
      projectUsers.map((projectUser) => {
        const userId = projectUser.userId;
        let avatar = '';
        let name = '';
        if (userId) {
          avatar = fileUrlsMapping[userId];
        }
        const user = users.find((u) => u.id === userId);
        if (user) {
          name = user?.name || '';
        }

        return {
          ...projectUser,
          avatar,
          name,
        };
      }),
    );
  }

  @ResolveField()
  async userCount(@Parent() project: Project): Promise<number> {
    const { id } = project;
    return this.projectUserService.count({
      where: {
        projectId: id,
      },
    });
  }

  @ResolveField()
  async coverPhotoUrl(@Parent() project: Project): Promise<any> {
    const { coverPhotoFileId } = project;
    if (!coverPhotoFileId) return '';

    return this.fileService.getFileUrl(coverPhotoFileId);
  }
}
