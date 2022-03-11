import Modal from '@components/shared/Modal';
import { useQueryParamModal } from '@talons/useQueryParamModal';
import { DraggableProps } from 'framer-motion';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import TaskDetail from '@components/Task/Detail';
interface Props extends DraggableProps {
  data: any;
  index: number;
}

/**
 * Task item component for view in board
 */
const TaskItem = ({ data, index }: Props) => {
  const {
    open: openTaskViewModal,
    close: closeTaskViewModal,
    isOpen: isTaskViewModalOpen,
    param,
  } = useQueryParamModal(`task-view-${data.id}`);

  return (
    <React.Fragment>
      {isTaskViewModalOpen() && (
        <Modal
          renderContent={(modal) => {
            const str = param.split('-');
            const taskId = str[str.length - 1];
            return <TaskDetail taskId={parseInt(taskId, 10)} />;
          }}
          testid={`modal:task-view-${data.id}`}
          isOpen
          withCloseIcon={false}
          onClose={closeTaskViewModal}
          width={800}
        />
      )}
      <Draggable draggableId={`${data.id}`} index={index}>
        {(provided, snapshot) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              onClick={openTaskViewModal}
            >
              {data.name}
            </div>
          );
        }}
      </Draggable>
    </React.Fragment>
  );
};

export default TaskItem;
