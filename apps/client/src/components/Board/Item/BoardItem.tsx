import { useRecoilValue } from 'recoil';
import { Droppable } from 'react-beautiful-dnd';

// utils
import mergeClasses from '@utils/mergeClasses';

// components
import TaskItem from '@components/Task/Item';

// types
import { IBoard } from '@type/board.type';

import defaultClasses from './boardItem.module.css';
import { useBoardItem } from './useBoardItem';

type Props = {
  data: IBoard;
  classes?: any;
};

const BoardItem = ({ data: propData, classes: propsClasses }: Props) => {
  const classes = mergeClasses(defaultClasses, propsClasses);

  const {
    getBoardDetailResponse: { data },
  } = useBoardItem(propData.id);

  const boardDetail = data?.board || {};

  return (
    <Droppable droppableId={propData?.id.toString()}>
      {(provided, snapshot) => (
        <article className={classes.root}>
          <h4 className={classes.name}>{boardDetail?.name}</h4>

          <div ref={provided.innerRef}>
            {boardDetail?.tasks?.map((task: any, idx: number) => {
              return (
                <TaskItem
                  data={task}
                  key={task.id}
                  index={idx}
                  {...provided.droppableProps}
                />
              );
            })}
            {provided.placeholder}
          </div>
        </article>
      )}
    </Droppable>
  );
};

export default BoardItem;
