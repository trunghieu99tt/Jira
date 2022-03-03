import { ArgsType, Field, Int } from '@nestjs/graphql';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '../constants/common.constant';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { defaultValue: DEFAULT_OFFSET })
  offset?: number;

  @Field(() => Int, { defaultValue: DEFAULT_LIMIT })
  limit?: number;
}
