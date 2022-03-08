import { gql } from '@apollo/client';

export const PROJECT_USER_FRAGMENT = gql`
  fragment projectUserFragment on ProjectUserOutput {
    id
    name
    userId
    role
    avatar
  }
`;
