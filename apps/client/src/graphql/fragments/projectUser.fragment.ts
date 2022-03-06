import { gql } from '@apollo/client';

export const PROJECT_USER_FRAGMENT = gql`
  fragment projectUserFragment on ProjectUserOutput {
    id
    userId
    name
    role
    avatar
  }
`;
