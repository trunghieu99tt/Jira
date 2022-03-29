import { DragDropContext } from 'react-beautiful-dnd';

// talons
import { useProjectPage } from './useProjectPage';
import { useQueryParamModal } from '@talons/useQueryParamModal';

// components
import Modal from '@components/shared/Modal';
import Button from '@components/shared/Button';
import BoardItem from '@components/Board/Item';
import CreateTask from '@components/Task/Create';

// types
import { IBoard } from '@type/board.type';

// styles
import classes from './projectPage.module.css';
import { IProjectUser } from '@type/project.type';
import Avatar from '@components/shared/Avatar';

const ProjectPage = () => {
  const { data, error, loading, onDropEnd } = useProjectPage();

  const {
    open: openCreateTaskModal,
    close: closeCreateTaskModal,
    isOpen: isCreateTaskModalOpen,
  } = useQueryParamModal('task-create');

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error!</div>;

  const boards = data?.boards || [];
  const projectUsers = data?.projectUsers || [];
  console.log('projectUsers', projectUsers);

  return (
    <section className={classes.root}>
      {isCreateTaskModalOpen() && (
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
      )}
      <header>
        <Button variant="primary" onClick={openCreateTaskModal}>
          Add task
        </Button>
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
      </header>
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
