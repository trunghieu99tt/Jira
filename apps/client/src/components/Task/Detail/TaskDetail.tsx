// talons
import { useTaskDetail } from './useTaskDetail';

// utils
import mergeClasses from '@utils/mergeClasses';

// components
import TaskDetailName from './Name/TaskDetailName';
import TaskDetailComment from './Comments/TaskDetailComment';
import TaskDetailAttachment from './Attachments/TaskDetailAttachment';
import TaskDetailDescription from './Description/TaskDetailDescription';
import TaskDetailTypeSelector from './TypeSelector/TaskDetailTypeSelector';
import TaskDetailBoardSelector from './BoardSelector/TaskDetailBoardSelector';
import TaskDetailPrioritySelector from './PrioritySelector/TaskDetailPrioritySelector';
import TaskDetailProjectUserSelector from './ProjectUserSelector/TaskDetailProjectUserSelector';

// icons
import { AiFillFileZip } from 'react-icons/ai';

// styles
import defaultClasses from './taskDetail.module.css';
import TaskDetailLabel from '@components/Task/Detail/Label';

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

    onChangeName,
    onChangeType,
    onChangeBoard,
    onChangeAssignee,
    onChangePriority,
    updateDescription,
    onAddAttachments,
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
          <div className={classes.item}>
            <TaskDetailName
              onChange={onChangeName}
              defaultValue={data?.name || ''}
            />
          </div>
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
            <TaskDetailAttachment
              defaultValue={data?.attachments || []}
              onChange={onAddAttachments}
            />
          </div>

          <div className={classes.item}>
            <p className={classes.itemName}>Comments</p>
            <TaskDetailComment taskId={taskId} />
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
            <p className={classes.itemName}> Type </p>
            <TaskDetailTypeSelector
              defaultValue={data?.type}
              onChange={onChangeType}
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

          <div className={classes.item}>
            <p className={classes.itemName}> Labels </p>
            <TaskDetailLabel taskId={taskId} />
          </div>
        </aside>
      </main>
    </article>
  );
};

export default TaskDetail;
