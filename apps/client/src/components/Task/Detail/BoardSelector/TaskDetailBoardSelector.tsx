import Select from '@components/shared/Select';
import { IBoard } from '@type/board.type';
import { useRecoilValue } from 'recoil';
import { selectProjectBoardsByProjectId } from 'recoil/project.recoil';

type Props = {
  projectId: number;
  defaultValue: number;
  onChange: (newBoardId: string) => void;
};

const TaskDetailBoardSelector = ({
  projectId,
  defaultValue,
  onChange,
}: Props) => {
  const boards = useRecoilValue(selectProjectBoardsByProjectId(`${projectId}`));

  if (!boards) {
    return null;
  }

  const renderBoardOption = ({ value }: any) => {
    const board = boards.find((board) => board.id === value);
    return (
      <div>
        <span>{board?.name}</span>
      </div>
    );
  };

  return (
    <Select
      value={defaultValue}
      options={boards.map((board: IBoard) => ({
        value: board.id,
        label: board.name,
      }))}
      onChange={onChange}
      defaultValue={defaultValue}
      renderOption={renderBoardOption}
      renderValue={renderBoardOption}
    />
  );
};

export default TaskDetailBoardSelector;
