import Button from '@components/shared/Button';
import Form from '@components/shared/Form';
import { useBoardService } from '@talons/useBoardService';
import mergeClasses from '@utils/mergeClasses';
import React, { useRef } from 'react';
import { useParams } from 'react-router';
import defaultClasses from './boardForm.module.css';

type Props = {
  classes?: any;
  close: () => void;
};

const BoardForm = ({ classes: propsClasses, close }: Props) => {
  const classes = mergeClasses(defaultClasses, propsClasses);
  const $formRef = useRef<HTMLFormElement>(null);
  const { projectId } = useParams();

  const { createNewBoard } = useBoardService();

  const onSubmit = async (values: any) => {
    await createNewBoard({
      name: values.name,
      projectId: parseInt(projectId || '1'),
    });
    close && typeof close === 'function' && close();
  };

  return (
    <Form
      enableReinitialize
      initialValues={{
        name: '',
      }}
      validations={{
        name: Form.is.required(),
      }}
      onSubmit={onSubmit}
      innerRef={$formRef}
    >
      <Form.Element className={classes.wrapper}>
        <h3 className={classes.heading}>Create a new board</h3>
        <Form.Field.Input name="name" label="Board name" />

        <div className={classes.actions}>
          <Button type="submit" variant="primary">
            Submit
          </Button>
          <Button
            type="button"
            variant="empty"
            onClick={() => {
              console.log('clicked cancel');
            }}
          >
            Cancel
          </Button>
        </div>
      </Form.Element>
    </Form>
  );
};

export default BoardForm;
