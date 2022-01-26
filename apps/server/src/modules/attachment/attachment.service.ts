import { Injectable } from '@nestjs/common';
import { Attachment } from './attachment.entity';
import { AttachmentRepository } from './attachment.repository';

@Injectable()
export class AttachmentService {
  constructor(private readonly repository: AttachmentRepository) {
    console.log('This is constructor');
  }

  async getTaskAttachments(taskId: number): Promise<Attachment[]> {
    return this.repository.find({
      where: {
        taskId,
      },
    });
  }
}
