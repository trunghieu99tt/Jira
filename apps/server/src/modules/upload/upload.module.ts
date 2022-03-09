import { Module } from '@nestjs/common';
import { IpfsUploadService } from './services/ipfs.service';
import { LocalUploadService } from './services/local.service';

@Module({
  providers: [IpfsUploadService, LocalUploadService],
  exports: [IpfsUploadService, LocalUploadService],
})
export class UploadModule {}
