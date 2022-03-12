import { useQuery } from '@apollo/client';
import { useBoardService } from '@talons/useBoardService';
import { useTaskService } from '@talons/useTaskService';
import { insertItemIntoArray, moveItemWithinArray } from '@utils/helper';
import { GET_PROJECT_BY_ID } from 'graphql/queries/project.queries';
import { useEffect } from 'react';
import { DraggableLocation, DropResult } from 'react-beautiful-dnd';
import { useParams } from 'react-router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { boardsState } from 'recoil/board.recoil';
import { projectsBoardsState, projectsUsersState } from 'recoil/project.recoil';

export const useProjectPage = () => {
  const { projectId } = useParams();
  const setProjectsUsers = useSetRecoilState(projectsUsersState);
  const setProjectsBoards = useSetRecoilState(projectsBoardsState);
  const boards = useRecoilValue(boardsState);

  const { loading, data, error } = useQuery(GET_PROJECT_BY_ID, {
    variables: {
      id: parseInt(projectId || '1', 10),
    },
  });

  const { updateTask } = useTaskService();
  const { fetchMultiBoards } = useBoardService();

  const project = data?.project;
  const projectUsers = project?.projectUsers || [];

  useEffect(() => {
    if (projectId) {
      setProjectsUsers((prevValue) => ({
        ...prevValue,
        [projectId]: projectUsers,
      }));
      setProjectsBoards((prevValue) => ({
        ...prevValue,
        [projectId]: project?.boards || [],
      }));
      if (project?.boards) {
        console.log('project.boards', project.boards);
        const boardIds = project?.boards.map((board: any) => board.id);
        fetchMultiBoards(boardIds);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, projectUsers]);

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
    const initialTaskListOfDestinationBoard =
      boards[destinationBoardId]?.tasks || [];
    const isSameBoard = sourceBoardId === destinationBoardId;
    const droppedTask = boards[sourceBoardId]?.tasks?.find(
      (task) => task.id === droppedTaskId,
    );

    const afterDropDestinationTaskList = isSameBoard
      ? moveItemWithinArray(
          initialTaskListOfDestinationBoard,
          droppedTask,
          destinationIndex,
        )
      : insertItemIntoArray(
          initialTaskListOfDestinationBoard,
          droppedTask,
          destinationIndex,
        );

    return {
      prevTask: afterDropDestinationTaskList?.[destinationIndex - 1],
      nextTask: afterDropDestinationTaskList?.[destinationIndex],
    };
  };

  const calculateIssueListPosition = (
    sourceBoardId: number,
    destinationBoardId: number,
    droppedTaskId: number,
    destinationIndex: number,
  ) => {
    const { prevTask, nextTask } = getAfterDropPrevNextIssue(
      sourceBoardId,
      destinationBoardId,
      droppedTaskId,
      destinationIndex,
    );
    let position;

    if (!prevTask && !nextTask) {
      position = 1;
    } else if (!prevTask) {
      position = nextTask.listPosition - 1;
    } else if (!nextTask) {
      position = prevTask.listPosition + 1;
    } else {
      position =
        prevTask.listPosition +
        (nextTask.listPosition - prevTask.listPosition) / 2;
    }
    return position ? Math.max(1, position) : 1;
  };

  const onDropEnd = ({ destination, source, draggableId }: DropResult) => {
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

    updateTask(
      droppedTaskId,
      {
        listPosition: newListPosition,
        updateType: 'MOVE_TASK',
        newBoardId: destinationBoardId,
      },
      [sourceBoardId, destinationBoardId],
    );
  };

  return {
    loading,
    data: project,
    error,
    onDropEnd,
  };
};
