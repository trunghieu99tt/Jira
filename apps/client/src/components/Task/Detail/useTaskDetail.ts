import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_TASK_MUTATION } from 'graphql/mutations/task.mutation';
import { GET_TASK_BY_ID } from 'graphql/queries/task.queries';
import { useState } from 'react';

export const useTaskDetail = (taskId: number) => {
  const { loading, data, error, refetch } = useQuery(GET_TASK_BY_ID, {
    variables: {
      taskId,
    },
  });
  const task = data?.task;

  const [updateTaskFunction] = useMutation(UPDATE_TASK_MUTATION);

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
    console.log('newBoardId', newBoardId);
    if (task?.boardId && newBoardId !== task?.boardId) {
      updateTaskFunction({
        variables: {
          id: task.id,
          updateType: 'UPDATE_BOARD',
          newBoardId,
        },
        onCompleted: () => {
          refetch();
        },
      });
    }
  };

  return {
    loading,
    error,
    data: task,
    isEditingDescription,

    onChangeBoard,
    onClickDescriptionButton,
  };
};
