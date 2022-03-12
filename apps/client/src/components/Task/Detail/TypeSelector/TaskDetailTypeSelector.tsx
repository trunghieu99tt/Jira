import { useMemo } from 'react';

// components
import Select from '@components/shared/Select';

// constants
import { TASK_TYPES, TASK_TYPES_LABEL } from '@constants/task';

type Props = {
  defaultValue: string;
  onChange: (newType: string | number) => void;
};

const TaskDetailTypeSelector = ({ defaultValue, onChange }: Props) => {
  const taskTypeOptions = useMemo(
    () =>
      Object.values(TASK_TYPES).map((taskType) => ({
        value: taskType,
        label: TASK_TYPES_LABEL[taskType],
      })),
    [],
  );

  const renderTaskTypeOptions = ({ value: type }: { value: string }) => {
    return (
      <div>
        <span>{TASK_TYPES_LABEL[type]}</span>
      </div>
    );
  };

  return (
    <Select
      value={defaultValue}
      options={taskTypeOptions}
      onChange={onChange}
      defaultValue={defaultValue}
      renderOption={renderTaskTypeOptions}
      renderValue={renderTaskTypeOptions}
    />
  );
};

export default TaskDetailTypeSelector;
