import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AttachmentOutput {
  @Field(() => Int)
  id: number;

  @Field(() => Int, {
    nullable: true,
    defaultValue: 0,
  })
  taskId: number;

  @Field(() => Int)
  fileId: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  type: string;

  @Field(() => Int)
  createdAt: number;

  @Field(() => String)
  url: string;
}
