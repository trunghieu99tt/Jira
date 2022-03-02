import { useLazyQuery } from '@apollo/client';
import { GET_PROJECT_USERS } from 'graphql/queries/project-users.queries';

export const useBoardUsers = () => {
  const [getBoardUsers, { loading, data, error }] =
    useLazyQuery(GET_PROJECT_USERS);

  return {
    getBoardUsers,
    loading,
    data,
    error,
  };
};
