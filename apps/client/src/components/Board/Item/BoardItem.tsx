import TaskItem from '@components/Task/Item';
import { IBoard } from '@type/board.type';
import { IBoardTask } from '@type/task.type';
import mergeClasses from '@utils/mergeClasses';
import { memo } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import defaultClasses from './boardItem.module.css';
import { useBoardItem } from './useBoardItem';

type Props = {
  data: IBoard;
  classes?: any;
};

const BoardItem = ({ data: propData, classes: propsClasses }: Props) => {
  const classes = mergeClasses(defaultClasses, propsClasses);
  const { data: boardDetail } = useBoardItem(propData.id);
  const tasks: IBoardTask[] = [...(boardDetail?.tasks || [])];

  console.log('tasks', tasks);

  return (
    <Droppable droppableId={propData?.id.toString()}>
      {(provided, snapshot) => (
        <article className={classes.root}>
          <h4 className={classes.name}>{boardDetail?.name}</h4>

          <div ref={provided.innerRef}>
            {tasks?.map((task: any, idx: number) => {
              return (
                <TaskItem
                  data={task}
                  key={`taskItem-${task.id}`}
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

export default memo(BoardItem);
