import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Service } from 'src/common/generics/service.generic';
import { Attachment } from './attachment.entity';
import { AttachmentRepository } from './attachment.repository';
import { CreateAttachmentsInput } from './dtos/create-attachments-input.dto';

@Injectable()
export class AttachmentService extends Service<
  Attachment,
  AttachmentRepository
> {
  constructor(repository: AttachmentRepository) {
    super(repository);
  }

  async getTaskAttachments(taskId: number): Promise<Attachment[]> {
    return this.repository.find({
      where: {
        taskId,
      },
    });
  }

  async createNewAttachment(
    input: CreateAttachmentsInput,
  ): Promise<Partial<Attachment>[]> {
    const newAttachments = plainToInstance(
      Attachment,
      input.fileIds.map((fileId: number) => ({
        taskId: input.taskId,
        fileId,
      })),
    );
    const newAttachmentsDb = await this.repository.save(newAttachments);
    return newAttachmentsDb;
  }
}
