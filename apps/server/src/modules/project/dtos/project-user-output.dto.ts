import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProjectUserOutput {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  role: number;

  @Field(() => String)
  name: string;

  @Field(() => String, {
    defaultValue: '',
  })
  avatar: string;
}
