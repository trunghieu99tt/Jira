import { useTaskService } from '@talons/useTaskService';
import { uploadFiles } from '@utils/imageUploader';
import { useState } from 'react';
import { useParams } from 'react-router';

export const useCreateTask = () => {
  const { projectId } = useParams();

  const [attachment, setAttachments] = useState<File[] | null>(null);

  const { createTask } = useTaskService();

  const onSubmit = async (values: any, form: any) => {
    let attachmentFileIds: string = '';
    if (attachment && attachment?.length > 0) {
      const uploadFileResponse = await uploadFiles(attachment);
      attachmentFileIds = uploadFileResponse.join(',');
    }

    console.log('values', values);

    const data = {
      ...values,
      attachmentFileIds,
      projectId: parseInt(projectId || '1', 10),
      priority: parseInt(values.priority || '1', 10),
    };

    createTask(data, [parseInt(values.boardId)]);
  };

  const handleAttachment = (files: File[]) => {
    setAttachments(files);
  };

  return {
    onSubmit,
    handleAttachment,
  };
};
