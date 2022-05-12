import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateProjectInput {
  @Field({
    nullable: true,
  })
  description: string;

  @Field(() => Int)
  id: number;
}
