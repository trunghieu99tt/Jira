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

export const GET_BOARDS = gql`
  query getAllBoards($offset: Int, $limit: Int) {
    boards(offset: $offset, limit: $limit) {
      id
      name
      coverPhoto
      userCount
      boardUsers {
        user {
          id
          name
          avatar
        }
      }
    }
  }
`;
