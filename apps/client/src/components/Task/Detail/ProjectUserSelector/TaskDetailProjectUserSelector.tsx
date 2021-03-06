import { useEffect, useState } from 'react';

// components
import Select from '@components/shared/Select';
import { useProjectService } from '@talons/useProjectService';

// types
import { IProjectUser } from '@type/project.type';

// styles
import UserOption from '@components/shared/UserOption';

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
  const [projectUsers, setProjectUsers] = useState<IProjectUser[]>([]);

  const { getCachedProjectUsers } = useProjectService();

  useEffect(() => {
    const cachedProjectUsers = getCachedProjectUsers(projectId);
    if (cachedProjectUsers) {
      setProjectUsers(cachedProjectUsers);
    }
  }, [projectId]);

  if (!projectUsers) {
    return null;
  }

  const renderProjectUserOption = ({ value }: any) => {
    const projectUser = projectUsers.find((u) => u.userId === value);

    return (
      <UserOption
        data={{
          name: projectUser?.name || '',
          avatar: projectUser?.avatar || '',
        }}
      />
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
