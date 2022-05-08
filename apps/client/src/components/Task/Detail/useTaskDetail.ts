import { useAttachmentService } from '@talons/useAttachmentService';
import { useTaskService } from '@talons/useTaskService';
import { uploadFiles } from '@utils/imageUploader';
import { useCallback, useEffect, useState } from 'react';
import { removeMaliciousTags } from '@utils/helper';

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
          updateType: 'UPDATE_BOARD',
          data: {
            boardId: newBoardId,
          },
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
          updateType: 'UPDATE_ASSIGNEE',
          data: {
            assigneeUserId: newAssigneeUserId,
          },
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
        updateType: 'UPDATE_DESCRIPTION',
        data: {
          description,
        },
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
          updateType: 'UPDATE_PRIORITY',
          data: {
            priority: newPriority,
          },
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
          updateType: 'UPDATE_TYPE',
          data: {
            type: newType,
          },
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
          updateType: 'UPDATE_NAME',
          data: {
            name: newName,
          },
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
          updateType: 'UPDATE_SUMMARY',
          data: {
            summary: newSummary,
          },
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

  const onChangeCoverPhoto = useCallback(
    async (newCoverPhotoUrl: string) => {
      const normalizedCoverPhotoUrl = removeMaliciousTags(newCoverPhotoUrl);
      if (
        normalizedCoverPhotoUrl?.length > 0 &&
        normalizedCoverPhotoUrl?.startsWith('http')
      ) {
        updateTask(task.id, {
          updateType: 'UPDATE_COVER_PHOTO',
          data: {
            coverPhoto: normalizedCoverPhotoUrl,
          },
        });
      }
    },
    [task?.id, updateTask],
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
    onChangeCoverPhoto,
    onChangeDescription,
    onClickDescriptionButton,
  };
};
