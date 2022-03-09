import { gql } from '@apollo/client';

export const CREATE_PROJECT_MUTATION = gql`
  mutation createProject(
    $name: String!
    $coverPhotoFileId: Int
    $privacy: Int!
    $description: String
    $ownerUserId: Int!
  ) {
    createProject(
      createProjectInput: {
        name: $name
        privacy: $privacy
        ownerUserId: $ownerUserId
        coverPhotoFileId: $coverPhotoFileId
        description: $description
      }
    ) {
      id
    }
  }
`;
