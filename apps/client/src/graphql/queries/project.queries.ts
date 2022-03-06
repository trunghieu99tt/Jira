import { gql } from '@apollo/client';
import { PROJECT_USER_FRAGMENT } from 'graphql/fragments/projectUser.fragment';

export const GET_PROJECT_LIST = gql`
  query getAllProjects($offset: Int, $limit: Int) {
    projects(offset: $offset, limit: $limit) {
      id
      name
      coverPhotoUrl
      userCount
      projectUsers {
        ...projectUserFragment
      }
    }
  }
  ${PROJECT_USER_FRAGMENT}
`;

export const GET_PROJECT_BY_ID = gql`
  query getProjectById($id: Int!) {
    project(id: $id) {
      id
      name
      coverPhotoUrl
      createdAt
      updatedAt
      privacy
      boards {
        id
        name
      }
      projectUsers {
        ...projectUserFragment
      }
    }
  }
  ${PROJECT_USER_FRAGMENT}
`;
