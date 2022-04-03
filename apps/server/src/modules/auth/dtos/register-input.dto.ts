import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  avatarFileId?: number;
}
