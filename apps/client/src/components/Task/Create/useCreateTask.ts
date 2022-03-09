import { useMutation } from '@apollo/client';
import { uploadFiles } from '@utils/imageUploader';
import { CREATE_TASK_MUTATION } from 'graphql/mutations/task.mutation';
import { useState } from 'react';
import { useParams } from 'react-router';

export const useCreateTask = () => {
  const { projectId } = useParams();

  const [attachment, setAttachments] = useState<File[] | null>(null);

  const [createTaskFunction, createTaskResponse] =
    useMutation(CREATE_TASK_MUTATION);

  const onSubmit = async (values: any, form: any) => {
    let attachmentFileIds: string = '';
    if (attachment && attachment?.length > 0) {
      const uploadFileResponse = await uploadFiles(attachment);
      attachmentFileIds = uploadFileResponse.join(',');
    }

    const data = {
      ...values,
      attachmentFileIds,
      projectId: parseInt(projectId || '1', 10),
      priority: parseInt(values.priority || '1', 10),
    };
    createTaskFunction({
      variables: data,
    });
  };

  const handleAttachment = (files: File[]) => {
    setAttachments(files);
  };

  if (createTaskResponse) {
    console.log('createTaskResponse', createTaskResponse);
  }

  return {
    createTaskResponse,

    onSubmit,
    handleAttachment,
  };
};
