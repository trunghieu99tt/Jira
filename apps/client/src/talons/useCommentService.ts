import { useApolloClient, useMutation } from '@apollo/client';
import { ADD_COMMENT } from 'graphql/mutations/comment.mutation';
import { GET_TASK_COMMENTS } from 'graphql/queries/comment.queries';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { commentsState } from 'recoil/comment.recoil';

export const useCommentService = () => {
  const client = useApolloClient();
  const [addCommentMutation] = useMutation(ADD_COMMENT);

  const setComments = useSetRecoilState(commentsState);

  const fetchTaskComments = useCallback(
    async ({ taskId }: { taskId: number }) => {
      try {
        const response = await client.query({
          query: GET_TASK_COMMENTS,
          variables: { taskId },
        });

        if (response?.data?.comments) {
          setComments((prev) => ({
            ...prev,
            [taskId]: response.data.comments,
          }));
        }
      } catch (error) {
        console.error(`[useCommentService] fetchTaskComments error: ${error}`);
      }
    },
    [client, setComments],
  );

  const addComment = useCallback(
    async ({ taskId, content }: { taskId: number; content: string }) => {
      await addCommentMutation({
        variables: {
          taskId,
          content,
        },
        onCompleted: (data) => {
          if (data?.createComment) {
            setComments((prev) => ({
              ...prev,
              [taskId]: [...(prev[taskId] || []), data.createComment],
            }));
          }
        },
      });
    },
    [addCommentMutation, setComments],
  );

  return {
    addComment,
    fetchTaskComments,
  };
};
