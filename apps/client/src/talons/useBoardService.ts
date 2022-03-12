import { useApolloClient, useLazyQuery, useMutation } from '@apollo/client';
import { CREATE_PROJECT_MUTATION } from 'graphql/mutations/project.mutation';
import { GET_BOARD_BY_ID } from 'graphql/queries/board.queries';
import { GET_PROJECT_LIST } from 'graphql/queries/project.queries';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { boardsState } from 'recoil/board.recoil';

export const useBoardService = () => {
  const client = useApolloClient();
  const [getBoardsQuery, getBoardResponse] = useLazyQuery(GET_PROJECT_LIST);
  const [createBoardMutation, createBoardResponse] = useMutation(
    CREATE_PROJECT_MUTATION,
  );
  const [boards, setBoards] = useRecoilState(boardsState);

  const fetchMultiBoards = useCallback(
    async (boardIds: number[]) => {
      if (!boardIds.length) return;

      try {
        const responses = await Promise.all(
          boardIds.map(async (boardId: number) => {
            return client.query({
              query: GET_BOARD_BY_ID,
              variables: {
                boardId,
              },
              fetchPolicy: 'network-only',
            });
          }),
        );

        const newBoards = responses.map((response) => response.data.board);
        const newLocalBoards = {
          ...boards,
          ...newBoards.reduce((acc, board) => {
            return {
              ...acc,
              [board.id]: board,
            };
          }, {}),
        };
        setBoards(newLocalBoards);
      } catch (error) {
        console.error('error', error);
      }
    },
    [boards, client, setBoards],
  );

  const fetchBoard = useCallback(
    async (boardId: number) => {
      try {
        const response = await client.query({
          query: GET_BOARD_BY_ID,
          variables: {
            boardId,
          },
        });

        const newBoard = response.data.board;
        const newLocalBoards = {
          ...boards,
          [boardId]: newBoard,
        };
        setBoards(newLocalBoards);
      } catch (error) {
        console.error('error', error);
      }
    },
    [boards, client, setBoards],
  );

  return {
    getBoardResponse,
    createBoardResponse,

    fetchBoard,
    fetchMultiBoards,
    getBoards: getBoardsQuery,
    createBoardFunction: createBoardMutation,
  };
};
