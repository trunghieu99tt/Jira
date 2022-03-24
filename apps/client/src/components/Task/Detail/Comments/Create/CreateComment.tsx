import Avatar from '@components/shared/Avatar';
import Button from '@components/shared/Button';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user.recoil';
import classes from './createComment.module.css';
import Protip from './Protip';
import { useCreateComment } from './useCreateComment';

type Props = {
  taskId: number;
};

const CreateComment = ({ taskId }: Props) => {
  const currentUser = useRecoilValue(userState);

  const {
    comment,
    isEditing,
    $commentInputRef,

    startEdit,
    cancelEdit,
    changeComment,
    handleKeyDown,
    submitCreateComment,
  } = useCreateComment({
    taskId,
  });

  return (
    <section className={classes.root}>
      <div className={classes.user}>
        <Avatar
          src={currentUser?.avatar || ''}
          alt={currentUser?.name || ''}
          size="SMALL"
        />
      </div>
      <div className={classes.form}>
        <textarea
          ref={$commentInputRef}
          className={classes.textarea}
          placeholder="Write a comment..."
          value={comment}
          onFocus={startEdit}
          onChange={changeComment}
        />
        {(!isEditing && <Protip handleKeyDown={handleKeyDown} />) || (
          <div>
            <Button variant="primary" onClick={submitCreateComment}>
              Save
            </Button>
            <Button variant="secondary" onClick={cancelEdit}>
              Cancel
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CreateComment;
