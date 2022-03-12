import { useLazyQuery } from '@apollo/client';
import { GET_PROJECT_LIST } from 'graphql/queries/project.queries';

export const useProjectService = () => {
  const [getProjectList, getProjectListResponse] =
    useLazyQuery(GET_PROJECT_LIST);

  return {
    getProjectListResponse,

    getProjectList,
  };
};
