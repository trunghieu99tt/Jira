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
import { FileService } from '../file/services/file.service';
import { ProjectUserService } from '../project-user/services/project-user.service';
import { ProjectUser } from '../project-user/entities/project-user.entity';
import { UserService } from '../user/user.service';
import { In } from 'typeorm';
import { ProjectUserOutput } from './dtos/project-user-output.dto';
import { plainToClass } from 'class-transformer';

@Resolver((of: any) => Project)
export class ProjectResolver {
  constructor(
    private readonly userService: UserService,
    private readonly fileService: FileService,
    private readonly boardService: BoardService,
    private readonly projectService: ProjectService,
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
    console.log('Go here');
    return this.projectService.findProjectById(id);
  }

  @Mutation((returns) => Project)
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
      select: ['userId', 'role'],
    });
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
        if (userId) {
          avatar = fileUrlsMapping[userId];
        }

        return {
          ...projectUser,
          avatar,
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
