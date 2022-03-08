import { useQuery } from '@apollo/client';
import { GET_PROJECT_BY_ID } from 'graphql/queries/project.queries';
import { useEffect } from 'react';
import { DraggableLocation, DropResult } from 'react-beautiful-dnd';
import { useParams } from 'react-router';
import { useSetRecoilState } from 'recoil';
import { projectsBoardsState, projectsUsersState } from 'recoil/project.recoil';

export const useProjectPage = () => {
  const { projectId } = useParams();
  const setProjectsUsers = useSetRecoilState(projectsUsersState);
  const setProjectsBoards = useSetRecoilState(projectsBoardsState);

  const { loading, data, error } = useQuery(GET_PROJECT_BY_ID, {
    variables: {
      id: parseInt(projectId || '1', 10),
    },
  });

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

  const onDropEnd = ({ destination, source, draggableId }: DropResult) => {
    console.log('data', data);
    console.log('destination', destination);
    console.log('source', source);

    if (!isPositionChanged(destination, source) || !destination) return;

    const { index, droppableId } = destination || {};
    const { index: sourceIndex, droppableId: sourceDroppableId } = source || {};

    const sourceBoardId = parseInt(sourceDroppableId, 10);
    const destinationBoardId = parseInt(droppableId, 10);

    const taskId = draggableId && parseInt(draggableId, 10);

    console.log('sourceBoardId', sourceBoardId);
    console.log('destinationBoardId', destinationBoardId);
    console.log('taskId', taskId);

    // const issueId = Number(draggableId);

    // api.optimisticUpdate(`/issues/${issueId}`, {
    //   updatedFields: {
    //     status: destination.droppableId,
    //     listPosition: calculateIssueListPosition(
    //       project.issues,
    //       destination,
    //       source,
    //       issueId,
    //     ),
    //   },
    //   currentFields: project.issues.find(({ id }) => id === issueId),
    //   setLocalData: (fields) => updateLocalProjectIssues(issueId, fields),
    // });
  };

  console.log('boards', project);
  console.log('loading', loading);

  return {
    loading,
    data: project,
    error,
    onDropEnd,
  };
};
