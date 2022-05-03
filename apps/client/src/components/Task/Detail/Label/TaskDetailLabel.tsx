import { useTaskDetailLabel } from '@components/Task/Detail/Label/useTaskDetailLabel';
import defaultClasses from './taskDetailLabel.module.css';
import mergeClasses from '@utils/mergeClasses';
import CreateLabel from '@components/Task/Label/Create';
import { IoAdd } from 'react-icons/all';
import LabelList from '@components/Task/Label/List';
import { AiOutlineTag } from 'react-icons/ai';
import { Fragment } from 'react';

type Props = {
  taskId: number;
  classes?: any;
};

const TaskDetailLabel = ({ taskId, classes: propClasses }: Props) => {
  const classes = mergeClasses(defaultClasses, propClasses);

  const {
    labels,
    updateTaskLabelHandler,
    taskLabels,
    showAddLabel,
    onToggleAddLabelHandler,
  } = useTaskDetailLabel({
    taskId,
  });

  console.log('taskLabels', taskLabels);
  console.log('labels', labels);

  return (
    <section className={classes.root}>
      <div className={classes.labelContainer}>
        <LabelList data={taskLabels} onClick={updateTaskLabelHandler} />
        <button
          onClick={onToggleAddLabelHandler}
          className={classes.addLabelBtn}
        >
          <IoAdd />
        </button>
      </div>
      {showAddLabel && (
        <section className={classes.labelForms}>
          <CreateLabel />
          {labels?.length > 0 && (
            <Fragment>
              <div className={classes.availableLabels}>
                <p className={classes.availableLabelsHeading}>
                  <AiOutlineTag /> Available Labels
                </p>
                <LabelList data={labels} onClick={updateTaskLabelHandler} />
              </div>
            </Fragment>
          )}
        </section>
      )}
    </section>
  );
};

export default TaskDetailLabel;
