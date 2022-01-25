import { gql } from '@apollo/client';

export const GET_BOARD_BY_ID = gql`
  query getBoardById($id: Int!) {
    board(id: $id) {
      id
      name
      coverPhoto
      createdAt
      updatedAt
    }
  }
`;
