import { useQuery } from '@apollo/client';
import { useTasks } from '@talons/useTasks';
import { insertItemIntoArray, moveItemWithinArray } from '@utils/helper';
import { GET_PROJECT_BY_ID } from 'graphql/queries/project.queries';
import { useEffect } from 'react';
import { DraggableLocation, DropResult } from 'react-beautiful-dnd';
import { useParams } from 'react-router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { boardsState } from 'recoil/board.recoil';
import { projectsBoardsState, projectsUsersState } from 'recoil/project.recoil';

export const useProjectPage = () => {
  const { projectId } = useParams();
  const setProjectsUsers = useSetRecoilState(projectsUsersState);
  const setProjectsBoards = useSetRecoilState(projectsBoardsState);
  const [boards, setBoards] = useRecoilState(boardsState);

  const { loading, data, error } = useQuery(GET_PROJECT_BY_ID, {
    variables: {
      id: parseInt(projectId || '1', 10),
    },
  });

  const { updateTaskFunction } = useTasks();

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
    }
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

    updateTaskFunction({
      variables: {
        id: droppedTaskId,
        updateType: 'MOVE_TASK',
        newBoardId: destinationBoardId,
        listPosition: newListPosition,
      },
      onCompleted: (data) => {
        console.log('data', data.updateTask);
        if (data?.updateTask) {
          const { id, boardId } = data.updateTask;

          // remove task from old board
          const oldBoardIdStr = Object.keys(boards).find((boardId: string) => {
            const board = boards[+boardId];
            return board?.tasks?.find((task) => task.id === id);
          });

          if (oldBoardIdStr) {
            setBoards((prevBoards) => {
              const oldBoardId = parseInt(oldBoardIdStr);
              if (oldBoardId !== boardId) {
                const oldBoard = prevBoards[oldBoardId];
                const newBoard = boards[boardId];

                const updatedOldBoard = {
                  ...oldBoard,
                  tasks:
                    oldBoard?.tasks
                      ?.filter((task) => task.id !== id)
                      .sort((a, b) => a.listPosition - b.listPosition) || [],
                };
                const updatedNewBoard = {
                  ...newBoard,
                  tasks: [...(newBoard?.tasks || []), data.updateTask],
                };

                return {
                  ...prevBoards,
                  [oldBoardId]: updatedOldBoard,
                  [boardId]: updatedNewBoard,
                };
              } else {
                const newBoard = boards[boardId];
                const updatedNewBoard = {
                  ...newBoard,
                  tasks: [...(newBoard?.tasks || []), data.updateTask].sort(
                    (a, b) => a.listPosition - b.listPosition,
                  ),
                };

                return {
                  ...prevBoards,
                  [boardId]: updatedNewBoard,
                };
              }
            });
          }
        }
      },
    });
  };

  return {
    loading,
    data: project,
    error,
    onDropEnd,
  };
};
