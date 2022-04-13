import React, { Suspense } from 'react';
import BoardItem from '@components/Board/Item';
import AudienceSelector from '@components/Project/AudienceSelector';
import Avatar from '@components/shared/Avatar';
import Button from '@components/shared/Button';
import { useQueryParamModal } from '@talons/useQueryParamModal';
import { IBoard } from '@type/board.type';
import { IProjectUser } from '@type/project.type';
import { DragDropContext } from 'react-beautiful-dnd';
import classes from './projectPage.module.css';
import { useProjectPage } from './useProjectPage';

const Modal = React.lazy(() => import('@components/shared/Modal'));
const CreateTask = React.lazy(() => import('@components/Task/Create'));

const ProjectPage = () => {
  const { data, error, loading, onDropEnd, audience, setAudience } =
    useProjectPage();

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
      <section>
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
        <Button variant="primary" onClick={openCreateTaskModal}>
          Add task
        </Button>
      </section>
      <DragDropContext onDragEnd={onDropEnd}>
        <section className={classes.boardList}>
          {boards?.map((board: IBoard) => {
            return <BoardItem key={board.id} data={board} />;
          })}
        </section>
      </DragDropContext>
    </section>
  );
};

export default ProjectPage;
