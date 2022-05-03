import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateTaskLabelsInputDto {
  @Field(() => Int)
  labelId: number;

  @Field(() => Int)
  taskId: number;
}
