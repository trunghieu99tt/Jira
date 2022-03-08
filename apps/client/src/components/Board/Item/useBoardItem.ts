import { useQuery } from '@apollo/client';
import { GET_BOARD_BY_ID } from 'graphql/queries/board.queries';

export const useBoardItem = (id: number) => {
  const { loading, data, error } = useQuery(GET_BOARD_BY_ID, {
    variables: {
      boardId: id,
    },
  });

  const board = data?.board || {};

  return {
    loading,
    data: board,
    error,
  };
};
