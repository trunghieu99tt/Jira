import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput {
  @Field((type) => Int)
  assigneeUserId: number;

  @Field((type) => Int)
  boardId: number;

  @Field()
  description: string;

  @Field()
  name: string;

  @Field((type) => Int)
  priority: number;

  @Field((type) => Int)
  reporterUserId: number;

  @Field((type) => String)
  summary: string;

  @Field()
  attachmentFileIds: string;

  @Field((type) => Int)
  projectId: number;
}
