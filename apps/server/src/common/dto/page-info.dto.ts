import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PageInfoDto {
  @Field({
    nullable: true,
  })
  startCursor: string;

  @Field({
    nullable: true,
  })
  endCursor: string;

  @Field()
  hasNextPage: boolean;

  @Field()
  hasPreviousPage: boolean;

  @Field(() => Int)
  totalCount: number;
}
