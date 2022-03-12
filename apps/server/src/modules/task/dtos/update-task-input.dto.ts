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
  newBoardId: number;

  @Field(() => Int, {
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
}
