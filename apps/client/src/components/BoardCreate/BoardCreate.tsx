import React, { ChangeEvent } from 'react';

// utils
import mergeClasses from '@utils/mergeClasses';

// components
import Form from '@components/shared/Form';

// styles
import defaultClasses from './boardCreate.module.css';
import FileUploader from '@components/shared/FileUploader';

type Props = {
  classes?: any;
};

const BoardCreate = ({ classes: propsClasses }: Props) => {
  const classes = mergeClasses(defaultClasses, propsClasses);

  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (!file) return;

    const coverPhotoURL = URL.createObjectURL(file);
  };

  const onSubmit = () => {};

  const handleFiles = (files: File[]) => {
    console.log('files', files);
  };

  return (
    <Form
      enableReinitialize
      initialValues={{
        coverPhoto: '',
        name: '',
        description: '',
        owner: 1,
        privacy: 'public',
      }}
      validation={{
        name: Form.is.required(),
        owner: Form.is.required(),
        privacy: Form.is.required(),
      }}
      onSubmit={onSubmit}
    >
      <div className={classes.formWrapper}>
        <h3>Create a new board</h3>
        <FileUploader handleFiles={handleFiles} />
        <Form.Field.Input name="name" label="Name" />
        <Form.Field.Input
          name="description"
          label="Description"
          onChange={onChangeImage}
        />
      </div>
    </Form>
  );
};

export default BoardCreate;
