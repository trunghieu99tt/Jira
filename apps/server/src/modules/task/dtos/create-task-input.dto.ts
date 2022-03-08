import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput {
  @Field((type) => Int)
  assigneeUserId: number;

  @Field((type) => Int)
  boardId: number;

  @Field({
    nullable: true,
    defaultValue: '',
  })
  description: string;

  @Field()
  name: string;

  @Field((type) => Int)
  priority: number;

  @Field((type) => Int)
  reporterUserId: number;

  @Field((type) => String, {
    defaultValue: '',
  })
  summary: string;

  @Field({
    defaultValue: '',
  })
  attachmentFileIds: string;

  @Field()
  type: string;

  @Field((type) => Int)
  projectId: number;
}
