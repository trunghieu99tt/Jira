import { gql } from '@apollo/client';

export const CREATE_BOARD_MUTATION = gql`
  mutation createBoard(
    $name: String!
    $privacy: Int!
    $ownerId: Int!
    $coverPhoto: String
    $description: String
  ) {
    createBoard(
      createBoardInput: {
        name: $name
        privacy: $privacy
        ownerId: $ownerId
        coverPhoto: $coverPhoto
        description: $description
      }
    ) {
      id
    }
  }
`;
