import { useQuery } from '@apollo/client';
import { GET_PROJECT_LIST } from 'graphql/queries/project.queries';

export const useProjectListPage = () => {
  const { data, error, loading } = useQuery(GET_PROJECT_LIST, {
    variables: {
      first: 10,
      after: null,
    },
  });

  const projects = data?.projects?.edges || [];

  console.log('projects', data?.projects?.edges);

  return {
    loading,
    data: projects,
    error,
  };
};
