import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_BOARDS } from 'queries/board.queries';

export const useBoards = () => {
  const [getBoards, getBoardResponse] = useLazyQuery(GET_BOARDS);
  const [createBoardFuntion, createBoardResponse] = useMutation(GET_BOARDS);

  return {
    getBoards,
    getBoardResponse,
  };
};
