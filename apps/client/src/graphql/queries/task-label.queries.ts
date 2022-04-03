import { gql } from '@apollo/client';

export const GET_TASK_LABELS = gql`
  query getLabel($taskId: Int!) {
    taskLabels(taskId: $taskId) {
      labelId
      name
      color
    }
  }
`;
