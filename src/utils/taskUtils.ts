import { Task, TaskStatus, TaskPriority, FilterState } from '../types';

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays < -1) return `${Math.abs(diffDays)} days ago`;
  if (diffDays > 1) return `In ${diffDays} days`;

  return date.toLocaleDateString();
};

export const isOverdue = (dueDate: string): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const taskDate = new Date(dueDate);
  taskDate.setHours(0, 0, 0, 0);
  return taskDate < today;
};

export const getPriorityColor = (priority: TaskPriority): string => {
  const colors = {
    low: 'bg-blue-100 text-blue-800 border-blue-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    critical: 'bg-red-100 text-red-800 border-red-200'
  };
  return colors[priority];
};

export const getStatusColor = (status: TaskStatus): string => {
  const colors = {
    todo: 'bg-gray-100 text-gray-800 border-gray-200',
    'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
    completed: 'bg-green-100 text-green-800 border-green-200'
  };
  return colors[status];
};

export const filterTasks = (tasks: Task[], filter: FilterState): Task[] => {
  return tasks.filter(task => {
    // Search filter
    if (filter.search && !task.title.toLowerCase().includes(filter.search.toLowerCase()) &&
        !task.description.toLowerCase().includes(filter.search.toLowerCase())) {
      return false;
    }

    // Status filter
    if (filter.status !== 'all' && task.status !== filter.status) {
      return false;
    }

    // Priority filter
    if (filter.priority !== 'all' && task.priority !== filter.priority) {
      return false;
    }

    // Project filter
    if (filter.project !== 'all' && task.project !== filter.project) {
      return false;
    }

    // Due date filter
    if (filter.dueDateFilter !== 'all' && task.dueDate) {
      const today = new Date();
      const taskDate = new Date(task.dueDate);
      
      switch (filter.dueDateFilter) {
        case 'overdue':
          if (!isOverdue(task.dueDate)) return false;
          break;
        case 'today':
          if (taskDate.toDateString() !== today.toDateString()) return false;
          break;
        case 'week':
          const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
          if (taskDate > weekFromNow) return false;
          break;
      }
    }

    return true;
  });
};

export const sortTasks = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => {
    // Completed tasks go to bottom
    if (a.status === 'completed' && b.status !== 'completed') return 1;
    if (b.status === 'completed' && a.status !== 'completed') return -1;

    // Sort by priority (critical > high > medium > low)
    const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
    if (priorityDiff !== 0) return priorityDiff;

    // Sort by due date (overdue first, then by date)
    if (a.dueDate && b.dueDate) {
      const aOverdue = isOverdue(a.dueDate);
      const bOverdue = isOverdue(b.dueDate);
      if (aOverdue && !bOverdue) return -1;
      if (!aOverdue && bOverdue) return 1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;

    // Finally sort by creation date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
};