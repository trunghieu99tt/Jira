// utils
import Form from '@components/shared/Form';
import mergeClasses from '@utils/mergeClasses';

// styles
import defaultClasses from './boardCreate.module.css';

type Props = {
  classes?: any;
};

const BoardCreate = ({ classes: propsClasses }: Props) => {
  const classes = mergeClasses(defaultClasses, propsClasses);

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
    />
  );
};

export default BoardCreate;
