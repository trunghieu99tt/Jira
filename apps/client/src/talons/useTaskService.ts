import { useApolloClient, useLazyQuery, useMutation } from '@apollo/client';
import {
  CREATE_TASK_MUTATION,
  UPDATE_TASK_MUTATION,
} from 'graphql/mutations/task.mutation';
import { GET_BOARD_BY_ID } from 'graphql/queries/board.queries';
import { GET_TASK_BY_ID } from 'graphql/queries/task.queries';
import { useCallback } from 'react';

export const useTaskService = () => {
  const apolloClient = useApolloClient();
  const [updateTaskMutation] = useMutation(UPDATE_TASK_MUTATION);
  const [createTaskMutation] = useMutation(CREATE_TASK_MUTATION);
  const [getTaskDetailQuery, getTaskDetailQueryResponse] =
    useLazyQuery(GET_TASK_BY_ID);

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

  const updateTask = useCallback(
    async (taskId: number, data: any) => {
      await updateTaskMutation({
        variables: {
          id: taskId,
          ...data,
        },
        onCompleted: (data) => {
          if (data?.updateTask) {
            apolloClient.refetchQueries({
              include: [GET_TASK_BY_ID, GET_BOARD_BY_ID],
            });
          }
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
      });
    },
    [apolloClient, createTaskMutation],
  );

  return {
    getTaskDetailResponse: getTaskDetailQueryResponse,

    updateTask,
    createTask,
    getTaskDetail,
  };
};
