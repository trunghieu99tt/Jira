import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateTaskInput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  updateType: string;

  @Field(() => Int, {
    nullable: true,
  })
  boardId: number;

  @Field({
    nullable: true,
  })
  listPosition: number;

  @Field(() => Int, {
    nullable: true,
  })
  assigneeUserId: number;

  @Field(() => String, {
    nullable: true,
  })
  description: string;

  @Field(() => Int, {
    nullable: true,
  })
  priority: number;

  @Field(() => String, {
    nullable: true,
  })
  type: string;

  @Field(() => String, {
    nullable: true,
  })
  name: string;

  @Field(() => String, {
    nullable: true,
  })
  summary: string;

  @Field(() => String, {
    nullable: true,
  })
  coverPhoto: string;
}
