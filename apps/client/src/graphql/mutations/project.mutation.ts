import { gql } from '@apollo/client';

export const CREATE_BOARD_MUTATION = gql`
  mutation createProject(
    $name: String!
    $coverPhoto: String
    $privacy: Int!
    $description: String
    $ownerId: Int!
  ) {
    createProject(
      createProjectInput: {
        name: $name
        privacy: $privacy
        ownerId: $ownerId
        coverPhoto: $coverPhoto
        description: $description
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
