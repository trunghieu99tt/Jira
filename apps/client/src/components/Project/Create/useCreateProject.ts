import { useProjectService } from '@talons/useProjectService';
import { uploadFiles } from '@utils/imageUploader';
import { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user.recoil';
import { useUserService } from '@talons/useUserService';
import { IUser } from '@type/user.types';

export const useCreateProject = () => {
  const [audience, setAudience] = useState<number>(0);
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [addedUserIds, setAddedUserIds] = useState<number[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);

  const { createProject, createProjectResponse } = useProjectService();
  const { searchUsers } = useUserService();

  const currentUser = useRecoilValue(userState);

  const onChangeAudience = useCallback((value: number) => {
    setAudience(value);
  }, []);

  const submitCreateProject = async (values: any, form: any) => {
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

  const onSearchUsers = async (searchText: string) => {
    const matchedUsers = await searchUsers(searchText);
    setUsers(matchedUsers);
  };

  const onAddUser = (value: number) => {
    if (value && !isNaN(value)) {
      setAddedUserIds(Array.from(new Set([...addedUserIds, value])));
    }
  };

  const onRemoveUser = (value: number) => (event: any) => {
    event.preventDefault();
    if (value && !isNaN(value)) {
      setAddedUserIds(addedUserIds.filter((id) => id !== value));
    }
  };

  return {
    users,
    audience,
    onAddUser,
    addedUserIds,
    createProjectResponse,

    onSubmit: submitCreateProject,
    handleFiles,
    onRemoveUser,
    onSearchUsers,
    onChangeAudience,
  };
};
