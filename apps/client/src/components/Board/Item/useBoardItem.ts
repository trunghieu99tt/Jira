import { useQuery } from '@apollo/client';
import { GET_BOARD_BY_ID } from 'graphql/queries/board.queries';

export const useBoardItem = (boardId: number) => {
  const getBoardDetailResponse = useQuery(GET_BOARD_BY_ID, {
    variables: {
      boardId,
    },
  });

  return {
    getBoardDetailResponse,
  };
};
