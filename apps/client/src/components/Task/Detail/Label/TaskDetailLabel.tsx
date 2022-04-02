import { useTaskDetailLabel } from '@components/Task/Detail/Label/useTaskDetailLabel';
import defaultClasses from './taskDetailLabel.module.css';
import mergeClasses from '@utils/mergeClasses';
import { ITaskLabel } from '@type/task.type';
import CreateLabel from '@components/Task/Label/Create';
import { TiDeleteOutline } from 'react-icons/ti';
import { IoAdd } from 'react-icons/all';
import LabelList from '@components/Task/Label/List';

type Props = {
  taskId: number;
  classes?: any;
};

const TaskDetailLabel = ({ taskId, classes: propClasses }: Props) => {
  const classes = mergeClasses(defaultClasses, propClasses);

  const {
    updateTaskLabelHandler,
    taskLabels,
    showAddLabel,
    onToggleAddLabelHandler,
  } = useTaskDetailLabel({
    taskId,
  });

  return (
    <section className={classes.root}>
      <div className={classes.labels}>
        <div className={classes.labelsList}>
          {taskLabels.map((taskLabel: ITaskLabel) => {
            return (
              <div
                key={`task-label-${taskId}-${taskLabel.id}`}
                className={classes.label}
                style={{
                  backgroundColor: taskLabel.color,
                }}
              >
                {taskLabel.name}
                <button className={classes.deleteLabelBtn}>
                  <TiDeleteOutline />
                </button>
              </div>
            );
          })}
        </div>
        <button
          onClick={onToggleAddLabelHandler}
          className={classes.addLabelBtn}
        >
          Add Label <IoAdd />
        </button>
      </div>
      {showAddLabel && (
        <section>
          <CreateLabel />
          <LabelList />
        </section>
      )}
    </section>
  );
};

export default TaskDetailLabel;
