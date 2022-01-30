import { useLazyQuery } from '@apollo/client';
import { GET_BOARD_USERS } from 'queries/board-user.queries';

export const useBoardUsers = () => {
  const [getBoardUsers, { loading, data, error }] =
    useLazyQuery(GET_BOARD_USERS);

  return {
    getBoardUsers,
    loading,
    data,
    error,
  };
};
