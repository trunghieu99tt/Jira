import { useLazyQuery, useMutation } from '@apollo/client';
import { CREATE_BOARD_MUTATION } from 'graphql/mutations/project.mutation';
import { GET_PROJECT_LIST } from 'graphql/queries/project.queries';

export const useBoards = () => {
  const [getBoards, getBoardResponse] = useLazyQuery(GET_PROJECT_LIST);
  const [createBoardFunction, createBoardResponse] = useMutation(
    CREATE_BOARD_MUTATION,
  );

  return {
    getBoards,
    createBoardFunction,
    createBoardResponse,
    getBoardResponse,
  };
};
