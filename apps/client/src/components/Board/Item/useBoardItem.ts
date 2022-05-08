import { useLazyQuery } from '@apollo/client';
import { useBoardService } from '@talons/useBoardService';
import { GET_BOARD_BY_ID } from 'graphql/queries/board.queries';
import { useEffect } from 'react';

export const useBoardItem = (boardId: number) => {
  const [getBoardDetail] = useLazyQuery(GET_BOARD_BY_ID, {
    variables: {
      boardId,
    },
  });

  useEffect(() => {
    fetchBoardDetail();
  }, []);

  const fetchBoardDetail = async () => {
    await getBoardDetail();
  };

  const { getCachedBoard } = useBoardService();

  return {
    data: getCachedBoard(boardId),
  };
};
