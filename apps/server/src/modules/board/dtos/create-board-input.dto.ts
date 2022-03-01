import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBoardInput {
  @Field()
  name: string;

  @Field({
    defaultValue: '',
    nullable: true,
  })
  coverPhoto: string;

  @Field()
  privacy: number;

  @Field({
    defaultValue: '',
    nullable: true,
  })
  description: string;

  @Field()
  ownerId: number;
}
