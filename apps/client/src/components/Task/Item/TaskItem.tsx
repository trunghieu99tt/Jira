import React, { Suspense } from 'react';
import { DraggableProps } from 'framer-motion';
import { Draggable } from 'react-beautiful-dnd';
import cn from 'classnames';
import { useQueryParamModal } from '@talons/useQueryParamModal';
import mergeClasses from '@utils/mergeClasses';
import Avatar from '@components/shared/Avatar';
import TaskDetail from '@components/Task/Detail';
import defaultClasses from './taskItem.module.css';
import { useTaskLabelService } from '@talons/useTaskLabelService';
import LabelList from '@components/Task/Label/List';
import { MdOutlineInsertComment } from 'react-icons/md';
import { IoMdAttach } from 'react-icons/io';

const Modal = React.lazy(() => import('@components/shared/Modal'));

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
  const { taskLabels } = useTaskLabelService({ taskId: data.id });

  return (
    <React.Fragment>
      {isTaskViewModalOpen() && (
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
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
                {data?.coverPhoto && (
                  <figure className={classes.coverPhotoWrapper}>
                    <img
                      src={data?.coverPhoto}
                      alt={data?.name}
                      className={classes.coverPhoto}
                    />
                  </figure>
                )}
                <p className={classes.name}>{data.name}</p>

                <div className={classes.labelList}>
                  <LabelList data={taskLabels} />
                </div>

                <div className={classes.footer}>
                  {data?.assigneeAvatar && (
                    <div className={classes.assignee}>
                      <Avatar
                        src={data.assigneeAvatar}
                        alt={data.assigneeName}
                        size="SMALL"
                      />
                    </div>
                  )}
                  <div className={classes.stats}>
                    <span className={classes.statItem}>
                      <MdOutlineInsertComment />
                      {data?.numberOfComments}
                    </span>
                    <span className={classes.statItem}>
                      <IoMdAttach />
                      {data?.numberOfAttachments}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          );
        }}
      </Draggable>
    </React.Fragment>
  );
};

export default TaskItem;
