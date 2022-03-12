import { gql } from '@apollo/client';

export const ADD_COMMENT = gql`
  mutation createComment($taskId: Int!, $content: String!) {
    createComment(taskId: $taskId, content: $content) {
      id
      taskId
      content
    }
  }
`;
