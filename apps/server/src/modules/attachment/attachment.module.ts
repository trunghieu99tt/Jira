import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttachmentRepository } from './attachment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AttachmentRepository])],
})
export class AttachmentModule {}
