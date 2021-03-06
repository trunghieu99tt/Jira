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
    $summary: String
    $attachmentFileIds: String
    $type: String!
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
        summary: $summary
        type: $type
      }
    ) {
      id
      name
      description
      summary
      priority
      type
    }
  }
`;

export const UPDATE_TASK_MUTATION = gql`
  mutation updateTask(
    $id: Int!
    $updateType: String!
    $boardId: Int
    $listPosition: Float
    $assigneeUserId: Int
    $description: String
    $priority: Int
    $type: String
    $name: String
    $summary: String
    $coverPhoto: String
  ) {
    updateTask(
      updateTaskInput: {
        id: $id
        updateType: $updateType
        boardId: $boardId
        listPosition: $listPosition
        assigneeUserId: $assigneeUserId
        description: $description
        priority: $priority
        type: $type
        name: $name
        summary: $summary
        coverPhoto: $coverPhoto
      }
    ) {
      id
      name
      boardId
      listPosition
    }
  }
`;
