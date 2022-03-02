import { useQuery } from '@apollo/client';
import { GET_PROJECT_LIST } from 'graphql/queries/project.queries';

export const useBoardList = () => {
  const { loading, data, error } = useQuery(GET_PROJECT_LIST);

  const boards = data?.boards;

  console.log('boards', boards);
  console.log('loading', loading);

  return {
    loading,
    data: boards,
    error,
  };
};
