import { useQuery } from '@apollo/client';
import { GET_PROJECT_BY_ID } from 'graphql/queries/project.queries';
import { useEffect } from 'react';
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

  console.log('boards', project);
  console.log('loading', loading);

  return {
    loading,
    data: project,
    error,
  };
};
