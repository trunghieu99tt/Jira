import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthTokenOutputDto {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}
