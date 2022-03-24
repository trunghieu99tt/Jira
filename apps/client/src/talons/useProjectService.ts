import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { IBoard } from '@type/board.type';
import {
  IProject,
  IProjectCreateInput,
  IProjectUser,
} from '@type/project.type';
import { CREATE_PROJECT_MUTATION } from 'graphql/mutations/project.mutation';
import {
  GET_PROJECT_BY_ID,
  GET_PROJECT_LIST,
} from 'graphql/queries/project.queries';
import { useCallback } from 'react';

export const useProjectService = () => {
  const client = useApolloClient();

  const getProjectListQueryResponse = useQuery(GET_PROJECT_LIST);
  const [createProjectMutation, createProjectResponse] = useMutation(
    CREATE_PROJECT_MUTATION,
  );

  const createProject = useCallback(
    (input: IProjectCreateInput) => {
      createProjectMutation({
        variables: input,
        onCompleted: (data) => {
          if (data?.createProject) {
            getProjectListQueryResponse.refetch();
          }
        },
      });
    },
    [createProjectMutation, getProjectListQueryResponse],
  );

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
  return {
    getProjectListResponse: getProjectListQueryResponse,
    createProjectResponse,

    createProject,
    getCachedProjectUsers,
    getCachedProjectBoards,
  };
};
