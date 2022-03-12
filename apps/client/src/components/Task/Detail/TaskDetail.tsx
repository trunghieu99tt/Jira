// talons
import { useTaskDetail } from './useTaskDetail';

// utils
import mergeClasses from '@utils/mergeClasses';

// components
import TaskDetailDescription from './Description/TaskDetailDescription';
import TaskDetailBoardSelector from './BoardSelector/TaskDetailBoardSelector';
import TaskDetailProjectUserSelector from './ProjectUserSelector/TaskDetailProjectUserSelector';
import TaskDetailPrioritySelector from './PrioritySelector/TaskDetailPrioritySelector';

// icons
import { AiFillFileZip } from 'react-icons/ai';

// styles
import defaultClasses from './taskDetail.module.css';

type Props = {
  classes?: any;
  taskId: number;
  modalClose?: () => void;
};

const TaskDetail = ({ classes: propClasses, taskId, modalClose }: Props) => {
  const classes = mergeClasses(defaultClasses, propClasses);

  const {
    data,
    loading,

    onChangeBoard,
    onChangeAssignee,
    onChangePriority,
    updateDescription,
    onChangeDescription,
  } = useTaskDetail(taskId);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <article className={classes.root}>
      <header className={classes.header}>
        <figure>
          <img src="" alt="" />
        </figure>
      </header>
      <main className={classes.main}>
        <section className={classes.content}>
          <p className={classes.name}>{data?.name}</p>
          <div className={classes.item}>
            <TaskDetailDescription
              updateDescription={updateDescription}
              onChange={onChangeDescription}
              defaultValue={data?.description || ''}
            />
          </div>

          <div className={classes.item}>
            <p className={classes.itemName}>
              <AiFillFileZip />
              Attachments
            </p>
          </div>
        </section>
        <aside className={classes.sidebar}>
          <div className={classes.item}>
            <p className={classes.itemName}>Board</p>
            <TaskDetailBoardSelector
              defaultValue={data?.boardId}
              projectId={data?.projectId}
              onChange={onChangeBoard}
            />
          </div>

          <div className={classes.item}>
            <p className={classes.itemName}>Assignee</p>
            <TaskDetailProjectUserSelector
              defaultValue={data?.assignee?.userId}
              projectId={data?.projectId}
              onChange={onChangeAssignee}
            />
          </div>

          <div className={classes.item}>
            <p className={classes.itemName}> Reporter</p>
            <TaskDetailProjectUserSelector
              selectable={false}
              defaultValue={data?.reporter?.userId}
              projectId={data?.projectId}
              onChange={onChangeAssignee}
            />
          </div>

          <div className={classes.item}>
            <p className={classes.itemName}> Priority </p>
            <TaskDetailPrioritySelector
              defaultValue={data?.priority}
              onChange={onChangePriority}
            />
          </div>
        </aside>
      </main>
    </article>
  );
};

export default TaskDetail;
