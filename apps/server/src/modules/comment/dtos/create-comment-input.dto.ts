import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field(() => Int)
  taskId: number;

  @Field(() => String)
  content: string;
}
