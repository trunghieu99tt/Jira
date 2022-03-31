import { useMemo } from 'react';

// components
import Select from '@components/shared/Select';

// constants
import { TASK_TYPES, TASK_TYPES_LABEL } from '@constants/task';

import { RiFileHistoryLine } from 'react-icons/ri';
import { BiTask } from 'react-icons/bi';
import { AiOutlineBug } from 'react-icons/ai';
import classes from './typeSelector.module.css';

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
    let icon = <BiTask />;
    if (type) {
      switch (type.toLowerCase()) {
        case 'bug':
          icon = <AiOutlineBug />;
          break;
        case 'story':
          icon = <RiFileHistoryLine />;
          break;
        default:
          icon = <BiTask />;
      }
    }

    return (
      <div className={classes.option}>
        {icon}
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
