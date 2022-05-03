import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { GET_LABELS } from '../graphql/queries/label.queries';
import { CREATE_LABEL } from '../graphql/mutations/label.mutation';
import { iLabel } from '@type/label.types';

export const useLabelService = () => {
  const client = useApolloClient();
  const getLabelsQuery = useQuery(GET_LABELS);
  const [createLabelMutation, createLabelMutationResponse] =
    useMutation(CREATE_LABEL);

  const getLabels = () => {
    const cachedData: {
      labels: iLabel[];
    } | null = client.cache.readQuery({
      query: GET_LABELS,
    });

    return cachedData?.labels || [];
  };

  const createLabel = (input: { name: string; color: string }) => {
    createLabelMutation({
      variables: {
        name: input.name,
        color: input.color,
      },
      onCompleted: () => {
        getLabelsQuery.refetch();
      },
    });
  };

  return {
    labels: getLabels(),
    getLabels,
    createLabel,
  };
};
