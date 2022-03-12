// components
import Avatar from '@components/shared/Avatar';
import Select from '@components/shared/Select';
// types
import { IProjectUser } from '@type/project.type';
import { useRecoilValue } from 'recoil';
// global state
import { selectProjectUsersByProjectId } from 'recoil/project.recoil';
// styles
import classes from './projectUserSelector.module.css';

type Props = {
  projectId: number;
  defaultValue: number;
  selectable?: boolean;
  onChange: (newProjectUserId: string | number) => void;
};

const TaskDetailProjectUserSelector = ({
  projectId,
  defaultValue,
  selectable = true,
  onChange,
}: Props) => {
  const projectUsers = useRecoilValue(selectProjectUsersByProjectId(projectId));

  if (!projectUsers) {
    return null;
  }

  const renderProjectUserOption = ({ value }: any) => {
    const projectUser = projectUsers.find((u) => u.userId === value);
    return (
      <div className={classes.userOption}>
        {projectUser?.avatar && (
          <Avatar
            src={projectUser.avatar}
            alt={projectUser.name}
            size="SMALL"
            classes={{
              root: classes.userAvatarRoot,
            }}
          />
        )}
        <span>{projectUser?.name}</span>
      </div>
    );
  };

  const userOptions = projectUsers
    .map((projectUser: IProjectUser) => {
      if (projectUser.userId === defaultValue) return null;

      return {
        value: projectUser.userId,
        label: projectUser.name,
      };
    })
    .filter(Boolean);

  return (
    <Select
      value={defaultValue}
      options={userOptions}
      selectable={selectable}
      onChange={onChange}
      defaultValue={defaultValue}
      renderOption={renderProjectUserOption}
      renderValue={renderProjectUserOption}
    />
  );
};

export default TaskDetailProjectUserSelector;
