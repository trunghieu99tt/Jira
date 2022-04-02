import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_TASK_LABELS } from '../graphql/mutations/task-label.mutation';
import { GET_TASK_LABELS } from '../graphql/queries/task-label.queries';

type Props = {
  taskId: number;
};

export const useTaskLabelService = ({ taskId }: Props) => {
  const getTaskLabelQuery = useQuery(GET_TASK_LABELS, {
    variables: {
      taskId,
    },
  });
  const [updateTaskLabelMutation, _] = useMutation(UPDATE_TASK_LABELS);

  const updateTaskLabels = (taskId: number, labelId: number) => {
    updateTaskLabelMutation({
      variables: {
        taskId,
        labelId,
      },
      onCompleted: () => {
        getTaskLabelQuery.refetch();
      },
    });
  };

  return {
    taskLabels: getTaskLabelQuery.data?.taskLabels || [],
    updateTaskLabels,
  };
};
