import { useQuery } from '@apollo/client';
import { GET_PROJECT_BY_ID } from 'graphql/queries/project.queries';
import { useParams } from 'react-router';

export const useProjectPage = () => {
  const { projectId } = useParams();

  const { loading, data, error } = useQuery(GET_PROJECT_BY_ID, {
    variables: {
      id: parseInt(projectId || '1', 10),
    },
  });

  const project = data?.project;

  console.log('boards', project);
  console.log('loading', loading);

  return {
    loading,
    data: project,
    error,
  };
};
