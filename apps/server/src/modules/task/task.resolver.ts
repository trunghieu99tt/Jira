/* eslint-disable @typescript-eslint/no-unused-vars */
import { Query, Resolver } from '@nestjs/graphql';
import { Task } from './task.entity';

@Resolver((of: any) => Task)
export class TaskResolver {
  @Query((returns) => String)
  async tasks() {
    return 'hello world';
  }
}
