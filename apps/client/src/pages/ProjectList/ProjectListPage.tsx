import BoardCreate from '@components/Project/Create';
import ProjectList from '@components/Project/List/ProjectList';
import Button from '@components/shared/Button';
import Modal from '@components/shared/Modal';
import { useQueryParamModal } from '@talons/useQueryParamModal';
import classes from './projectListPage.module.css';
import { useProjectListPage } from './useProjectListPage';

const ProjectListPage = () => {
  const { data, error, loading } = useProjectListPage();
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
      <div className={classes.inner}>
        <header className={classes.header}>
          <h2 className={classes.heading}>All Projects</h2>
          <Button variant="primary" onClick={openCreateBoardModal}>
            Add
          </Button>
        </header>
        <section className={classes.list}>
          <ProjectList data={data} />
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
      </div>
    </section>
  );
};

export default ProjectListPage;
