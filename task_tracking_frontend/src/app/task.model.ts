export interface Task {
  // Task title (required)
  title: string;
  // Is the task completed?
  completed: boolean;
  // Optional due date for the task
  dueDate?: Date | null;
}
