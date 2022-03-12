import React, { memo, useCallback, useState } from 'react';
import classNames from 'classnames';

// components
import Button from '@components/shared/Button';
import TextEditor from '@components/shared/TextEditor';

// icons
import { MdOutlineDescription } from 'react-icons/md';

// styles
import classes from './taskDetailDescription.module.css';

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
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const onClickBtn = () => {
    if (isEditing) {
      updateDescription();
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
      <p className={classes.label}>
        {' '}
        <MdOutlineDescription /> Description
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
          <Button
            variant="primary"
            classes={{
              root: classes.btn,
            }}
            onClick={onClickBtn}
          >
            Save
          </Button>

          {isEditing && (
            <Button
              variant="secondary"
              classes={{
                root: classNames(classes.btn, classes.btnCancel),
              }}
              onClick={onCloseEdit}
            >
              Cancel
            </Button>
          )}
        </div>
      )}
    </section>
  );
};

export default memo(TaskDetailDescription);
