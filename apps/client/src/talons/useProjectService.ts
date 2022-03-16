import { useMutation, useQuery } from '@apollo/client';
import { IProjectCreateInput } from '@type/project.type';
import { CREATE_PROJECT_MUTATION } from 'graphql/mutations/project.mutation';
import { GET_PROJECT_LIST } from 'graphql/queries/project.queries';
import { useCallback } from 'react';

export const useProjectService = () => {
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

  return {
    getProjectListResponse: getProjectListQueryResponse,
    createProjectResponse,

    createProject,
  };
};
