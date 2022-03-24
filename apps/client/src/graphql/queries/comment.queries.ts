import { gql } from '@apollo/client';

export const GET_TASK_COMMENTS = gql`
  query getTaskComments($taskId: Int!) {
    comments(taskId: $taskId) {
      id
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
