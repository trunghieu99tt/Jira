import { IBoard } from '@type/board.type';
import { Droppable } from 'react-beautiful-dnd';

type Props = {
  data: IBoard;
};

const BoardItem = ({ data }: Props) => {
  return (
    <Droppable droppableId={`board-${data.id}`}>
      {(provided, snapshot) => (
        <article>
          <p>{data.name}</p>
        </article>
      )}
    </Droppable>
  );
};

export default BoardItem;
