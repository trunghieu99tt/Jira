import { useLazyQuery, useMutation } from '@apollo/client';
import {
  CREATE_TASK_MUTATION,
  UPDATE_TASK_MUTATION,
} from 'graphql/mutations/task.mutation';
import { GET_TASK_BY_ID } from 'graphql/queries/task.queries';
import { useCallback } from 'react';
import { useBoardService } from './useBoardService';

export const useTaskService = () => {
  const [updateTaskMutation] = useMutation(UPDATE_TASK_MUTATION);
  const [createTaskMutation] = useMutation(CREATE_TASK_MUTATION);
  const [getTaskDetailQuery, getTaskDetailQueryResponse] =
    useLazyQuery(GET_TASK_BY_ID);

  const { getBoards, updateCacheBoardTasks } = useBoardService();

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
    async (
      taskId: number,
      data: any,
      {
        sourceBoardId,
        targetBoardId,
      }: {
        sourceBoardId?: number;
        targetBoardId?: number;
      } = {},
    ) => {
      await updateTaskMutation({
        variables: {
          id: taskId,
          ...data,
        },
        onCompleted: (data) => {
          if (data?.updateTask) {
            if (sourceBoardId) {
              updateCacheBoardTasks(sourceBoardId, data.updateTask, 'remove');
            }

            if (targetBoardId) {
              updateCacheBoardTasks(targetBoardId, data.updateTask, 'add');
            }

            getTaskDetail(taskId);
          }
        },
      });
    },
    [updateTaskMutation, getTaskDetail],
  );

  const createTask = useCallback(
    async (data: any, refetchBoardIds: number[]) => {
      await createTaskMutation({
        variables: {
          ...data,
        },
        onCompleted: (data) => {
          if (data?.createTask) {
            getBoards(refetchBoardIds);
          }
        },
      });
    },
    [createTaskMutation, getBoards],
  );

  return {
    getTaskDetailResponse: getTaskDetailQueryResponse,

    updateTask,
    createTask,
    getTaskDetail,
  };
};
