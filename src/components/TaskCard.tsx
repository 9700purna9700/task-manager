import React, { useState } from 'react';
import { Calendar, Clock, Edit2, Trash2, Check, X } from 'lucide-react';
import { Task, TaskStatus, TaskPriority } from '../types';
import { formatDate, isOverdue, getPriorityColor, getStatusColor } from '../utils/taskUtils';

interface TaskCardProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(task.id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
        updatedAt: new Date().toISOString()
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  };

  const handleStatusChange = (status: TaskStatus) => {
    onUpdate(task.id, { status, updatedAt: new Date().toISOString() });
  };

  const handlePriorityChange = (priority: TaskPriority) => {
    onUpdate(task.id, { priority, updatedAt: new Date().toISOString() });
  };

  const overdue = task.dueDate && isOverdue(task.dueDate);

  return (
    <div className={`bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 
      ${task.status === 'completed' ? 'opacity-75' : ''} 
      ${overdue && task.status !== 'completed' ? 'ring-2 ring-red-200 border-red-200' : 'border-gray-200'}`}>
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3 flex-1">
            <button
              onClick={() => handleStatusChange(task.status === 'completed' ? 'todo' : 'completed')}
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
                ${task.status === 'completed' 
                  ? 'bg-green-500 border-green-500' 
                  : 'border-gray-300 hover:border-green-400'}`}
            >
              {task.status === 'completed' && <Check size={12} className="text-white" />}
            </button>
            
            {isEditing ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="flex-1 text-lg font-semibold bg-gray-50 border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                autoFocus
              />
            ) : (
              <h3 className={`text-lg font-semibold text-gray-800 flex-1 
                ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                {task.title}
              </h3>
            )}
          </div>

          <div className="flex items-center space-x-2 ml-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors duration-200"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-colors duration-200"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
                >
                  <Trash2 size={16} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Description */}
        {(task.description || isEditing) && (
          <div className="mb-4">
            {isEditing ? (
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full text-sm text-gray-600 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={2}
                placeholder="Add a description..."
              />
            ) : (
              <p className={`text-sm text-gray-600 ${task.status === 'completed' ? 'line-through' : ''}`}>
                {task.description}
              </p>
            )}
          </div>
        )}

        {/* Meta information */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Status */}
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
              className={`text-xs font-medium px-2 py-1 rounded-full border cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none ${getStatusColor(task.status)}`}
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            {/* Priority */}
            <select
              value={task.priority}
              onChange={(e) => handlePriorityChange(e.target.value as TaskPriority)}
              className={`text-xs font-medium px-2 py-1 rounded-full border cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none ${getPriorityColor(task.priority)}`}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>

            {/* Project */}
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
              {task.project}
            </span>
          </div>

          {/* Due Date */}
          {task.dueDate && (
            <div className={`flex items-center space-x-1 text-xs ${overdue && task.status !== 'completed' ? 'text-red-600' : 'text-gray-500'}`}>
              <Calendar size={12} />
              <span className={overdue && task.status !== 'completed' ? 'font-medium' : ''}>
                {formatDate(task.dueDate)}
              </span>
              {overdue && task.status !== 'completed' && <Clock size={12} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};