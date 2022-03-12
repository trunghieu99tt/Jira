import { useTaskService } from '@talons/useTaskService';
import { useCallback, useEffect, useState } from 'react';

export const useTaskDetail = (taskId: number) => {
  const [description, setDescription] = useState<string>('');

  const {
    getTaskDetailResponse: { data, loading, error },

    updateTask,
    fetchTaskDetail,
  } = useTaskService();

  const task = data?.task;

  useEffect(() => {
    if (taskId) {
      fetchTaskDetail(taskId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId]);

  useEffect(() => {
    if (task?.description) {
      setDescription(task.description);
    }
  }, [task]);

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

  const onChangeBoard = useCallback(
    (newBoardId: string | number) => {
      // update board
      if (typeof newBoardId === 'string') {
        newBoardId = parseInt(newBoardId);
      }
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
    },
    [task?.boardId, task?.id, updateTask],
  );

  const onChangeAssignee = useCallback(
    (newAssigneeUserId: string | number) => {
      // update assignee
      if (typeof newAssigneeUserId === 'string') {
        newAssigneeUserId = parseInt(newAssigneeUserId);
      }

      if (task?.assigneeUserId !== newAssigneeUserId) {
        updateTask(
          task.id,
          {
            assigneeUserId: newAssigneeUserId,
            updateType: 'UPDATE_ASSIGNEE',
          },
          [task.boardId],
        );
      }
    },
    [task?.assigneeUserId, task?.boardId, task?.id, updateTask],
  );

  const onChangeDescription = (newDescription: string) => {
    // remove malicious code
    if (newDescription.includes('<script>')) {
      newDescription = newDescription.replace(/<script>/g, '');
    }
    setDescription(newDescription);
  };

  const updateDescription = () => {
    if (task?.description !== description) {
      updateTask(
        task.id,
        {
          description,
          updateType: 'UPDATE_DESCRIPTION',
        },
        [task.boardId],
      );
    }
  };

  const onChangePriority = useCallback(
    (newPriority: string | number) => {
      if (typeof newPriority === 'string') {
        newPriority = parseInt(newPriority);
      }

      if (task?.priority !== newPriority) {
        updateTask(
          task.id,
          {
            priority: newPriority,
            updateType: 'UPDATE_PRIORITY',
          },
          [],
        );
      }
    },
    [task?.id, task?.priority, updateTask],
  );

  return {
    error,
    loading,
    data: task,
    description,
    isEditingDescription,

    onChangeBoard,
    setDescription,
    onChangePriority,
    onChangeAssignee,
    updateDescription,
    onChangeDescription,
    onClickDescriptionButton,
  };
};
