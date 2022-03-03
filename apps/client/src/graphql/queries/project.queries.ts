import { gql } from '@apollo/client';

export const GET_PROJECT_LIST = gql`
  query getAllProjects($offset: Int, $limit: Int) {
    projects(offset: $offset, limit: $limit) {
      id
      name
      coverPhoto
      userCount
      projectUsers {
        user {
          id
          name
          avatar
        }
      }
    }
  }
`;

export const GET_PROJECT_BY_ID = gql`
  query getProjectById($id: Int!) {
    project(id: $id) {
      id
      name
      coverPhoto
      createdAt
      updatedAt
      privacy
      boards {
        id
        name
      }
    }
  }
`;
