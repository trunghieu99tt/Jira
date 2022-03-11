import { useMutation } from '@apollo/client';
import { UPDATE_TYPE } from '@constants/task';
import { UPDATE_TASK_MUTATION } from 'graphql/mutations/task.mutation';
import { useRecoilState } from 'recoil';
import { boardsState } from 'recoil/board.recoil';

export const useTasks = () => {
  const [updateTaskFunction] = useMutation(UPDATE_TASK_MUTATION);
  const [boards, setBoards] = useRecoilState(boardsState);

  const updateLocalBoards = ({
    task,
    updateType,
    data,
  }: {
    task: any;
    updateType: string;
    data: any;
  }) => {
    switch (updateType) {
      case UPDATE_TYPE.UPDATE_BOARD: {
        const { oldBoardId, newBoardId } = data;
        let sourceBoard = boards[oldBoardId];
        let targetBoard = boards[newBoardId];

        if (sourceBoard && targetBoard) {
          sourceBoard = {
            ...sourceBoard,
            tasks:
              sourceBoard?.tasks?.filter((task) => task.id !== taskId) || [],
          };
          targetBoard = {
            ...targetBoard,
            tasks: [...(targetBoard?.tasks || [])],
          };
        }
      }
    }
  };

  return {
    updateTaskFunction,
  };
};
