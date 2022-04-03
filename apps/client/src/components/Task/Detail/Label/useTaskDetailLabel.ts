import { useTaskLabelService } from '@talons/useTaskLabelService';
import { useState } from 'react';
import { useLabelService } from '@talons/useLabelService';
import { iLabel } from '@type/label.types';
import { iTaskLabel } from '@type/task.type';

type Props = {
  taskId: number;
};

export const useTaskDetailLabel = ({ taskId }: Props) => {
  const { updateTaskLabels, taskLabels } = useTaskLabelService({ taskId });
  const { labels } = useLabelService();
  const [showAddLabel, setShowAddLabel] = useState<boolean>(false);

  const updateTaskLabelHandler = (labelId: number) => {
    updateTaskLabels(taskId, labelId);
  };

  const onToggleAddLabelHandler = () => {
    setShowAddLabel((v) => !v);
  };

  const shownLabels = labels.filter((label: iLabel) => {
    return taskLabels.some(
      (taskLabel: iTaskLabel) => taskLabel.labelId === label.id,
    );
  });

  return {
    labels: shownLabels,
    taskLabels,
    showAddLabel,

    onToggleAddLabelHandler,
    updateTaskLabelHandler,
  };
};
