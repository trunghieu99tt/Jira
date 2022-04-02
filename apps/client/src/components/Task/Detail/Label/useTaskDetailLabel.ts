import { useTaskLabelService } from '@talons/useTaskLabelService';
import { useState } from 'react';

type Props = {
  taskId: number;
};

export const useTaskDetailLabel = ({ taskId }: Props) => {
  const { updateTaskLabels, taskLabels } = useTaskLabelService({ taskId });
  const [showAddLabel, setShowAddLabel] = useState<boolean>(false);

  const updateTaskLabelHandler = (labelId: number) => {
    updateTaskLabels(taskId, labelId);
  };

  const onToggleAddLabelHandler = () => {
    setShowAddLabel((v) => !v);
  };

  return {
    taskLabels,
    showAddLabel,

    onToggleAddLabelHandler,
    updateTaskLabelHandler,
  };
};
