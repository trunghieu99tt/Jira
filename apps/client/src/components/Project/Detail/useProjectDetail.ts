import { useMutation } from '@apollo/client';
import { useProjectService } from '@talons/useProjectService';
import { IProject } from '@type/project.type';
import { UPDATE_PROJECT_MUTATION } from 'graphql/mutations/project.mutation';
import { useEffect, useState } from 'react';

type Props = {
  data: IProject;
};

export const useProjectDetail = ({ data }: Props) => {
  const [updateProjectMutation] = useMutation(UPDATE_PROJECT_MUTATION);

  const [description, setDescription] = useState<string>(
    data?.description || '',
  );
  const { updateProject } = useProjectService();

  const onChangeDescription = (newDescription: string) => {
    // remove malicious code
    if (newDescription.includes('<script>')) {
      newDescription = newDescription.replace(/<script>/g, '');
    }
    setDescription(newDescription);
  };

  const updateDescription = () => {
    if (data.description !== description) {
      updateProject({
        id: data.id,
        description,
      });
    }
  };

  useEffect(() => {
    console.log('data', data);
    setDescription(data?.description || '');
  }, [data]);

  return {
    description,
    updateDescription,
    onChangeDescription,
  };
};
