import { Link } from 'react-router-dom';

// components
import Image from '@components/shared/Image';
import Avatar from '@components/shared/Avatar';

// types
import { IProject, IProjectUser } from '@type/project.type';

// styles
import classes from './projectList.module.css';

type Props = {
  data: IProject[];
};

const ProjectList = ({ data }: Props) => {
  return (
    <section className={classes.root}>
      {data?.map((project: IProject) => {
        const { projectUsers } = project;
        return (
          <Link
            to={`/project/${project.id}`}
            key={`project-list-item-${project.id}`}
          >
            <article className={classes.item}>
              <Image
                src={project.coverPhoto}
                alt={`${project.name}`}
                height="200px"
                classes={{ root: classes.itemImage }}
              />
              <div className={classes.info}>
                <h3 className={classes.name}>{project.name}</h3>
                <p className={classes.description}>{project.description}</p>
                <div className={classes.projectUsers}>
                  {projectUsers?.map((projectUser: IProjectUser) => {
                    return (
                      <Avatar
                        src={projectUser?.avatar || ''}
                        alt={projectUser?.name}
                        tooltip={projectUser?.name}
                        size="MEDIUM"
                        key={`project-list-item-user-avatar-${projectUser?.id}`}
                      ></Avatar>
                    );
                  })}
                </div>
              </div>
            </article>
          </Link>
        );
      })}
    </section>
  );
};

export default ProjectList;
