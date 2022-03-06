import { uploadFiles } from '@utils/imageUploader';
import { useState } from 'react';

export const useCreateTask = () => {
  const [attachment, setAttachments] = useState<File[] | null>(null);

  const onSubmit = async (values: any, form: any) => {
    console.log('values', values);

    let attachmentFileIds: string = '';

    if (attachment && attachment?.length > 0) {
      const uploadFileResponse = await uploadFiles(attachment);
      console.log('uploadFileResponse', uploadFileResponse);
      attachmentFileIds = uploadFileResponse
        .map((file: any) => file.id)
        .join(',');
    }

    const data = {
      ...values,
      attachmentFileIds,
    };

    console.log('data', data);
  };

  const handleAttachment = (files: File[]) => {
    setAttachments(files);
  };

  return {
    onSubmit,
    handleAttachment,
  };
};
