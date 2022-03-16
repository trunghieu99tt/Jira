import { useApolloClient, useQuery } from '@apollo/client';
import { GET_BOARD_BY_ID } from 'graphql/queries/board.queries';

export const useBoardItem = (boardId: number) => {
  const client = useApolloClient();

  const getBoardDetailResponse = useQuery(GET_BOARD_BY_ID, {
    variables: {
      boardId,
    },
  });

  const cachedData = client.cache.readQuery({
    query: GET_BOARD_BY_ID,
    variables: {
      boardId,
    },
  });

  console.log('cachedData', cachedData);

  return {
    getBoardDetailResponse,
  };
};
