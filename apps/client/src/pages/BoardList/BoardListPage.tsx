import BoardList from '@components/BoardList';

// talons
import { useBoardList } from './useBoardListPage';
import { useQueryParamModal } from '@talons/useQueryParamModal';

// components
import Button from '@components/shared/Button';
import Modal from '@components/shared/Modal';

// styles
import classes from './boardListPage.module.css';
import BoardCreate from '@components/BoardCreate';

const BoardListPage = () => {
  const { data, error, loading } = useBoardList();
  const {
    open: openCreateBoardModal,
    close: closeCreateBoardModal,
    isOpen: isCreateBoardModalOpen,
  } = useQueryParamModal('board-create');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>Error!</div>;
  }

  return (
    <section className={classes.root}>
      <header className={classes.header}>
        <h2 className={classes.heading}>All Boards</h2>
        <Button variant="primary" onClick={openCreateBoardModal}>
          Add
        </Button>
      </header>
      <section className={classes.list}>
        <BoardList data={data} />
      </section>
      {isCreateBoardModalOpen() && (
        <Modal
          renderContent={(modal) => {
            return <BoardCreate />;
          }}
          testid="modal:board-create"
          isOpen
          withCloseIcon={false}
          onClose={closeCreateBoardModal}
          width={800}
        />
      )}
    </section>
  );
};

export default BoardListPage;
