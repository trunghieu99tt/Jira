import { gql } from '@apollo/client';

export const ADD_COMMENT = gql`
  mutation createComment($taskId: Int!, $content: String!, $userId: Int!) {
    createComment(
      createCommentInput: {
        taskId: $taskId
        content: $content
        userId: $userId
      }
    ) {
      id
      taskId
      content
      owner {
        id
        name
        avatar
      }
      updatedAt
    }
  }
`;
