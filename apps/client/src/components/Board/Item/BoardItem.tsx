import { IBoard } from '@type/board.type';
import { Droppable } from 'react-beautiful-dnd';
import TaskItem from '@components/Task/Item';
import { useRecoilValue } from 'recoil';
import { boardSelector } from 'recoil/board.recoil';

type Props = {
  data: IBoard;
};

const BoardItem = ({ data }: Props) => {
  const boardDetail = useRecoilValue(boardSelector(data.id));

  return (
    <Droppable droppableId={data?.id.toString()}>
      {(provided, snapshot) => (
        <article>
          <p>{boardDetail?.name}</p>

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
