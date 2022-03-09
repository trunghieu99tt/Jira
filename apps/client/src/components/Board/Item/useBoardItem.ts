import { useQuery } from '@apollo/client';
import { GET_BOARD_BY_ID } from 'graphql/queries/board.queries';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { boardSelector, boardsState } from 'recoil/board.recoil';

export const useBoardItem = (id: number) => {
  const { loading, data, error } = useQuery(GET_BOARD_BY_ID, {
    variables: {
      boardId: id,
    },
  });
  const setBoards = useSetRecoilState(boardsState);
  const board = useRecoilValue(boardSelector(id));

  useEffect(() => {
    if (data?.board) {
      const { board } = data;

      setBoards((prevBoardsState) => ({
        ...prevBoardsState,
        [board.id]: board,
      }));
    }
  }, [data]);

  return {
    loading,
    data: board,
    error,
  };
};
