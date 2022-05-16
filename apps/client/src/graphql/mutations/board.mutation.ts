import { gql } from '@apollo/client';

export const CREATE_NEW_BOARD = gql`
  mutation createNewBoard($name: String!, $projectId: Int!) {
    createBoard(createBoardInput: { name: $name, projectId: $projectId }) {
      id
      name
      projectId
    }
  }
`;
