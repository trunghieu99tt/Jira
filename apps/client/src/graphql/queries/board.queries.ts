import { gql } from '@apollo/client';

export const GET_BOARD_BY_ID = gql`
  query getBoardById($boardId: Int!) {
    board(boardId: $boardId) {
      id
      name
      tasks {
        id
        name
        priority
        type
        assigneeAvatar
        assigneeName
        listPosition
        updatedAt
        numberOfComments
        numberOfAttachments
      }
    }
  }
`;
