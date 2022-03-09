import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttachmentRepository } from './attachment.repository';
import { AttachmentService } from './attachment.service';

@Module({
  imports: [TypeOrmModule.forFeature([AttachmentRepository])],
  providers: [AttachmentService],
  exports: [AttachmentService],
})
export class AttachmentModule {}
