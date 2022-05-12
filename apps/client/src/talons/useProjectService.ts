import { useApolloClient, useMutation } from '@apollo/client';
import { IBoard } from '@type/board.type';
import {
  IProject,
  ICreateProjectInput,
  IProjectUser,
  IUpdateProjectInput,
} from '@type/project.type';
import {
  CREATE_PROJECT_MUTATION,
  UPDATE_PROJECT_MUTATION,
} from 'graphql/mutations/project.mutation';
import { GET_PROJECT_BY_ID } from 'graphql/queries/project.queries';
import { useCallback } from 'react';

export const useProjectService = () => {
  const client = useApolloClient();

  const [createProjectMutation, createProjectResponse] = useMutation(
    CREATE_PROJECT_MUTATION,
  );
  const [updateProjectMutation] = useMutation(UPDATE_PROJECT_MUTATION);

  /**
   * GET
   */
  const getCachedProject = (projectId: number): IProject => {
    const cachedProjectData: {
      project: IProject;
    } | null = client.cache.readQuery({
      query: GET_PROJECT_BY_ID,
      variables: {
        id: projectId,
      },
    });
    return cachedProjectData?.project || ({} as IProject);
  };

  const getCachedProjectBoards = (projectId: number): IBoard[] => {
    const cachedProject = getCachedProject(projectId);
    return cachedProject?.boards || [];
  };

  const getCachedProjectUsers = (projectId: number): IProjectUser[] => {
    const cachedProject = getCachedProject(projectId);
    return cachedProject?.projectUsers || [];
  };

  const createProject = useCallback(
    (input: ICreateProjectInput) => {
      createProjectMutation({
        variables: input,
      });
    },
    [createProjectMutation],
  );

  const updateProject = useCallback(
    (input: IUpdateProjectInput, onCompleted?: Function) => {
      updateProjectMutation({
        variables: input,
        onCompleted: () => {
          if (onCompleted && typeof onCompleted === 'function') {
            onCompleted();
          }
        },
      });
    },
    [],
  );

  return {
    createProjectResponse,

    createProject,
    updateProject,
    getCachedProjectUsers,
    getCachedProjectBoards,
  };
};
