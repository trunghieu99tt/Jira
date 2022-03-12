import { useCommentService } from '@talons/useCommentService';
import { ChangeEvent, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user.recoil';
import classes from './createComment.module.css';

type Props = {
  taskId: number;
};

const CreateComment = ({ taskId }: Props) => {
  const currentUser = useRecoilValue(userState);

  const [comment, setComment] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { addComment } = useCommentService();

  const $commentInputRef = useRef<HTMLTextAreaElement>(null);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <section className={classes.root}>
      <div>
        <img src={currentUser?.avatar} alt={currentUser?.name} />
      </div>
      <div>
        <textarea
          ref={$commentInputRef}
          className={classes.textarea}
          placeholder="Write a comment..."
          value={comment}
          onChange={onChange}
        />
        <p>
          Tips: Press <strong>M</strong> to comment
        </p>
      </div>
    </section>
  );
};

export default CreateComment;
