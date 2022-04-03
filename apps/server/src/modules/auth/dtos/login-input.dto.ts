import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInputDto {
  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;
}
