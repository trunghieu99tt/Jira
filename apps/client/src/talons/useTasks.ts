import { useLazyQuery, useMutation } from '@apollo/client';
import {
  CREATE_TASK_MUTATION,
  UPDATE_TASK_MUTATION,
} from 'graphql/mutations/task.mutation';
import { GET_TASK_BY_ID } from 'graphql/queries/task.queries';
import { useBoardService } from './useBoards';

export const useTaskService = () => {
  const [updateTaskMutation] = useMutation(UPDATE_TASK_MUTATION);
  const [createTaskMutation] = useMutation(CREATE_TASK_MUTATION);
  const [getTaskDetailQuery, getTaskDetailQueryResponse] =
    useLazyQuery(GET_TASK_BY_ID);

  const { fetchMultiBoards } = useBoardService();

  const updateTask = async (
    taskId: number,
    data: any,
    refetchBoardIds: number[],
  ) => {
    await updateTaskMutation({
      variables: {
        id: taskId,
        ...data,
      },
      onCompleted: (data) => {
        if (data?.updateTask) {
          fetchMultiBoards(refetchBoardIds);
          fetchTaskDetail(taskId);
        }
      },
    });
  };

  const createTask = async (data: any, refetchBoardIds: number[]) => {
    await createTaskMutation({
      variables: {
        ...data,
      },
      onCompleted: (data) => {
        if (data?.createTask) {
          fetchMultiBoards(refetchBoardIds);
        }
      },
    });
  };

  const fetchTaskDetail = async (taskId: number) => {
    await getTaskDetailQuery({
      variables: {
        taskId,
      },
    });
  };

  return {
    getTaskDetailResponse: getTaskDetailQueryResponse,

    updateTask,
    createTask,
    fetchTaskDetail,
  };
};
