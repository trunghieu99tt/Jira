import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateProjectInput {
  @Field()
  name: string;

  @Field({
    defaultValue: '',
    nullable: true,
  })
  coverPhoto: string;

  // privacy should be int
  @Field((type) => Int)
  privacy: number;

  @Field({
    defaultValue: '',
    nullable: true,
  })
  description: string;

  @Field((type) => Int)
  ownerId: number;
}
