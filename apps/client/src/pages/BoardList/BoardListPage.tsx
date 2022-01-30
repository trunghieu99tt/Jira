import BoardList from '@components/BoardList';
import { useBoardList } from './useBoardListPage';

import classes from './boardListPage.module.css';
import Button from '@components/shared/Button';

const BoardListPage = () => {
  const { data, error, loading } = useBoardList();

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
        <Button variant="primary">Add</Button>
      </header>
      <section className={classes.list}>
        <BoardList data={data} />
      </section>
    </section>
  );
};

export default BoardListPage;
