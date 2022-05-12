import { gql } from '@apollo/client';

export const CREATE_PROJECT_MUTATION = gql`
  mutation createProject(
    $name: String!
    $coverPhotoFileId: Int
    $privacy: Int!
    $description: String
    $ownerUserId: Int!
    $projectUserIds: [Int!]
  ) {
    createProject(
      createProjectInput: {
        name: $name
        privacy: $privacy
        ownerUserId: $ownerUserId
        coverPhotoFileId: $coverPhotoFileId
        description: $description
        projectUserIds: $projectUserIds
      }
    ) {
      id
    }
  }
`;

export const UPDATE_PROJECT_MUTATION = gql`
  mutation updateProject($description: String, $id: Int!) {
    updateProject(updateProjectInput: { id: $id, description: $description }) {
      id
    }
  }
`;
