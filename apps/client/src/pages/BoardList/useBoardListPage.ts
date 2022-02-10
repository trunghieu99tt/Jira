import { useQuery } from '@apollo/client';
import { GET_BOARDS } from 'queries/board.queries';

export const useBoardList = () => {
  const { loading, data, error } = useQuery(GET_BOARDS);

  const boards = data?.boards;

  console.log('boards', boards);
  console.log('loading', loading);

  return {
    loading,
    data: boards,
    error,
  };
};
