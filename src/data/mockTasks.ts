import { Task } from '../types';
import { generateId } from '../utils/taskUtils';

export const mockTasks: Task[] = [
  {
    id: generateId(),
    title: 'Design new homepage layout',
    description: 'Create wireframes and mockups for the redesigned homepage with improved user experience',
    status: 'in-progress',
    priority: 'high',
    project: 'Website Redesign',
    dueDate: '2025-01-20',
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-01-12T14:30:00Z'
  },
  {
    id: generateId(),
    title: 'Review quarterly budget',
    description: 'Analyze Q4 expenses and prepare budget recommendations for Q1',
    status: 'todo',
    priority: 'critical',
    project: 'Finance',
    dueDate: '2025-01-15',
    createdAt: '2025-01-08T09:15:00Z',
    updatedAt: '2025-01-08T09:15:00Z'
  },
  {
    id: generateId(),
    title: 'Update project documentation',
    description: 'Revise API documentation and add new endpoint specifications',
    status: 'completed',
    priority: 'medium',
    project: 'Development',
    dueDate: '2025-01-12',
    createdAt: '2025-01-05T16:45:00Z',
    updatedAt: '2025-01-11T11:20:00Z'
  },
  {
    id: generateId(),
    title: 'Schedule team retrospective',
    description: 'Organize and facilitate monthly team retrospective meeting',
    status: 'todo',
    priority: 'medium',
    project: 'Team Management',
    dueDate: '2025-01-25',
    createdAt: '2025-01-11T13:30:00Z',
    updatedAt: '2025-01-11T13:30:00Z'
  },
  {
    id: generateId(),
    title: 'Backup server maintenance',
    description: 'Perform routine maintenance on backup servers and verify data integrity',
    status: 'in-progress',
    priority: 'high',
    project: 'Infrastructure',
    dueDate: '2025-01-18',
    createdAt: '2025-01-09T08:00:00Z',
    updatedAt: '2025-01-13T10:15:00Z'
  },
  {
    id: generateId(),
    title: 'Grocery shopping',
    description: 'Buy ingredients for meal prep this week',
    status: 'todo',
    priority: 'low',
    project: 'Personal',
    dueDate: '2025-01-16',
    createdAt: '2025-01-12T18:00:00Z',
    updatedAt: '2025-01-12T18:00:00Z'
  }
];