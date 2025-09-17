import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Task } from '../types';
import { TaskCard } from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdateTask, onDeleteTask }) => {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
        <p className="text-gray-500">Create your first task or adjust your filters to see tasks here.</p>
      </div>
    );
  }

  // Group tasks by status
  const todoTasks = tasks.filter(t => t.status === 'todo');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  const TaskSection: React.FC<{ title: string; tasks: Task[]; icon: React.ReactNode; color: string }> = 
    ({ title, tasks, icon, color }) => {
      if (tasks.length === 0) return null;
      
      return (
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center`}>
              {icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              {title} <span className="text-sm font-normal text-gray-500">({tasks.length})</span>
            </h3>
          </div>
          <div className="grid gap-4">
            {tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onUpdate={onUpdateTask}
                onDelete={onDeleteTask}
              />
            ))}
          </div>
        </div>
      );
    };

  return (
    <div className="space-y-8">
      <TaskSection
        title="To Do"
        tasks={todoTasks}
        icon={<Clock size={16} className="text-gray-600" />}
        color="bg-gray-100"
      />
      
      <TaskSection
        title="In Progress"
        tasks={inProgressTasks}
        icon={<AlertCircle size={16} className="text-blue-600" />}
        color="bg-blue-100"
      />
      
      <TaskSection
        title="Completed"
        tasks={completedTasks}
        icon={<CheckCircle size={16} className="text-green-600" />}
        color="bg-green-100"
      />
    </div>
  );
};