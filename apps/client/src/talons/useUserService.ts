import { useApolloClient } from '@apollo/client';
import { SEARCH_USERS } from '../graphql/queries/user.queries';

export const useUserService = () => {
  const client = useApolloClient();
  const searchUsers = async (search: string) => {
    const response = await client.query({
      query: SEARCH_USERS,
      variables: { search },
    });

    return response?.data?.searchUsers || [];
  };

  return {
    searchUsers,
  };
};
