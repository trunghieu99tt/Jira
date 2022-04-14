import { gql } from '@apollo/client';

export const SEARCH_USERS = gql`
  query searchUsers($search: String!) {
    searchUsers(search: $search) {
      id
      name
      avatar
    }
  }
`;
