import mergeClasses from '@utils/mergeClasses';
import React, { memo, useCallback, useState } from 'react';
import Button from '../Button';
import TextEditor from '../TextEditor';
import defaultClasses from './editableField.module.css';

type Props = {
  title?: string;
  icon?: React.ReactNode;
  defaultValue: string;
  onSubmit: () => void;
  onChange: (newValue: string) => void;
  classes?: Record<string, string>;
};

const EditableField = ({
  icon,
  title,
  classes: propsClasses,
  defaultValue,
  onSubmit,
  onChange,
}: Props) => {
  const classes = mergeClasses(defaultClasses, propsClasses);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const onClickBtn = () => {
    if (isEditing) {
      onSubmit();
    }
    setIsEditing((v) => !v);
  };

  const onCloseEdit = useCallback(() => {
    setIsEditing(false);
  }, []);

  const onOpenEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  return (
    <section className={classes.root}>
      <p className={classes.label} onClick={onOpenEdit}>
        {icon} {title}
      </p>
      {(isEditing && (
        <TextEditor defaultValue={defaultValue} onChange={onChange} />
      )) || (
        <div
          className={classes.value}
          dangerouslySetInnerHTML={{
            __html: defaultValue || '',
          }}
          onClick={onOpenEdit}
        />
      )}
      {isEditing && (
        <div className={classes.actionsBtn}>
          <Button variant="primary" onClick={onClickBtn}>
            Save
          </Button>

          {isEditing && (
            <Button variant="secondary" onClick={onCloseEdit}>
              Cancel
            </Button>
          )}
        </div>
      )}
    </section>
  );
};

export default memo(EditableField);
