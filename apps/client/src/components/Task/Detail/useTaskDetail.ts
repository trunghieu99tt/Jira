import { useAttachmentService } from '@talons/useAttachmentService';
import { useTaskService } from '@talons/useTaskService';
import { uploadFiles } from '@utils/imageUploader';
import { useCallback, useEffect, useState } from 'react';

export const useTaskDetail = (taskId: number) => {
  const [description, setDescription] = useState<string>('');

  const {
    getTaskDetailResponse: { data, loading, error },

    updateTask,
    getTaskDetail,
  } = useTaskService();
  const { createTaskAttachments } = useAttachmentService();

  const task = data?.task;

  useEffect(() => {
    if (taskId) {
      getTaskDetail(taskId);
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
        updateTask(task.id, {
          newBoardId,
          updateType: 'UPDATE_BOARD',
        });
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
        updateTask(task.id, {
          assigneeUserId: newAssigneeUserId,
          updateType: 'UPDATE_ASSIGNEE',
        });
      }
    },
    [task?.assigneeUserId, task?.id, updateTask],
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
      updateTask(task.id, {
        description,
        updateType: 'UPDATE_DESCRIPTION',
      });
    }
  };

  const onChangePriority = useCallback(
    (newPriority: string | number) => {
      if (typeof newPriority === 'string') {
        newPriority = parseInt(newPriority);
      }

      if (task?.priority !== newPriority) {
        updateTask(task.id, {
          priority: newPriority,
          updateType: 'UPDATE_PRIORITY',
        });
      }
    },
    [task?.id, task?.priority, updateTask],
  );

  const onChangeType = useCallback(
    (newType: string | number) => {
      if (typeof newType !== 'string') {
        newType = newType.toString();
      }
      if (task?.type !== newType) {
        updateTask(task.id, {
          type: newType,
          updateType: 'UPDATE_TYPE',
        });
      }
    },
    [task?.id, task?.type, updateTask],
  );

  const onChangeName = useCallback(
    (newName: string | number) => {
      if (typeof newName !== 'string') {
        newName = newName.toString();
      }
      if (task?.name !== newName) {
        updateTask(task.id, {
          name: newName,
          updateType: 'UPDATE_NAME',
        });
      }
    },
    [task?.id, task?.name, updateTask],
  );

  const onChangeSummary = useCallback(
    (newSummary: string | number) => {
      if (typeof newSummary !== 'string') {
        newSummary = newSummary.toString();
      }
      if (task?.summary !== newSummary) {
        updateTask(task.id, {
          summary: newSummary,
          updateType: 'UPDATE_SUMMARY',
        });
      }
    },
    [task?.id, task?.summary, updateTask],
  );

  const onAddAttachments = useCallback(
    async (files: File[]) => {
      const newFileIds = await uploadFiles(files);
      createTaskAttachments(task.id, newFileIds);
    },
    [createTaskAttachments, task?.id],
  );

  return {
    error,
    loading,
    data: task,
    description,
    isEditingDescription,

    onChangeName,
    onChangeType,
    onChangeBoard,
    setDescription,
    onChangeSummary,
    onChangePriority,
    onChangeAssignee,
    onAddAttachments,
    updateDescription,
    onChangeDescription,
    onClickDescriptionButton,
  };
};
