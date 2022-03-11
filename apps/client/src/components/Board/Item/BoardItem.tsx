import { IBoard } from '@type/board.type';
import { memo } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useBoardItem } from './useBoardItem';
import TaskItem from '@components/Task/Item';

type Props = {
  data: IBoard;
};

const BoardItem = ({ data: propData }: Props) => {
  const { id, name } = propData;

  const { data, error, loading } = useBoardItem(id);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Droppable droppableId={id.toString()}>
      {(provided, snapshot) => (
        <article>
          <p>{name}</p>

          <div ref={provided.innerRef}>
            {data?.tasks?.map((task: any, idx: number) => {
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

export default memo(BoardItem);
