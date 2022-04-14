import Avatar from '@components/shared/Avatar';
import defaultClasses from './useOption.module.css';
import mergeClasses from '@utils/mergeClasses';

type Props = {
  data: {
    name?: string;
    avatar?: string;
  };
  classes?: Record<string, any>;
};

const UserOption = ({ data, classes: propsClasses }: Props) => {
  const classes = mergeClasses(defaultClasses, propsClasses);
  return (
    <article className={classes.root}>
      {data?.avatar && (
        <Avatar
          src={data.avatar}
          alt={data?.name || ''}
          size="SMALL"
          classes={{
            root: classes.userAvatarRoot,
          }}
        />
      )}
      <span>{data?.name}</span>
    </article>
  );
};

export default UserOption;
