// talons
import { useCreateProject } from './useCreateProject';

// utils
import mergeClasses from '@utils/mergeClasses';

// components
import Form from '@components/shared/Form';
import Button from '@components/shared/Button';
import AudienceSelector from '../AudienceSelector';
import FileUploader from '@components/shared/FileUploader';

// styles
import defaultClasses from './createProject.module.css';

type Props = {
  classes?: any;
};

const CreateProject = ({ classes: propsClasses }: Props) => {
  const classes = mergeClasses(defaultClasses, propsClasses);

  const { audience, handleFiles, onChangeAudience, onSubmit } =
    useCreateProject();

  return (
    <Form
      enableReinitialize
      initialValues={{
        name: '',
        description: '',
      }}
      validations={{
        name: Form.is.required(),
      }}
      onSubmit={onSubmit}
    >
      <Form.Element className={classes.formWrapper}>
        <h3>Create a new project</h3>
        <FileUploader
          title="Cover photo"
          handleFiles={handleFiles}
          shouldHavePreview={true}
          maxNumberOfFiles={1}
        />
        <Form.Field.Input name="name" label="Name" />
        <Form.Field.Input name="description" label="Description" />
        <AudienceSelector audience={audience} setAudience={onChangeAudience} />
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

export default CreateProject;
