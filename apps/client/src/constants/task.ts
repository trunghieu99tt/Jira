export const TASK_TYPES = {
  TASK: 'task',
  BUG: 'bug',
  STORY: 'story',
};

export const TASK_STATUS = {
  BACKLOG: 'backlog',
  SELECTED: 'selected',
  INPROGRESS: 'inprogress',
  DONE: 'done',
};

export const TASK_PRIORITY = {
  HIGHEST: '5',
  HIGH: '4',
  MEDIUM: '3',
  LOW: '2',
  LOWEST: '1',
};

export const TASK_TYPES_LABEL = {
  [TASK_TYPES.TASK]: 'Task',
  [TASK_TYPES.BUG]: 'Bug',
  [TASK_TYPES.STORY]: 'Story',
};

export const TASK_STATUS_LABEL = {
  [TASK_STATUS.BACKLOG]: 'Backlog',
  [TASK_STATUS.SELECTED]: 'Selected for development',
  [TASK_STATUS.INPROGRESS]: 'In progress',
  [TASK_STATUS.DONE]: 'Done',
};

export const TASK_PRIORITY_LABEL = {
  [TASK_PRIORITY.HIGHEST]: 'Highest',
  [TASK_PRIORITY.HIGH]: 'High',
  [TASK_PRIORITY.MEDIUM]: 'Medium',
  [TASK_PRIORITY.LOW]: 'Low',
  [TASK_PRIORITY.LOWEST]: 'Lowest',
};
