import { useCommentService } from '@talons/useCommentService';
import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { taskCommentsSelector } from 'recoil/comment.recoil';
import { userState } from 'recoil/user.recoil';

import classes from './taskDetailComment.module.css';

type Props = {
  taskId: number;
};

const TaskDetailComment = ({ taskId }: Props) => {
  const { fetchTaskComments } = useCommentService();
  const comments = useRecoilValue(taskCommentsSelector(taskId));
  const currentUser = useRecoilValue(userState);

  const $commentInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'm') {
        e.preventDefault();
        $commentInputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (taskId) {
      fetchTaskComments({
        taskId,
      });
    }
  }, [fetchTaskComments, taskId]);

  return (
    <section className={classes.root}>
      <div>
        <div>
          <img src={currentUser?.avatar} alt={currentUser?.name} />
        </div>
        <div>
          <textarea
            ref={$commentInputRef}
            className={classes.textarea}
            placeholder="Write a comment..."
          />
          <p>
            Tips: Press <strong>M</strong> to comment
          </p>
        </div>
      </div>

      {comments.map((comment) => (
        <div>{comment.content}</div>
      ))}
    </section>
  );
};

export default TaskDetailComment;
