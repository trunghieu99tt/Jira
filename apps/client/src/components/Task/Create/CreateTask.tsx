// talons
import { useCreateTask } from './useCreateTask';

// utils
import mergeClasses from '@utils/mergeClasses';

// components
import Form from '@components/shared/Form';
import Button from '@components/shared/Button';
import FileUploader from '@components/shared/FileUploader';

// constants
import {
  MAX_NUMBER_OF_ATTACHMENTS,
  MAX_NUMBER_OF_COVER_PHOTO,
} from '@constants/common';

// styles
import defaultClasses from './createTask.module.css';
import {
  TASK_PRIORITY,
  TASK_PRIORITY_LABEL,
  TASK_TYPES,
  TASK_TYPES_LABEL,
} from '@constants/task';
import { useMemo, useRef } from 'react';
import { useParams } from 'react-router';
import { useRecoilValue } from 'recoil';
import {
  selectProjectBoardByProjectId,
  selectProjectUsersByProjectId,
} from 'recoil/project.recoil';

type Props = {
  classes?: any;
};

const CreateTask = ({ classes: propsClasses }: Props) => {
  const classes = mergeClasses(defaultClasses, propsClasses);
  const { projectId } = useParams();
  const projectUsers = useRecoilValue(selectProjectUsersByProjectId(projectId));
  const projectBoards = useRecoilValue(
    selectProjectBoardByProjectId(projectId),
  );

  const { onSubmit, handleAttachment } = useCreateTask();
  const $formRef = useRef<HTMLFormElement>(null);

  const taskTypeOptions = useMemo(
    () =>
      Object.values(TASK_TYPES).map((taskType) => ({
        value: taskType,
        label: TASK_TYPES_LABEL[taskType],
      })),
    [],
  );

  const renderTaskTypeOptions = ({ value: type }: { value: string }) => {
    return (
      <div>
        <span>{TASK_TYPES_LABEL[type]}</span>
      </div>
    );
  };

  const userOptions = useMemo(() => {
    console.log('projectUsers', projectUsers);
    return (
      projectUsers?.map((user) => ({
        value: user.id,
        label: user.name,
      })) || []
    );
  }, [projectUsers]);

  const renderUserOption = ({ value: userId }: { value: number }) => {
    const user = projectUsers.find((user) => user.id === userId);
    return (
      <div>
        <span>{user?.name}</span>
      </div>
    );
  };

  const boardOptions = useMemo(() => {
    return (
      projectBoards?.map((board) => ({
        value: board.id,
        label: board.name,
      })) || []
    );
  }, [projectBoards]);

  const renderBoardOption = ({ value: boardId }: { value: number }) => {
    const board = projectBoards.find((board) => board.id === boardId);
    return (
      <div>
        <span>{board?.name}</span>
      </div>
    );
  };

  const taskPriorityOptions = useMemo(() => {
    return Object.values(TASK_PRIORITY).map((priority) => ({
      value: priority,
      label: TASK_PRIORITY_LABEL[priority],
    }));
  }, []);

  const renderTaskPriorityOption = ({ value: priority }: { value: string }) => {
    return (
      <div>
        <span>{TASK_PRIORITY_LABEL[priority]}</span>
      </div>
    );
  };

  return (
    <Form
      enableReinitialize
      initialValues={{
        name: '',
        description: '',
        type: TASK_TYPES.TASK,
      }}
      validations={{
        name: Form.is.required(),
      }}
      onSubmit={onSubmit}
      innerRef={$formRef}
    >
      <Form.Element className={classes.formWrapper}>
        <h3>Create a new task</h3>

        <Form.Field.Select
          name="type"
          label="Task type"
          defaultValue={TASK_TYPES.TASK}
          options={taskTypeOptions}
          renderOption={renderTaskTypeOptions}
          renderValue={renderTaskTypeOptions}
        />
        <Form.Field.Input name="name" label="Task" />
        <Form.Field.Input name="summary" label="Short Summary" />
        <Form.Field.TextEditor name="description" label="Description" />
        <Form.Field.Select
          name="reporterUserId"
          label="Reporter"
          options={userOptions}
          renderOption={renderUserOption}
          renderValue={renderUserOption}
        />
        <Form.Field.Select
          name="assigneeUserId"
          label="Assignee"
          options={userOptions}
          renderOption={renderUserOption}
          renderValue={renderUserOption}
        />

        <Form.Field.Select
          name="boardId"
          label="Board"
          options={boardOptions}
          renderOption={renderBoardOption}
          renderValue={renderBoardOption}
        />
        <Form.Field.Select
          name="priority"
          label="Priority"
          options={taskPriorityOptions}
          renderOption={renderTaskPriorityOption}
          renderValue={renderTaskPriorityOption}
        />

        <FileUploader
          title="Attachments"
          handleFiles={handleAttachment}
          shouldHavePreview={true}
          maxNumberOfFiles={MAX_NUMBER_OF_ATTACHMENTS}
        />

        <div className={classes.actions}>
          <Button type="submit" variant="primary">
            Submit
          </Button>
          <Button
            type="button"
            variant="empty"
            onClick={() => {
              console.log('clicked cancel');
            }}
          >
            Cancel
          </Button>
        </div>
      </Form.Element>
    </Form>
  );
};

export default CreateTask;
