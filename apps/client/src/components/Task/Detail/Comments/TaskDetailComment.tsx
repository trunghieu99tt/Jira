// types
import { useQuery } from '@apollo/client';
import { iComment } from '@type/comment.type';
import { GET_TASK_COMMENTS } from 'graphql/queries/comment.queries';
import CreateComment from './Create/CreateComment';
// components
import CommentItem from './Item/CommentItem';
// styles
import classes from './taskDetailComment.module.css';

type Props = {
  taskId: number;
};

const TaskDetailComment = ({ taskId }: Props) => {
  const { data, loading, error } = useQuery(GET_TASK_COMMENTS, {
    variables: {
      taskId,
    },
  });
  const comments = data?.comments || [];

  return (
    <section className={classes.root}>
      <CreateComment taskId={taskId} />

      <div className={classes.list}>
        {comments.map((comment: iComment) => (
          <CommentItem key={`comment-${comment.id}`} data={comment} />
        ))}
      </div>
    </section>
  );
};

export default TaskDetailComment;
