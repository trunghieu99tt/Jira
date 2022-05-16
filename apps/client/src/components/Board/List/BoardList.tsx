import Button from '@components/shared/Button';
import { IBoard } from '@type/board.type';
import mergeClasses from '@utils/mergeClasses';
import React, { Suspense } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import BoardItem from '../Item';
import defaultClasses from './boardList.module.css';
import { useBoardList } from './useBoardList';

const BoardForm = React.lazy(() => import('../Form'));
const Modal = React.lazy(() => import('@components/shared/Modal'));

type Props = {
  data: IBoard[];
  classes?: Record<string, string>;
};

const BoardList = ({ data, classes: propsClasses }: Props) => {
  const classes = mergeClasses(defaultClasses, propsClasses);
  const {
    onDropEnd,
    closeBoardFormModal,
    isBoardFormModalOpened,
    openBoardFormModal,
  } = useBoardList();

  return (
    <React.Fragment>
      {isBoardFormModalOpened() && (
        <Suspense fallback={<div>Loading...</div>}>
          <Modal
            renderContent={(modal) => {
              return <BoardForm close={closeBoardFormModal} />;
            }}
            testid="modal:board-form"
            isOpen
            withCloseIcon={false}
            onClose={closeBoardFormModal}
            width={800}
          ></Modal>
        </Suspense>
      )}
      <DragDropContext onDragEnd={onDropEnd}>
        <section className={classes.boardList}>
          {data?.map((board: IBoard) => {
            return <BoardItem key={`boardItem-${board.id}`} data={board} />;
          })}
          <div>
            <Button onClick={openBoardFormModal} variant="primary">
              Add new board
            </Button>
          </div>
        </section>
      </DragDropContext>
    </React.Fragment>
  );
};

export default BoardList;
