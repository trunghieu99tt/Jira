import { useTaskLabelService } from '@talons/useTaskLabelService';
import { useMemo, useState } from 'react';
import { useLabelService } from '@talons/useLabelService';
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

  const shownLabels = useMemo(() => {
    return labels.filter((label) => {
      return !taskLabels.some(
        (taskLabel: iTaskLabel) => taskLabel.id === label.id,
      );
    });
  }, [labels, taskLabels]);

  return {
    labels: shownLabels,
    taskLabels,
    showAddLabel,

    onToggleAddLabelHandler,
    updateTaskLabelHandler,
  };
};
