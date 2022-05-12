import Avatar from '@components/shared/Avatar';
import EditableField from '@components/shared/EditableField';
import { IProject } from '@type/project.type';
import React from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { MdOutlineDescription } from 'react-icons/md';
import classes from './projectDetail.module.css';
import ProjectUser from './ProjectUser';
import { useProjectDetail } from './useProjectDetail';

type Props = {
  data: IProject;
  onClose: () => void;
};

const ProjectDetail = ({ data, onClose }: Props) => {
  const { description, onChangeDescription, updateDescription } =
    useProjectDetail({
      data,
    });

  return (
    <section className={classes.root}>
      <button className={classes.closeBtn} onClick={onClose}>
        X
      </button>
      <header className={classes.header}>
        <h1 className={classes.title}>Project Title</h1>
      </header>
      <section className={classes.main}>
        <div className={classes.item}>
          <p className={classes.sectionHeading}>
            <FaRegUserCircle />
            Made by
          </p>
          <div className={classes.owner}>
            <Avatar
              src={data?.owner?.avatar || ''}
              alt={data?.owner?.name || 'avatar'}
              size="MEDIUM"
            />
            <div className={classes.ownerInfo}>
              <p className={classes.ownerName}>
                {data?.owner?.name || 'owner'}
              </p>
              <p className={classes.createdAt}>
                On{' '}
                {data?.createdAt &&
                  new Date(data?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        <div className={classes.item}>
          <EditableField
            title="Description"
            icon={<MdOutlineDescription />}
            onChange={onChangeDescription}
            onSubmit={updateDescription}
            defaultValue={description}
            classes={{
              label: classes.sectionHeading,
            }}
          />
        </div>

        <div className={classes.item}>
          <p className={classes.sectionHeading}>Team</p>
          <div className={classes.team}>
            {data?.projectUsers?.map((user) => (
              <ProjectUser key={user.id} data={user} />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default ProjectDetail;
