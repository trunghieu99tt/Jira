import { useMutation } from '@apollo/client';
import { CREATE_NEW_ATTACHMENT } from 'graphql/mutations/attachment.mutation';
import { useCallback } from 'react';
import { useTaskService } from './useTaskService';

export const useAttachmentService = () => {
  const { fetchTaskDetail } = useTaskService();
  const [createAttachmentsMutation] = useMutation(CREATE_NEW_ATTACHMENT);

  const createNewTaskAttachments = useCallback(
    async (taskId: number, fileIds: number[]) => {
      await createAttachmentsMutation({
        variables: {
          taskId,
          fileIds,
        },
        onCompleted: (data) => {
          console.log('data', data);
          if (data?.createdAttachments) {
            fetchTaskDetail(taskId);
          }
        },
      });
    },
    [createAttachmentsMutation],
  );

  return {
    createNewTaskAttachments,
  };
};
