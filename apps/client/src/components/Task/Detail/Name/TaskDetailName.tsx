import { useCallback, useRef, useState } from 'react';

// talons
import useOnClickOutsideWithoutOverlay from '@hooks/useOnClickOutsideWithoutOverlay';

// utils
import mergeClasses from '@utils/mergeClasses';

// components
import Input from '@components/shared/Input';

// styles
import defaultClasses from './taskDetailName.module.css';

type Props = {
  defaultValue: string;
  classes?: any;
  onChange: (newName: string) => void;
};

const TaskDetailName = ({
  defaultValue,
  onChange: onUpdate,
  classes: propClasses,
}: Props) => {
  const classes = mergeClasses(defaultClasses, propClasses);
  const $inputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState<string>(defaultValue || '');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const onEdit = useCallback(() => setIsEditing(true), []);
  const onCancelEdit = useCallback(() => setIsEditing(false), []);

  const onBlur = useCallback(() => {
    onUpdate(name);
    onCancelEdit();
  }, [name, onCancelEdit, onUpdate]);

  useOnClickOutsideWithoutOverlay($inputRef, onBlur);

  const onChange = (value: string) => {
    setName(value);
  };

  return (
    (isEditing && (
      <Input
        ref={$inputRef}
        value={name}
        onBlur={onBlur}
        onChange={onChange}
        classes={{
          input: classes.input,
        }}
      />
    )) || (
      <p className={classes.value} onClick={onEdit}>
        {name}
      </p>
    )
  );
};

export default TaskDetailName;
