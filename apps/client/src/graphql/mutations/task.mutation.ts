import { gql } from '@apollo/client';

export const CREATE_TASK_MUTATION = gql`
  mutation createProject(
    $assigneeUserId: Int!
    $boardId: Int!
    $reporterUserId: Int!
    $projectId: Int!
    $name: String!
    $priority: Int!
    $description: String
    $attachmentFileIds: String
  ) {
    createTask(
      createTaskInput: {
        assigneeUserId: $assigneeUserId
        boardId: $boardId
        reporterUserId: $reporterUserId
        projectId: $projectId
        name: $name
        priority: $priority
        description: $description
        attachmentFileIds: $attachmentFileIds
      }
    ) {
      id
      owner {
        id
        name
      }
    }
  }
`;
