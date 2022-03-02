import { gql } from '@apollo/client';

export const GET_PROJECT_USERS = gql`
  query getProjectUsers($projectId: Int!, $offset: Int, $limit: Int) {
    getProjectUsers(projectId: $projectId, offset: $offset, limit: $limit) {
      id
    }
  }
`;
