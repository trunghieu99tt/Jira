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
    $newBoardId: Int
    $listPosition: Int
  ) {
    updateTask(
      updateTaskInput: {
        id: $id
        updateType: $updateType
        newBoardId: $newBoardId
        listPosition: $listPosition
      }
    ) {
      id
      name
      boardId
      listPosition
    }
  }
`;
