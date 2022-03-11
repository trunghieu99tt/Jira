import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TaskUser {
  @Field(() => Int)
  userId: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  avatar: string;
}
