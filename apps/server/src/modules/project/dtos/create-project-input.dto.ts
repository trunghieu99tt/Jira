import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateProjectInput {
  @Field()
  name: string;

  @Field({
    nullable: true,
  })
  @Field(() => Int)
  coverPhotoFileId: number;

  @Field(() => Int)
  privacy: number;

  @Field({
    defaultValue: '',
    nullable: true,
  })
  description: string;

  @Field(() => Int)
  ownerUserId: number;
}
