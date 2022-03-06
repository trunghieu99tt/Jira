import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProjectUserOutput {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId: number;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  role: number;

  @Field(() => String)
  avatar: string;
}
