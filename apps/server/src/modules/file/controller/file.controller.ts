import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadFileInput } from '../dtos/upload-file-input.dto';
import { FileService } from '../services/file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() input: UploadFileInput,
  ): Promise<{
    fileIds: number[];
  }> {
    return this.fileService.uploadFile(files, 1, input.uploadStrategy);
  }

  @Get(':id')
  async getFile(id: number): Promise<string> {
    return this.fileService.getFileUrl(id);
  }
}
