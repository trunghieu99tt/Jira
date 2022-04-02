import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TaskLabelOutput {
  @Field(() => Int)
  labelId: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  color: string;
}
