import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateLabelInputDto {
  @Field(() => String)
  name: string;

  @Field(() => String)
  color: string;
}
