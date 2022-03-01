import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_BOARDS } from 'queries/board.queries';

export const useBoards = () => {
  const [getBoards, getBoardResponse] = useLazyQuery(GET_BOARDS);
  const [createBoardFunction, createBoardResponse] = useMutation(GET_BOARDS);

  return {
    getBoards,
    createBoardFunction,
    createBoardResponse,
    getBoardResponse,
  };
};
