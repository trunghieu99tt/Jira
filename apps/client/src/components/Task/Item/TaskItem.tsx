import React from 'react';
import { DraggableProps } from 'framer-motion';
import { Draggable } from 'react-beautiful-dnd';
import cn from 'classnames';

// talons
import { useQueryParamModal } from '@talons/useQueryParamModal';

// utils
import mergeClasses from '@utils/mergeClasses';

// components
import Modal from '@components/shared/Modal';
import Avatar from '@components/shared/Avatar';
import TaskDetail from '@components/Task/Detail';

// styles
import defaultClasses from './taskItem.module.css';

interface Props extends DraggableProps {
  data: any;
  index: number;
  classes?: any;
}

/**
 * Task item component for view in board
 */
const TaskItem = ({ data, index, classes: propClasses }: Props) => {
  const classes = mergeClasses(defaultClasses, propClasses);

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
            <article
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              onClick={openTaskViewModal}
              className={cn(classes.root, {
                [classes.isDragging]:
                  snapshot.isDragging && !snapshot.isDropAnimating,
              })}
            >
              <div
                className={cn(classes.inner, {
                  [classes.isDragging]:
                    snapshot.isDragging && !snapshot.isDropAnimating,
                })}
              >
                <p className={classes.name}>{data.name}</p>

                {data?.assigneeAvatar && (
                  <div className={classes.assignee}>
                    <Avatar
                      src={data.assigneeAvatar}
                      alt={data.assigneeName}
                      size="SMALL"
                    />
                  </div>
                )}
              </div>
            </article>
          );
        }}
      </Draggable>
    </React.Fragment>
  );
};

export default TaskItem;
