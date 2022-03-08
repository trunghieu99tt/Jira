import { DraggableProps } from 'framer-motion';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

interface Props extends DraggableProps {
  data: any;
  index: number;
}

const TaskItem = ({ data, index }: Props) => {
  return (
    <Draggable draggableId={`${data.id}`} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {data.name}
          </div>
        );
      }}
    </Draggable>
  );
};

export default TaskItem;
