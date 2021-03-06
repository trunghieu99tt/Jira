import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BoardTask {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  priority: number;

  @Field(() => String)
  type: string;

  @Field(() => String, {
    defaultValue: '',
  })
  assigneeAvatar: string;

  @Field(() => String)
  assigneeName: string;

  @Field()
  listPosition: number;

  @Field(() => Int)
  numberOfAttachments: number;

  @Field(() => Int)
  numberOfComments: number;

  @Field(() => String)
  coverPhoto: string;

  @Field(() => Date)
  updatedAt: Date;
}
