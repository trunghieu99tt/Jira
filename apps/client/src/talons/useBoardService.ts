import { useApolloClient, useLazyQuery, useMutation } from '@apollo/client';
import { IBoard } from '@type/board.type';
import { IBoardTask, ITask } from '@type/task.type';
import { CREATE_NEW_BOARD } from 'graphql/mutations/board.mutation';
import { GET_BOARD_BY_ID } from 'graphql/queries/board.queries';
import { GET_PROJECT_BY_ID } from 'graphql/queries/project.queries';
import _ from 'lodash';

export const useBoardService = () => {
  const client = useApolloClient();
  const [createBoardMutation, createBoardResponse] =
    useMutation(CREATE_NEW_BOARD);
  const [getBoardDetailQuery] = useLazyQuery(GET_BOARD_BY_ID);

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

  const updateCachedBoards = (
    input: {
      boardId: number;
      newBoardData: IBoard;
    }[],
  ) => {
    input.forEach((board) => {
      updateCachedBoard(board.boardId, board.newBoardData);
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
  ): {
    sourceBoard: IBoard;
    destinationBoard: IBoard;
  } => {
    const sourceBoard = getCachedBoard(sourceBoardId);
    const destinationBoard = getCachedBoard(destinationBoardId);
    if (!sourceBoard || !destinationBoard) {
      throw new Error('Board not found');
    }

    const { tasks = [] } = sourceBoard;
    const task = _.find(tasks, (task: IBoardTask) => task.id === taskId);
    if (!task) {
      throw new Error('Task not found');
    }

    const updatedBoards = [];

    if (sourceBoardId !== destinationBoardId) {
      const updatedSourceBoardTasks = tasks?.filter(
        (task: IBoardTask) => task.id !== taskId,
      );
      const updatedDestinationBoardTasks = [
        ...(destinationBoard?.tasks || []),
        { ...task, ...updateData },
      ].sort((a, b) => a.listPosition - b.listPosition);

      updatedBoards.push(
        ...[
          {
            boardId: sourceBoardId,
            newBoardData: {
              ...sourceBoard,
              tasks: updatedSourceBoardTasks,
            },
          },
          {
            boardId: destinationBoardId,
            newBoardData: {
              ...destinationBoard,
              tasks: updatedDestinationBoardTasks,
            },
          },
        ],
      );
    } else {
      const updatedTasks = _.map(tasks, (e) => {
        if (e.id === taskId) {
          return { ...e, ...updateData };
        }
        return e;
      }).sort((a, b) => a.listPosition - b.listPosition);
      updatedBoards.push({
        boardId: sourceBoardId,
        newBoardData: {
          ...sourceBoard,
          tasks: updatedTasks,
        },
      });
    }

    updateCachedBoards(updatedBoards);

    return {
      sourceBoard,
      destinationBoard,
    };
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

  const createNewBoard = async (input: { name: string; projectId: number }) => {
    const { data } = await createBoardMutation({
      variables: {
        ...input,
      },
      onCompleted: () => {
        client.refetchQueries({
          include: [GET_PROJECT_BY_ID],
        });
      },
    });
    return data;
  };

  return {
    refetchBoard,
    getCachedBoard,

    createNewBoard,
    updateCachedBoard,
    updateCachedBoards,
    createBoardMutation,
    addTaskToBoardCache,
    moveTaskBetweenBoards,
    updateCacheBoardTasks,
  };
};
