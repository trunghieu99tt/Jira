import Avatar from '@components/shared/Avatar';
import Button from '@components/shared/Button';
import { IProjectUser } from '@type/project.type';
import React from 'react';
import classes from './projectUser.module.css';

type Props = {
  data: IProjectUser;
};

const ProjectUser = ({ data }: Props) => {
  const isOwner = data.userId === 1;
  return (
    <article className={classes.root}>
      <div className={classes.left}>
        <Avatar src={data?.avatar || ''} alt={data?.name} size="SMALL" />
        <p className={classes.name}>{data?.name}</p>
      </div>
      {isOwner && data?.userId !== 1 && (
        <Button variant="primary">Remove</Button>
      )}
    </article>
  );
};

export default ProjectUser;
