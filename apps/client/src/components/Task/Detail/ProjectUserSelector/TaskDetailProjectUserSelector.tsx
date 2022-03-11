import Select from '@components/shared/Select';
import { IProjectUser } from '@type/project.type';
import { useRecoilValue } from 'recoil';
import { selectProjectUsersByProjectId } from 'recoil/project.recoil';

type Props = {
  projectId: number;
  defaultValue: number;
  onChange: (newProjectUserId: string) => void;
};

const TaskDetailProjectUserSelector = ({
  projectId,
  defaultValue,
  onChange,
}: Props) => {
  const projectUsers = useRecoilValue(selectProjectUsersByProjectId(projectId));

  if (!projectUsers) {
    return null;
  }

  const renderProjectUserOption = ({ value }: any) => {
    const projectUser = projectUsers.find((u) => u.id === value);
    return (
      <div>
        <span>{projectUser?.name}</span>
      </div>
    );
  };

  return (
    <Select
      value={defaultValue}
      options={projectUsers.map((projectUser: IProjectUser) => ({
        value: projectUser.id,
        label: projectUser.name,
      }))}
      onChange={onChange}
      defaultValue={defaultValue}
      renderOption={renderProjectUserOption}
      renderValue={renderProjectUserOption}
    />
  );
};

export default TaskDetailProjectUserSelector;
