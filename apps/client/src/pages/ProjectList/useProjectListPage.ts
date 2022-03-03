import { useQuery } from '@apollo/client';
import { GET_PROJECT_LIST } from 'graphql/queries/project.queries';

export const useProjectListPage = () => {
  const { loading, data, error } = useQuery(GET_PROJECT_LIST);

  const projects = data?.projects;

  console.log('boards', projects);
  console.log('loading', loading);

  return {
    loading,
    data: projects,
    error,
  };
};
