import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateBoardInput {
  @Field()
  name: string;

  @Field(() => Int)
  projectId: number;
}
