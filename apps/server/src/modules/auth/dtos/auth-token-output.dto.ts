import { IsString } from 'class-validator';

export class AuthTokenOutputDto {
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}
