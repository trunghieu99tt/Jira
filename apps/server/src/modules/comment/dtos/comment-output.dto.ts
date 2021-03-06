import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommentOutput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  content: string;
}
