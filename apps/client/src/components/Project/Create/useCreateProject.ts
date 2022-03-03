import { useBoards } from '@talons/useBoards';
import { imageUpload } from '@utils/imageUploader';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user.recoil';

export const useCreateProject = () => {
  const [audience, setAudience] = useState<number>(0);
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);

  const { createBoardFunction, createBoardResponse } = useBoards();

  const currentUser = useRecoilValue(userState);

  const onChangeAudience = useCallback((value: number) => {
    setAudience(value);
  }, []);

  const onSubmit = async (values: any, form: any) => {
    console.log('values', values);
    let coverPhotoUrl = '';
    if (coverPhoto) {
      const uploadResponses = await imageUpload([coverPhoto]);
      coverPhotoUrl = uploadResponses?.[0] || '';
    }
    const { name, description } = values;

    createBoardFunction({
      variables: {
        name,
        description,
        coverPhoto: coverPhotoUrl,
        privacy: audience,
        ownerId: currentUser?.id || 1,
      },
    });
  };

  const handleFiles = (files: File[]) => {
    console.log('files', files);
    setCoverPhoto(files[0]);
  };

  useEffect(() => {
    console.log('createBoardResponse', createBoardResponse);
  }, [createBoardResponse]);

  return {
    audience,
    createBoardResponse,

    onSubmit,
    handleFiles,
    onChangeAudience,
  };
};
