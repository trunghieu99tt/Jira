import { useApolloClient, useMutation } from '@apollo/client';
import { IBoard } from '@type/board.type';
import { ITask } from '@type/task.type';
import { CREATE_PROJECT_MUTATION } from 'graphql/mutations/project.mutation';
import { GET_BOARD_BY_ID } from 'graphql/queries/board.queries';
import { useCallback } from 'react';

export const useBoardService = () => {
  const client = useApolloClient();
  const [createBoardMutation, createBoardResponse] = useMutation(
    CREATE_PROJECT_MUTATION,
  );

  const getBoard = useCallback(
    async (boardId: number) => {
      try {
        await client.query({
          query: GET_BOARD_BY_ID,
          variables: {
            boardId,
          },
        });
      } catch (error) {
        console.error('error', error);
      }
    },
    [client],
  );

  const getBoards = useCallback(
    async (boardIds: number[]) => {
      if (!boardIds.length) return;

      try {
        await Promise.all(
          boardIds.map(async (boardId) => {
            getBoard(boardId);
          }),
        );
      } catch (error) {
        console.error('error', error);
      }
    },
    [getBoard],
  );

  const getCachedBoard = (boardId: number) => {
    return client.cache.readQuery({
      query: GET_BOARD_BY_ID,
      variables: {
        boardId,
      },
    });
  };

  const updateCachedBoard = (boardId: number, newBoardData: IBoard) => {
    client.cache.writeQuery({
      query: GET_BOARD_BY_ID,
      variables: {
        boardId,
      },
      data: {
        board: newBoardData,
      },
    });
  };

  const removeTaskFromBoardCache = (boardId: number, taskId: number) => {
    const cachedBoard: any = getCachedBoard(boardId);
    if (!cachedBoard) return;

    const { tasks } = cachedBoard.board;
    const updatedTasks = tasks.filter((task: ITask) => task.id !== taskId);

    updateCachedBoard(boardId, {
      ...cachedBoard.board,
      tasks: updatedTasks,
    });
  };

  const addTaskToBoardCache = (boardId: number, task: ITask) => {
    const cachedBoard: any = getCachedBoard(boardId);
    if (!cachedBoard) return;

    const { tasks } = cachedBoard.board;
    const updatedTasks = [...tasks, task];

    updateCachedBoard(boardId, {
      ...cachedBoard.board,
      tasks: updatedTasks,
    });
  };

  const updateCacheBoardTasks = (
    boardId: number,
    task: any,
    strategy: 'add' | 'remove',
  ) => {
    if (strategy === 'remove') {
      removeTaskFromBoardCache(boardId, task.id);
    } else {
      addTaskToBoardCache(boardId, task);
    }
  };

  return {
    createBoardResponse,
    updateCacheBoardTasks,

    getBoard,
    getBoards,
  };
};
