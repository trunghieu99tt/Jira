import { useProjectPage } from './useProjectPage';
import { DragDropContext } from 'react-beautiful-dnd';
import { IBoard } from '@type/board.type';
import BoardItem from '@components/Board/Item';
import Button from '@components/shared/Button';
import { useQueryParamModal } from '@talons/useQueryParamModal';
import Modal from '@components/shared/Modal';
import CreateTask from '@components/Task/Create';

type Props = {};

const ProjectPage = (props: Props) => {
  const { data, error, loading } = useProjectPage();

  const {
    open: openCreateTaskModal,
    close: closeCreateTaskModal,
    isOpen: isCreateTaskModalOpen,
  } = useQueryParamModal('task-create');

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error!</div>;

  const boards = data?.boards || [];

  return (
    <div>
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
          Add issue
        </Button>
      </header>
      <DragDropContext onDragEnd={() => {}}>
        <div>
          {boards?.map((board: IBoard) => {
            return <BoardItem key={board.id} data={board} />;
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default ProjectPage;
