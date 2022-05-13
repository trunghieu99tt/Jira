import Avatar from '@components/shared/Avatar';
import { iComment } from '@type/comment.type';
import { calcDiffTimeString } from '@utils/helper';
import mergeClasses from '@utils/mergeClasses';
import cn from 'classnames';

import defaultClasses from './commentItem.module.css';

type Props = {
  data: iComment;
  classes?: any;
};

const CommentItem = ({ data, classes: propsClasses }: Props) => {
  const classes = mergeClasses(defaultClasses, propsClasses);
  const { name = '', avatar = '' } = data?.owner || {};

  return (
    <article className={classes.root}>
      <div className={classes.meta}>
        <div className={classes.left}>
          <Avatar alt={name} size="MEDIUM" src={avatar} />
        </div>
        <div className={classes.right}>
          <div className={cn(classes.inline, classes.ownerName)}>{name}</div>
          <div className={cn(classes.inline, classes.updatedAt)}>
            {calcDiffTimeString(data?.updatedAt)}
          </div>
        </div>
      </div>
      <p className={classes.content}>{data.content}</p>
    </article>
  );
};

export default CommentItem;
