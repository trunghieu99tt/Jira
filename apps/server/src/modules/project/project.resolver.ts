import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';
import { In } from 'typeorm';
import { Board } from '../board/board.entity';
import { BoardRepository } from '../board/board.repository';
import { FileService } from '../file/services/file.service';
import { ProjectUserRepository } from '../project-user/repositories/project-user.repository';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { CreateProjectInput } from './dtos/create-project-input.dto';
import { PaginatedProjects } from './dtos/paginated-project';
import { ProjectUserOutput } from './dtos/project-user-output.dto';
import { UpdateProjectInput } from './dtos/update-project-input.dto';
import { Project } from './project.entity';
import { ProjectService } from './project.service';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(
    private readonly userService: UserService,
    private readonly fileService: FileService,
    private readonly boardRepository: BoardRepository,
    private readonly projectUserRepository: ProjectUserRepository,
    private readonly projectService: ProjectService,
  ) {}

  @Query(() => PaginatedProjects)
  async projects(@Args() args: PaginationArgs): Promise<PaginatedProjects> {
    const { after, first, before, last } = args;
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

  @Mutation(() => Project)
  async updateProject(
    @Args('updateProjectInput') updateProjectInput: UpdateProjectInput,
  ): Promise<Partial<Project>> {
    return this.projectService.updateProject(updateProjectInput);
  }

  @ResolveField()
  async boards(@Parent() project: Project): Promise<Board[]> {
    const { id } = project;
    return this.boardRepository.find({
      where: {
        projectId: id,
      },
      select: ['id', 'name'],
    });
  }

  @ResolveField()
  async projectUsers(@Parent() project: Project): Promise<ProjectUserOutput[]> {
    const { id } = project;
    const projectUsers = await this.projectUserRepository.find({
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

    return plainToInstance(
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
    return this.projectUserRepository.count({
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

  @ResolveField()
  async owner(@Parent() project: Project): Promise<Partial<User>> {
    const { ownerUserId } = project;
    return this.userService.getUserInfo(ownerUserId);
  }
}
