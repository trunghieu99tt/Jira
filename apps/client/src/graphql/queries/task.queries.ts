import { gql } from '@apollo/client';

export const GET_TASK_BY_ID = gql`
  query getTaskById($taskId: Int!) {
    task(id: $taskId) {
      id
      coverPhoto
      name
      description
      summary
      priority
      type
      projectId
      boardId
      assignee {
        userId
        name
        avatar
      }
      reporter {
        userId
        name
        avatar
      }
      attachments {
        id
        name
        url
        taskId
        type
        fileId
      }
    }
  }
`;
