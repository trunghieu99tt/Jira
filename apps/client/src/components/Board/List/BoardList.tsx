import { IBoard } from '@type/board.type';
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useBoardList } from './useBoardList';
import BoardItem from '../Item';
import mergeClasses from '@utils/mergeClasses';
import defaultClasses from './boardList.module.css';

type Props = {
  data: IBoard[];
  classes?: Record<string, string>;
};

const BoardList = ({ data, classes: propsClasses }: Props) => {
  const classes = mergeClasses(defaultClasses, propsClasses);
  const { onDropEnd } = useBoardList();

  return (
    <DragDropContext onDragEnd={onDropEnd}>
      <section className={classes.boardList}>
        {data?.map((board: IBoard) => {
          return <BoardItem key={`boardItem-${board.id}`} data={board} />;
        })}
      </section>
    </DragDropContext>
  );
};

export default BoardList;
