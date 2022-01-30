import { gql } from '@apollo/client';

export const GET_BOARD_USERS = gql`
  query getBoardUsers($boardId: Int!, $offset: Int, $limit: Int) {
    getBoardUsers(boardId: $boardId, offset: $offset, limit: $limit) {
      id
    }
  }
`;
