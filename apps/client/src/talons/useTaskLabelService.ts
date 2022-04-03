import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_TASK_LABELS } from '../graphql/mutations/task-label.mutation';
import { GET_TASK_LABELS } from '../graphql/queries/task-label.queries';
import { iTaskLabel } from '@type/task.type';

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

  const taskLabels =
    getTaskLabelQuery?.data?.taskLabels?.map((taskLabel: iTaskLabel) => ({
      // !! id is id of label in db not id of task_label in db
      id: taskLabel.labelId,
      name: taskLabel.name,
      color: taskLabel.color,
    })) || [];

  return {
    taskLabels,
    updateTaskLabels,
  };
};
