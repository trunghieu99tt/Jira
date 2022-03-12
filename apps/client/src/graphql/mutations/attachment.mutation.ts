import { gql } from '@apollo/client';

export const CREATE_NEW_ATTACHMENT = gql`
  mutation createNewAttachment($taskId: Int!, $fileIds: [Int!]!) {
    createdAttachments(
      createAttachmentsInput: { taskId: $taskId, fileIds: $fileIds }
    ) {
      id
    }
  }
`;
