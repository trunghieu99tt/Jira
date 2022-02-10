import { ArgsType, Field, Int } from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';

@ArgsType()
export class GetBoardUsersArgs extends PaginationArgs {
  @Field(() => Int)
  boardId: number;
}