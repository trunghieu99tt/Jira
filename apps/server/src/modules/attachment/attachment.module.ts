import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttachmentRepository } from './attachment.repository';
import { AttachmentResolver } from './attachment.resolver';
import { AttachmentService } from './attachment.service';

@Module({
  imports: [TypeOrmModule.forFeature([AttachmentRepository])],
  providers: [AttachmentService, AttachmentResolver],
  exports: [AttachmentService],
})
export class AttachmentModule {}
