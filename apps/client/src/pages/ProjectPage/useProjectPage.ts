import { useQuery } from '@apollo/client';
import { GET_PROJECT_BY_ID } from 'graphql/queries/project.queries';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';

export const useProjectPage = () => {
  const { projectId } = useParams();

  const [isProjectDetailOpened, setIsProjectDetailOpened] =
    useState<boolean>(false);

  const { loading, data, error } = useQuery(GET_PROJECT_BY_ID, {
    variables: {
      id: parseInt(projectId || '1', 10),
    },
  });

  const [audience, setAudience] = useState<number>(0);

  useEffect(() => {
    if (data?.project?.privacy) {
      setAudience(data.project.privacy);
    }
  }, [data]);

  const toggleProjectDetail = useCallback(() => {
    setIsProjectDetailOpened((v) => !v);
  }, []);

  const onOpenProjectDetail = useCallback(() => {
    setIsProjectDetailOpened(true);
  }, []);

  const onCloseProjectDetail = useCallback(() => {
    setIsProjectDetailOpened(false);
  }, []);

  const project = data?.project;

  return {
    error,
    loading,
    audience,
    data: project,
    isProjectDetailOpened,

    setAudience,
    onOpenProjectDetail,
    onCloseProjectDetail,
    toggleProjectDetail,
  };
};
