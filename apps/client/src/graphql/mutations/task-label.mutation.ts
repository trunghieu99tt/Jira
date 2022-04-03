import { gql } from '@apollo/client';

export const UPDATE_TASK_LABELS = gql`
  mutation updateTaskLabels($taskId: Int!, $labelId: Int!) {
    updateTaskLabels(
      updateTaskLabelsInput: { taskId: $taskId, labelId: $labelId }
    )
  }
`;
