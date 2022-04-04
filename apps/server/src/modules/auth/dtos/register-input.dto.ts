import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class RegisterInputDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsOptional()
  @IsNumber()
  avatarFileId?: number;
}
