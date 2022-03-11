import { useTaskService } from '@talons/useTasks';
import { useEffect, useState } from 'react';

export const useTaskDetail = (taskId: number) => {
  const {
    getTaskDetailResponse: { data, loading, error },

    updateTask,
    fetchTaskDetail,
  } = useTaskService();

  useEffect(() => {
    if (taskId) {
      fetchTaskDetail(taskId);
    }
  }, [taskId]);

  const [isEditingDescription, setIsEditingDescription] =
    useState<boolean>(false);

  const onClickDescriptionButton = () => {
    if (!isEditingDescription) {
      setIsEditingDescription(true);
    } else {
      // update task
      setIsEditingDescription(false);
    }
  };

  const onChangeBoard = (newBoardIdStr: string) => {
    // update board
    const newBoardId = parseInt(newBoardIdStr, 10);
    if (task?.boardId && newBoardId !== task?.boardId) {
      updateTask(
        task.id,
        {
          newBoardId,
          updateType: 'UPDATE_BOARD',
        },
        [newBoardId, task.boardId],
      );
    }
  };

  const task = data?.task;

  return {
    loading,
    error,
    data: task,
    isEditingDescription,

    onChangeBoard,
    onClickDescriptionButton,
  };
};
