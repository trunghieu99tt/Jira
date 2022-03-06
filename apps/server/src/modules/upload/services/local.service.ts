import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { StringTool } from 'src/common/tools/string.tool';
import { SERVER_ADDRESS } from 'src/configuration/env';
import { v4 as uuid } from 'uuid';

export enum EUploadFolder {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  DOCUMENT = 'document',
}

const UPLOAD_FOLDER = `${SERVER_ADDRESS}/uploads`;

@Injectable()
export class LocalUploadService {
  getURL(directory: EUploadFolder, filename: string): string {
    return `${UPLOAD_FOLDER}/${directory}/${filename}`;
  }

  getURLMultiDir(directory: string, filename: string): string {
    return `${UPLOAD_FOLDER}/${directory}/${filename}`;
  }

  uploadImage(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const safeName = StringTool.normalizeFileName(file.originalname);
      const filename = `${uuid()}-${Date.now()}-${safeName}`;

      const filePath = `${process.cwd()}/uploads/${
        EUploadFolder.IMAGE
      }/${filename}`;

      fs.writeFile(filePath, file.buffer, (err: any) => {
        if (err) {
          return reject(err);
        }

        return resolve(this.getURL(EUploadFolder.IMAGE, filename));
      });
    });
  }
}
