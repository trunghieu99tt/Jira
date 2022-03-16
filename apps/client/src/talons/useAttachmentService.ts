import { useMutation } from '@apollo/client';
import { CREATE_NEW_ATTACHMENT } from 'graphql/mutations/attachment.mutation';
import { useCallback } from 'react';
import { useTaskService } from './useTaskService';

export const useAttachmentService = () => {
  const { getTaskDetail } = useTaskService();
  const [createAttachmentsMutation] = useMutation(CREATE_NEW_ATTACHMENT);

  const createTaskAttachments = useCallback(
    async (taskId: number, fileIds: number[]) => {
      await createAttachmentsMutation({
        variables: {
          taskId,
          fileIds,
        },
        onCompleted: (data) => {
          if (data?.createdAttachments) {
            getTaskDetail(taskId);
          }
        },
      });
    },
    [createAttachmentsMutation, getTaskDetail],
  );

  return {
    createTaskAttachments,
  };
};
