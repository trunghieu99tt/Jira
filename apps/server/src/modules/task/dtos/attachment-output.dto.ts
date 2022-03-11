import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AttachmentOutput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  createdAt: number;

  @Field(() => String)
  url: string;
}
