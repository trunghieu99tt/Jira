import { useMutation } from '@apollo/client';
import { UPDATE_TASK_MUTATION } from 'graphql/mutations/task.mutation';

export const useTasks = () => {
  const [updateTaskFunction] = useMutation(UPDATE_TASK_MUTATION);

  return {
    updateTaskFunction,
  };
};
