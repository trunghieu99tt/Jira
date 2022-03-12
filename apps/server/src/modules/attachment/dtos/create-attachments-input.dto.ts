import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateAttachmentsInput {
  @Field(() => Int)
  taskId: number;

  @Field(() => [Int])
  fileIds: number[];
}
