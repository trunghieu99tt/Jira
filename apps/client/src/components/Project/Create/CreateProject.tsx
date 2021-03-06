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
        <div className={classes.item}>
          <FileUploader
            title="Cover photo"
            handleFiles={handleFiles}
            shouldHavePreview={true}
            maxNumberOfFiles={1}
          />
        </div>
        <div className={classes.item}>
          <Form.Field.Input name="name" label="Name" />
        </div>
        <div className={classes.item}>
          <Form.Field.TextEditor name="description" label="Description" />
        </div>
        <div className={classes.item}>
          <p className={classes.label}>Audience</p>
          <AudienceSelector
            audience={audience}
            setAudience={onChangeAudience}
          />
        </div>
        <div className={classes.item}>
          <p className={classes.label}>Team</p>
          <ul className={classes.userList}>
            {users
              ?.filter((user: IUser) => addedUserIds?.includes(user.id))
              .map((user: IUser) => {
                return (
                  <Button variant="outline">
                    {user.name}

                    <span>
                      <TiDelete onClick={onRemoveUser(user.id)} />
                    </span>
                  </Button>
                );
              })}
          </ul>
          <SearchWithDropdown
            onSearch={onSearchUsers}
            onClickResult={onAddUser}
            renderResult={renderUserOption}
            options={userOptions}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" variant="primary">
            Submit
          </Button>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </div>
      </Form.Element>
    </Form>
  );
};

export default CreateProject;
