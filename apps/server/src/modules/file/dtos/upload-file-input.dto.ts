import { IsString } from 'class-validator';

export class UploadFileInput {
  @IsString()
  uploadStrategy: string;
}
