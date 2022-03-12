import { DragDropContext } from 'react-beautiful-dnd';

// talons
import { useProjectPage } from './useProjectPage';
import { useQueryParamModal } from '@talons/useQueryParamModal';

// components
import Modal from '@components/shared/Modal';
import BoardItem from '@components/Board/Item';
import Button from '@components/shared/Button';
import CreateTask from '@components/Task/Create';

// types
import { IBoard } from '@type/board.type';

// styles
import classes from './projectPage.module.css';

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
