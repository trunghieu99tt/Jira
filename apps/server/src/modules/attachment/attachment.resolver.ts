import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Attachment } from './attachment.entity';
import { AttachmentService } from './attachment.service';
import { CreateAttachmentsInput } from './dtos/create-attachments-input.dto';

@Resolver(() => Attachment)
export class AttachmentResolver {
  constructor(private readonly attachmentService: AttachmentService) {}

  @Query(() => [Attachment])
  async getTaskAttachments(
    @Args('taskId', { type: () => Int }) taskId: number,
  ): Promise<Attachment[]> {
    return this.attachmentService.getTaskAttachments(taskId);
  }

  @Mutation(() => [Attachment])
  async createdAttachments(
    @Args('createAttachmentsInput')
    input: CreateAttachmentsInput,
  ): Promise<Partial<Attachment>[]> {
    return this.attachmentService.createNewAttachment(input);
  }
}
