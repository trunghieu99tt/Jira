import { useApolloClient, useLazyQuery, useMutation } from '@apollo/client';
import { IBoard } from '@type/board.type';
import { IBoardTask, ITask } from '@type/task.type';
import { CREATE_PROJECT_MUTATION } from 'graphql/mutations/project.mutation';
import { GET_BOARD_BY_ID } from 'graphql/queries/board.queries';
import _ from 'lodash';

export const useBoardService = () => {
  const client = useApolloClient();
  const [createBoardMutation, createBoardResponse] = useMutation(
    CREATE_PROJECT_MUTATION,
  );
  const [getBoardDetailQuery, getBoardDetailResponse] =
    useLazyQuery(GET_BOARD_BY_ID);

  const getCachedBoard = (boardId: number): IBoard | null => {
    const cachedBoard: {
      board: IBoard;
    } | null = client.cache.readQuery({
      query: GET_BOARD_BY_ID,
      variables: {
        boardId,
      },
    });
    return cachedBoard?.board || null;
  };

  const refetchBoard = async (boardId: number) => {
    await getBoardDetailQuery({
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
    const updatedTasks = [...tasks, task].sort(
      (a, b) => a.listPosition - b.listPosition,
    );

    updateCachedBoard(boardId, {
      ...cachedBoard.board,
      tasks: updatedTasks,
    });
  };

  const moveTaskBetweenBoards = (
    sourceBoardId: number,
    destinationBoardId: number,
    taskId: number,
    updateData: Partial<ITask>,
  ) => {
    const sourceBoard = getCachedBoard(sourceBoardId);
    const destinationBoard = getCachedBoard(destinationBoardId);
    if (!sourceBoard || !destinationBoard) return;
    const { tasks = [] } = sourceBoard;
    if (sourceBoardId !== destinationBoardId) {
      const task = _.find(tasks, (task: IBoardTask) => task.id === taskId);
      if (!task) return;
      const updatedTasks = tasks?.filter(
        (task: IBoardTask) => task.id !== taskId,
      );
      const updatedDestinationTasks = [
        ...(destinationBoard?.tasks || []),
        { ...task, ...updateData },
      ].sort((a, b) => a.listPosition - b.listPosition);
      updateCachedBoard(sourceBoardId, {
        ...sourceBoard,
        tasks: updatedTasks,
      });
      updateCachedBoard(destinationBoardId, {
        ...destinationBoard,
        tasks: updatedDestinationTasks,
      });
    } else {
      const task = _.find(tasks, (task: IBoardTask) => task.id === taskId);
      if (!task) return;
      const updatedTasks = _.map(tasks, (e) => {
        if (e.id === taskId) {
          return { ...e, ...updateData };
        }
        return e;
      }).sort((a, b) => a.listPosition - b.listPosition);
      console.log('updatedTasks', updatedTasks);
      updateCachedBoard(sourceBoardId, {
        ...sourceBoard,
        tasks: updatedTasks,
      });
    }
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
    refetchBoard,
    getCachedBoard,

    createBoardResponse,
    updateCacheBoardTasks,
    updateCachedBoard,
    createBoardMutation,
    addTaskToBoardCache,
    moveTaskBetweenBoards,
  };
};
