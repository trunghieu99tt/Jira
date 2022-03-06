import { Injectable } from '@nestjs/common';
import { Service } from 'src/common/generics/service.generic';
import { Attachment } from './attachment.entity';
import { AttachmentRepository } from './attachment.repository';

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
}
