import Select from '@components/shared/Select';
import { TASK_PRIORITY, TASK_PRIORITY_LABEL } from '@constants/task';
import { useMemo } from 'react';

type Props = {
  defaultValue: number;
  onChange: (newPriority: string | number) => void;
};

const TaskDetailPrioritySelector = ({ defaultValue, onChange }: Props) => {
  const taskPriorityOptions = useMemo(() => {
    return Object.values(TASK_PRIORITY).map((priority) => ({
      value: priority,
      label: TASK_PRIORITY_LABEL[priority],
    }));
  }, []);

  const renderTaskPriorityOption = ({ value: priority }: { value: string }) => {
    return (
      <div>
        <span>{TASK_PRIORITY_LABEL[priority]}</span>
      </div>
    );
  };

  return (
    <Select
      value={defaultValue}
      onChange={onChange}
      options={taskPriorityOptions}
      renderOption={renderTaskPriorityOption}
      renderValue={renderTaskPriorityOption}
    />
  );
};

export default TaskDetailPrioritySelector;
