import {
  ApolloError,
  useApolloClient,
  useLazyQuery,
  useMutation,
} from '@apollo/client';
import { ITask, IUpdateBoardTask, IUpdateTask } from '@type/task.type';
import {
  CREATE_TASK_MUTATION,
  UPDATE_TASK_MUTATION,
} from 'graphql/mutations/task.mutation';
import { GET_BOARD_BY_ID } from 'graphql/queries/board.queries';
import { GET_TASK_BY_ID } from 'graphql/queries/task.queries';
import _ from 'lodash';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useBoardService } from './useBoardService';

export const useTaskService = () => {
  const apolloClient = useApolloClient();
  const [updateTaskMutation] = useMutation(UPDATE_TASK_MUTATION);
  const [createTaskMutation] = useMutation(CREATE_TASK_MUTATION);
  const [getTaskDetailQuery, getTaskDetailQueryResponse] =
    useLazyQuery(GET_TASK_BY_ID);
  const { moveTaskBetweenBoards, updateCachedBoards } = useBoardService();

  const getTaskDetail = useCallback(
    async (taskId: number) => {
      await getTaskDetailQuery({
        variables: {
          taskId,
        },
      });
    },
    [getTaskDetailQuery],
  );

  const getCachedTask = (taskId: number): ITask => {
    const cachedTaskDetail: {
      task: ITask;
    } | null = apolloClient.cache.readQuery({
      query: GET_TASK_BY_ID,
      variables: {
        id: taskId,
      },
    });
    return cachedTaskDetail?.task || ({} as ITask);
  };

  const updateCachedTask = (taskId: number, task: Partial<ITask>) => {
    apolloClient.cache.writeQuery({
      data: {
        task: {
          ...getCachedTask(taskId),
          ...task,
        },
      },
      query: GET_TASK_BY_ID,
      variables: {
        id: taskId,
      },
    });
  };

  const optimisticUpdateBoardTask = (
    taskId: number,
    input: IUpdateBoardTask,
  ): void => {
    const { data, sourceBoardId, destinationBoardId, updateType } = input;
    const updateData = _.merge({ updateType }, data);

    const { sourceBoard, destinationBoard } = moveTaskBetweenBoards(
      sourceBoardId!,
      destinationBoardId!,
      taskId,
      updateData,
    );

    updateTaskMutation({
      variables: {
        id: taskId,
        ...updateData,
      },
      onError: (err: ApolloError) => {
        toast.error(err.message);
        console.error('error', err);
        updateCachedBoards(
          [sourceBoard, destinationBoard].map((board) => {
            return {
              boardId: board.id,
              newBoardData: board,
            };
          }),
        );
      },
    });
  };

  const updateTask = useCallback(
    async (taskId: number, input: IUpdateTask) => {
      const { data, updateType } = input;
      const updateData = _.merge({ updateType }, data);

      await updateTaskMutation({
        variables: {
          id: taskId,
          ...updateData,
        },
        onCompleted: (data) => {
          if (data?.updateTask) {
            apolloClient.refetchQueries({
              include: [GET_BOARD_BY_ID],
            });
          }
        },
        onError: (error) => {
          console.error('error', error);
          toast.error(error.message);
        },
      });
    },
    [updateTaskMutation, apolloClient],
  );

  const createTask = useCallback(
    async (data: any, refetchBoardIds: number[]) => {
      await createTaskMutation({
        variables: {
          ...data,
        },
        onCompleted: (data) => {
          if (data?.createTask) {
            apolloClient.refetchQueries({
              include: [GET_TASK_BY_ID, GET_BOARD_BY_ID],
            });
          }
        },
        onError: (error) => {
          console.error('error', error);
          toast.error(error.message);
        },
      });
    },
    [apolloClient, createTaskMutation],
  );

  return {
    getTaskDetailResponse: getTaskDetailQueryResponse,

    updateTask,
    createTask,
    getTaskDetail,
    optimisticUpdateBoardTask,
  };
};
