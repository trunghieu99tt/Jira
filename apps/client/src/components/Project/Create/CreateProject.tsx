import { useCreateProject } from './useCreateProject';
import mergeClasses from '@utils/mergeClasses';
import Form from '@components/shared/Form';
import Button from '@components/shared/Button';
import AudienceSelector from '../AudienceSelector';
import FileUploader from '@components/shared/FileUploader';
import defaultClasses from './createProject.module.css';
import SearchWithDropdown from '@components/shared/SearchWithDropdown';
import UserOption from '@components/shared/UserOption';
import { IUser } from '@type/user.types';

import { TiDelete } from 'react-icons/ti';

type Props = {
  classes?: any;
};

const CreateProject = ({ classes: propsClasses }: Props) => {
  const classes = mergeClasses(defaultClasses, propsClasses);

  const {
    users,
    audience,
    addedUserIds,
    onChangeAudience,

    onSubmit,
    onAddUser,
    handleFiles,
    onSearchUsers,
    onRemoveUser,
  } = useCreateProject();

  const renderUserOption = ({ value }: any) => {
    const projectUser = users.find((u: IUser) => u.id === value);
    return (
      <UserOption
        data={{
          name: projectUser?.name || '',
          avatar: projectUser?.avatar || '',
        }}
      />
    );
  };

  const userOptions =
    users
      ?.filter((u: IUser) => !addedUserIds.includes(u.id))
      ?.map((user: IUser) => {
        return {
          value: user.id,
          label: user.name,
        };
      })
      ?.filter(Boolean) || [];

  return (
    <Form
      enableReinitialize
      initialValues={{
        name: '',
        description: '',
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
        {users
          ?.filter((user: IUser) => addedUserIds?.includes(user.id))
          .map((user: IUser) => {
            return (
              <Button variant="outlined">
                {user.name}

                <span>
                  <TiDelete onClick={onRemoveUser(user.id)} />
                </span>
              </Button>
            );
          })}
        <SearchWithDropdown
          onSearch={onSearchUsers}
          onClickResult={onAddUser}
          renderResult={renderUserOption}
          options={userOptions}
        />
        <div className={classes.actions}>
          <Button type="submit" variant="primary">
            Submit
          </Button>
          <Button type="button" variant="empty">
            Cancel
          </Button>
        </div>
      </Form.Element>
    </Form>
  );
};

export default CreateProject;
