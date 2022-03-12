import { useLazyQuery } from '@apollo/client';
import { GET_PROJECT_USERS } from 'graphql/queries/project-users.queries';

export const useProjectUserService = () => {
  const [getProjectUsers, { loading, data, error }] =
    useLazyQuery(GET_PROJECT_USERS);

  return {
    data,
    loading,
    error,

    getProjectUsers,
  };
};
