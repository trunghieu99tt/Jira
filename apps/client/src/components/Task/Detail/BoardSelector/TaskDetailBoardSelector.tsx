import { useRecoilValue } from 'recoil';

// components
import Select from '@components/shared/Select';

// global state
import { selectProjectBoardsByProjectId } from 'recoil/project.recoil';

// types
import { IBoard } from '@type/board.type';
import { useProjectService } from '@talons/useProjectService';
import { useEffect, useState } from 'react';

type Props = {
  projectId: number;
  defaultValue: number;
  onChange: (newBoardId: string | number) => void;
};

const TaskDetailBoardSelector = ({
  projectId,
  defaultValue,
  onChange,
}: Props) => {
  const [boards, setBoards] = useState<IBoard[]>([]);

  const { getCachedProjectBoards } = useProjectService();

  useEffect(() => {
    const cachedBoards = getCachedProjectBoards(projectId);
    if (cachedBoards) {
      setBoards(cachedBoards);
    }
  }, [projectId]);

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

  const boardOptions = boards
    ?.map((board: IBoard) => {
      if (board.id !== defaultValue) {
        return {
          value: board.id,
          label: board.name,
        };
      }

      return null;
    })
    .filter(Boolean);

  return (
    <Select
      value={defaultValue}
      options={boardOptions}
      onChange={onChange}
      defaultValue={defaultValue}
      renderOption={renderBoardOption}
      renderValue={renderBoardOption}
    />
  );
};

export default TaskDetailBoardSelector;
