import { gql } from '@apollo/client';

export const CREATE_LABEL = gql`
  mutation createLabel($name: String!, $color: String!) {
    createLabel(createLabelInput: { name: $name, color: $color }) {
      id
      name
      color
    }
  }
`;
