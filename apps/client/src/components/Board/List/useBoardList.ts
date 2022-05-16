import { useBoardService } from '@talons/useBoardService';
import { useQueryParamModal } from '@talons/useQueryParamModal';
import { useTaskService } from '@talons/useTaskService';
import { insertItemIntoArray, moveItemWithinArray } from '@utils/helper';
import { useState } from 'react';
import { DraggableLocation, DropResult } from 'react-beautiful-dnd';

export const useBoardList = () => {
  const { getCachedBoard } = useBoardService();
  const { optimisticUpdateBoardTask } = useTaskService();

  const {
    open: openBoardFormModal,
    close: closeBoardFormModal,
    isOpen: isBoardFormModalOpened,
  } = useQueryParamModal(`create-board`);

  const isPositionChanged = (
    destination: DraggableLocation | undefined,
    source: DraggableLocation,
  ) => {
    if (!destination) return false;
    const isSameList = destination.droppableId === source.droppableId;
    const isSamePosition = destination.index === source.index;
    return !isSameList || !isSamePosition;
  };

  const getAfterDropPrevNextIssue = (
    sourceBoardId: number,
    destinationBoardId: number,
    droppedTaskId: number,
    destinationIndex: number,
  ) => {
    const cachedDestinationBoard = getCachedBoard(destinationBoardId);
    if (!cachedDestinationBoard) {
      return {
        prevTask: null,
        nextTask: null,
      };
    }
    const initialTasksOfDestinationBoard = cachedDestinationBoard?.tasks || [];
    const isSameBoard = sourceBoardId === destinationBoardId;

    const cachedSourceBoard = getCachedBoard(sourceBoardId);
    const droppedTask = cachedSourceBoard?.tasks?.find(
      (task: any) => task.id === droppedTaskId,
    );

    const afterDropDestinationTaskList = isSameBoard
      ? moveItemWithinArray(
          initialTasksOfDestinationBoard,
          droppedTask,
          destinationIndex,
        )
      : insertItemIntoArray(
          initialTasksOfDestinationBoard,
          droppedTask,
          destinationIndex,
        );

    return {
      prevTask: afterDropDestinationTaskList?.[destinationIndex - 1],
      nextTask: afterDropDestinationTaskList?.[destinationIndex + 1],
    };
  };

  const calculateIssueListPosition = (
    sourceBoardId: number,
    destinationBoardId: number,
    droppedTaskId: number,
    destinationIndex: number,
  ) => {
    try {
      const { prevTask, nextTask } = getAfterDropPrevNextIssue(
        sourceBoardId,
        destinationBoardId,
        droppedTaskId,
        destinationIndex,
      );
      let position;

      if (!prevTask && !nextTask) {
        position = 0;
      } else if (!prevTask) {
        position = nextTask.listPosition - 1;
      } else if (!nextTask) {
        position = prevTask.listPosition + 1;
      } else {
        position =
          prevTask.listPosition +
          (nextTask.listPosition - prevTask.listPosition) / 2;
      }
      return position;
    } catch (error) {
      console.error('[calculateIssueListPosition] error', error);
      return 0;
    }
  };

  const onDropEnd = async ({
    destination,
    source,
    draggableId,
  }: DropResult) => {
    if (!isPositionChanged(destination, source) || !destination) return;

    const { index, droppableId } = destination || {};
    const { droppableId: sourceDroppableId } = source || {};

    const sourceBoardId = parseInt(sourceDroppableId, 10);
    const destinationBoardId = parseInt(droppableId, 10);
    const droppedTaskId = (draggableId && parseInt(draggableId, 10)) || 0;

    const newListPosition = calculateIssueListPosition(
      sourceBoardId,
      destinationBoardId,
      droppedTaskId,
      index,
    );

    optimisticUpdateBoardTask(droppedTaskId, {
      updateType: 'MOVE_TASK',
      sourceBoardId,
      destinationBoardId,
      data: {
        listPosition: newListPosition,
        boardId: destinationBoardId,
      },
    });
  };

  return {
    onDropEnd,
    openBoardFormModal,
    closeBoardFormModal,
    isBoardFormModalOpened,
  };
};
