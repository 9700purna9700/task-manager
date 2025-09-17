export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  project: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = 'todo' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

export interface TaskFormData {
  title: string;
  description: string;
  priority: TaskPriority;
  project: string;
  dueDate?: string;
}

export interface FilterState {
  search: string;
  status: TaskStatus | 'all';
  priority: TaskPriority | 'all';
  project: string | 'all';
  dueDateFilter: 'all' | 'overdue' | 'today' | 'week';
}

export interface Project {
  id: string;
  name: string;
  color: string;
  taskCount: number;
}