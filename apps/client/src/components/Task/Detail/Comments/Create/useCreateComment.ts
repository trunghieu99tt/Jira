import { useCommentService } from '@talons/useCommentService';
import { ChangeEvent, useCallback, useRef, useState } from 'react';

export const useCreateComment = ({ taskId }: { taskId: number }) => {
  const [comment, setComment] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { createComment } = useCommentService();

  const $commentInputRef = useRef<HTMLTextAreaElement>(null);

  const changeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const cancelEdit = useCallback(() => {
    setComment('');
    setIsEditing(false);
  }, []);

  const startEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const submitCreateComment = async () => {
    await createComment({
      taskId,
      content: comment,
      userId: 1,
    });
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'm':
          e.preventDefault();
          $commentInputRef.current?.focus();
          startEdit();
          break;
      }
    },
    [$commentInputRef, startEdit],
  );

  return {
    comment,
    isEditing,
    $commentInputRef,

    startEdit,
    cancelEdit,
    changeComment,
    handleKeyDown,
    submitCreateComment,
  };
};
