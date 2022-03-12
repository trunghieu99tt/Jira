import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Service } from 'src/common/generics/service.generic';
import { IpfsUploadService } from 'src/modules/upload/services/ipfs.service';
import { LocalUploadService } from 'src/modules/upload/services/local.service';
import { Connection } from 'typeorm';
import { UPLOAD_STRATEGY_NAME } from '../constant/file.constant';

import { File } from '../entities/file.entity';
import { FileRepository } from '../repositories/file.repository';

@Injectable()
export class FileService extends Service<File, FileRepository> {
  constructor(
    fileRepository: FileRepository,
    private readonly ipfsUploadService: IpfsUploadService,
    private readonly localUploadService: LocalUploadService,
    private readonly connection: Connection,
  ) {
    super(fileRepository);
  }

  async getById(id: number): Promise<File> {
    const file = await this.repository.findOne(id);

    if (!file) {
      throw new BadRequestException(`File ${id} not found`);
    }

    return file;
  }

  async uploadImage(
    file: Express.Multer.File,
    ownerId: number,
  ): Promise<number> {
    const newFile = {
      ownerId,
      type: file.mimetype,
      path: '',
      driver: UPLOAD_STRATEGY_NAME.LOCAL,
      s3key: '',
      bucket: '',
    };

    newFile.path = await this.localUploadService.uploadImage(file);

    const newDbFile = await this.repository.save(plainToClass(File, newFile));

    return newDbFile.id;
  }

  async getFileUrl(id: number): Promise<string> {
    const file = await this.getById(id);
    if (!file) {
      throw new BadRequestException('File not found');
    }

    switch (file.driver) {
      case UPLOAD_STRATEGY_NAME.LOCAL:
        return file.path;
      case UPLOAD_STRATEGY_NAME.IPFS:
        return this.ipfsUploadService.getFileUrl(file.path);
      default:
        return file.path;
    }
  }

  async getFileUrls(ids: number[]): Promise<{
    [key: string]: string;
  }> {
    const fileUrls = await Promise.all(
      ids.map(async (id: number) => {
        const fileUrl = await this.getFileUrl(id);
        return {
          [id]: fileUrl,
        };
      }),
    );

    return fileUrls.reduce(
      (acc, fileUrlMapping) => ({
        ...acc,
        ...fileUrlMapping,
      }),
      {},
    );
  }

  async uploadFile(
    files: Express.Multer.File[],
    ownerId: number,
    uploadStrategy = UPLOAD_STRATEGY_NAME.IPFS,
  ): Promise<{
    fileIds: number[];
  }> {
    let newFiles: File[] = [];

    switch (uploadStrategy) {
      case UPLOAD_STRATEGY_NAME.LOCAL:
        const fileUrls = await Promise.all(
          files.map(async (file: Express.Multer.File) => {
            return this.localUploadService.uploadImage(file);
          }),
        );
        newFiles = fileUrls.map((fileUrl: string, idx: number) => {
          return plainToClass(File, {
            ownerId,
            type: files[idx].mimetype,
            path: fileUrl,
            driver: UPLOAD_STRATEGY_NAME.LOCAL,
            s3Key: '',
            s3Bucket: '',
            filename: files[idx]?.filename || files[idx].originalname,
          });
        });
        break;
      case UPLOAD_STRATEGY_NAME.IPFS:
        const ipfsFiles = await Promise.all(
          files.map(async (file: Express.Multer.File) => {
            return this.ipfsUploadService.addFile({
              path: file.filename,
              content: file.buffer,
            });
          }),
        );
        newFiles = ipfsFiles.map((ipfsFile, idx: number) => {
          const file = files[idx];
          return plainToClass(File, {
            ownerId,
            type: file.mimetype,
            path: ipfsFile.path,
            driver: UPLOAD_STRATEGY_NAME.IPFS,
            s3Key: '',
            s3Bucket: '',
            filename: file?.filename || file?.originalname,
          });
        });
        break;
      // TODO: add cloudinary upload strategy
    }

    const newDbFiles = await this.connection.transaction(async (manager) => {
      return await manager.save(newFiles);
    });

    return {
      fileIds: newDbFiles.map((file) => Number(file.id)),
    };
  }
}
