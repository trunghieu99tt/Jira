import { useQuery } from '@apollo/client';
import { GET_PROJECT_BY_ID } from 'graphql/queries/project.queries';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export const useProjectPage = () => {
  const { projectId } = useParams();

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

  const project = data?.project;

  return {
    error,
    loading,
    audience,
    data: project,

    setAudience,
  };
};
