import BoardList from '@components/Board/List';
import AudienceSelector from '@components/Project/AudienceSelector';
import Avatar from '@components/shared/Avatar';
import Button from '@components/shared/Button';
import { useQueryParamModal } from '@talons/useQueryParamModal';
import { IProjectUser } from '@type/project.type';
import React, { Suspense } from 'react';
import classes from './projectPage.module.css';
import { useProjectPage } from './useProjectPage';
import cn from 'classnames';
import { BsThreeDots } from 'react-icons/bs';

const ProjectDetail = React.lazy(() => import('@components/Project/Detail'));
const Modal = React.lazy(() => import('@components/shared/Modal'));
const CreateTask = React.lazy(() => import('@components/Task/Create'));

const ProjectPage = () => {
  const {
    data,
    error,
    loading,
    audience,
    isProjectDetailOpened,

    setAudience,
    onOpenProjectDetail,
    onCloseProjectDetail,
  } = useProjectPage();

  const {
    open: openCreateTaskModal,
    close: closeCreateTaskModal,
    isOpen: isCreateTaskModalOpen,
  } = useQueryParamModal('task-create');

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error!</div>;

  const boards = data?.boards || [];
  const projectUsers = data?.projectUsers || [];

  return (
    <section className={classes.root}>
      {isCreateTaskModalOpen() && (
        <Suspense fallback={<div>Loading...</div>}>
          <Modal
            renderContent={(modal) => {
              return <CreateTask />;
            }}
            testid="modal:board-create"
            isOpen
            withCloseIcon={false}
            onClose={closeCreateTaskModal}
            width={800}
          />
        </Suspense>
      )}
      <header className={classes.header}>
        <div className={classes.left}>
          <div className={classes.info}>
            <div className={classes.audienceSelector}>
              <AudienceSelector audience={audience} setAudience={setAudience} />
            </div>
            <div className={classes.projectUsers}>
              {projectUsers?.map((projectUser: IProjectUser) => {
                return (
                  <article key={`projectUser-${projectUser.id}`}>
                    <Avatar
                      src={projectUser.avatar || ''}
                      alt={projectUser.name}
                      size="MEDIUM"
                    />
                  </article>
                );
              })}
            </div>
          </div>
        </div>
        <div className={classes.right}>
          <Button
            onClick={onOpenProjectDetail}
            variant="secondary"
            icon={<BsThreeDots />}
          >
            Show menu
          </Button>
        </div>
      </header>
      <Button variant="primary" onClick={openCreateTaskModal}>
        Add task
      </Button>
      <BoardList data={boards} />
      <aside
        className={cn(classes.sideRight, {
          [classes.open]: isProjectDetailOpened,
        })}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <ProjectDetail data={data} onClose={onCloseProjectDetail} />
        </Suspense>
      </aside>
    </section>
  );
};

export default ProjectPage;
