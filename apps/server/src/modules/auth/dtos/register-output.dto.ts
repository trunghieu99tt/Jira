import { Field, ObjectType } from '@nestjs/graphql';
import { UserOutput } from '../../user/dtos/user-output.dto';

@ObjectType()
export class RegisterOutputDto {
  @Field(() => UserOutput)
  user: UserOutput;

  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}
