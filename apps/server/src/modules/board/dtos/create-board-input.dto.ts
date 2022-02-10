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
  privacy: string;

  @Field({
    defaultValue: '',
    nullable: true,
  })
  description: string;
}
