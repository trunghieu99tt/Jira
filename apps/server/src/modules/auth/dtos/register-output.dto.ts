import { IsString } from 'class-validator';

export class RegisterOutputDto {
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}
