import { useProjectService } from '@talons/useProjectService';
import { uploadFiles } from '@utils/imageUploader';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user.recoil';

export const useCreateProject = () => {
  const [audience, setAudience] = useState<number>(0);
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);

  const { createProject, createProjectResponse } = useProjectService();

  const currentUser = useRecoilValue(userState);

  const onChangeAudience = useCallback((value: number) => {
    setAudience(value);
  }, []);

  const onSubmit = async (values: any, form: any) => {
    let coverPhotoFileId = null;
    if (coverPhoto) {
      const uploadFileResponse = await uploadFiles([coverPhoto]);
      coverPhotoFileId = uploadFileResponse[0];
    }
    const { name, description } = values;

    createProject({
      name,
      description,
      coverPhotoFileId,
      privacy: audience,
      ownerUserId: currentUser?.id || 1,
    });
  };

  const handleFiles = (files: File[]) => {
    console.log('files', files);
    setCoverPhoto(files[0]);
  };

  useEffect(() => {
    console.log('createProjectResponse', createProjectResponse);
  }, [createProjectResponse]);

  return {
    audience,
    createProjectResponse,

    onSubmit,
    handleFiles,
    onChangeAudience,
  };
};
