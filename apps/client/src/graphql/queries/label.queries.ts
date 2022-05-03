import { gql } from '@apollo/client';

export const GET_LABELS = gql`
  query getLabels {
    labels {
      id
      name
      color
      createdAt
      updatedAt
    }
  }
`;
