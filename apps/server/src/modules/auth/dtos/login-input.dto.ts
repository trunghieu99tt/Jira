import { IsString } from 'class-validator';

export class LoginInputDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
