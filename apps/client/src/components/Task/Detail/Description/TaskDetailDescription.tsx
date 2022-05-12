import EditableField from '@components/shared/EditableField';
import React, { memo } from 'react';
import { MdOutlineDescription } from 'react-icons/md';

type Props = {
  defaultValue: string;
  updateDescription: () => void;
  onChange: (newDescription: string) => void;
};

const TaskDetailDescription = ({
  defaultValue,
  onChange,
  updateDescription,
}: Props) => {
  return (
    <EditableField
      title="Description"
      icon={<MdOutlineDescription />}
      onChange={onChange}
      onSubmit={updateDescription}
      defaultValue={defaultValue}
    />
  );
};

export default memo(TaskDetailDescription);
