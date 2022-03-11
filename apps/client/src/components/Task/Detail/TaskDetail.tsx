import Button from '@components/shared/Button';
import TextEditor from '@components/shared/TextEditor';
import TaskDetailBoardSelector from './BoardSelector/TaskDetailBoardSelector';
import TaskDetailProjectUserSelector from './ProjectUserSelector/TaskDetailProjectUserSelector';
import mergeClasses from '@utils/mergeClasses';

import defaultClasses from './taskDetail.module.css';
import { useTaskDetail } from './useTaskDetail';

type Props = {
  classes?: any;
  taskId: number;
  modalClose?: () => void;
};

const TaskDetail = ({ classes: propClasses, taskId, modalClose }: Props) => {
  const classes = mergeClasses(defaultClasses, propClasses);

  const {
    data,
    error,
    loading,
    isEditingDescription,

    onChangeBoard,
    onClickDescriptionButton,
  } = useTaskDetail(taskId);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log('data', data);

  return (
    <article className={classes.root}>
      <header>
        <figure>
          <img src="" alt="" />
        </figure>
      </header>
      <main>
        <section className={classes.content}>
          <p>{data?.name}</p>
          <div>
            <div>
              <p>Description</p>
              <Button variant="primary" onClick={onClickDescriptionButton}>
                {isEditingDescription ? 'Save' : 'Edit'}
              </Button>
            </div>

            {(isEditingDescription && (
              <TextEditor defaultValue={data?.description || ''} />
            )) || (
              <p
                dangerouslySetInnerHTML={{
                  __html: data?.description || '',
                }}
              />
            )}
          </div>

          <div>
            <p>Attachments</p>
          </div>
        </section>
        <aside className={classes.sidebar}>
          <div>
            <p>Board</p>
            <TaskDetailBoardSelector
              defaultValue={data?.boardId}
              projectId={data?.projectId}
              onChange={onChangeBoard}
            />
          </div>

          <div>
            <p>Board</p>
            <TaskDetailProjectUserSelector
              defaultValue={data?.reporterUserId}
              projectId={data?.projectId}
              onChange={onChangeBoard}
            />
          </div>
        </aside>
      </main>
    </article>
  );
};

export default TaskDetail;
