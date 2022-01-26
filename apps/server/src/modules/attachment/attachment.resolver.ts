import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Attachment } from './attachment.entity';
import { AttachmentService } from './attachment.service';

@Resolver((of: any) => Attachment)
export class AttachmentResolver {
  constructor(private readonly attachmentService: AttachmentService) {}

  @Query((returns) => [Attachment])
  async getTaskAttachments(
    @Args('taskId', { type: () => Int }) taskId: number,
  ): Promise<Attachment[]> {
    return this.attachmentService.getTaskAttachments(taskId);
  }
}
