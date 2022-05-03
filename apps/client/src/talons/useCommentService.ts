import { useApolloClient, useMutation } from '@apollo/client';
import { iComment } from '@type/comment.type';
import { ADD_COMMENT } from 'graphql/mutations/comment.mutation';
import { GET_TASK_COMMENTS } from 'graphql/queries/comment.queries';
import { useCallback } from 'react';

export const useCommentService = () => {
  const client = useApolloClient();

  const [addCommentMutation] = useMutation(ADD_COMMENT);

  const createComment = useCallback(
    async ({
      taskId,
      content,
      userId,
    }: {
      taskId: number;
      content: string;
      userId: number;
    }) => {
      await addCommentMutation({
        variables: {
          taskId,
          content,
          userId,
        },
        onCompleted: (response) => {
          client.refetchQueries({
            include: [GET_TASK_COMMENTS],
          });
        },
      });
    },
    [addCommentMutation],
  );

  const addCommentToCache = (taskId: number, newComment: iComment) => {
    const cache: {
      comments: iComment[];
    } | null = client.cache.readQuery({
      query: GET_TASK_COMMENTS,
      variables: { taskId },
    });

    if (cache?.comments) {
      client.cache.writeQuery({
        query: GET_TASK_COMMENTS,
        variables: { taskId },
        data: {
          comments: [...cache.comments, newComment],
        },
      });
    }
  };

  return {
    createComment,
  };
};
