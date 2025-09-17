import React from 'react';
import { Search, Filter, Calendar, Flag } from 'lucide-react';
import { FilterState, TaskStatus, TaskPriority } from '../types';

interface FilterBarProps {
  filter: FilterState;
  onFilterChange: (filter: FilterState) => void;
  projects: string[];
  taskCounts: {
    total: number;
    completed: number;
    inProgress: number;
    todo: number;
  };
}

export const FilterBar: React.FC<FilterBarProps> = ({ filter, onFilterChange, projects, taskCounts }) => {
  const updateFilter = (updates: Partial<FilterState>) => {
    onFilterChange({ ...filter, ...updates });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={filter.search}
          onChange={(e) => updateFilter({ search: e.target.value })}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{taskCounts.total}</div>
          <div className="text-sm text-blue-600">Total Tasks</div>
        </div>
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-3 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">{taskCounts.todo}</div>
          <div className="text-sm text-yellow-600">To Do</div>
        </div>
        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-3 rounded-lg">
          <div className="text-2xl font-bold text-indigo-600">{taskCounts.inProgress}</div>
          <div className="text-sm text-indigo-600">In Progress</div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{taskCounts.completed}</div>
          <div className="text-sm text-green-600">Completed</div>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Filter size={16} className="inline mr-1" />
            Status
          </label>
          <select
            value={filter.status}
            onChange={(e) => updateFilter({ status: e.target.value as TaskStatus | 'all' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          >
            <option value="all">All Statuses</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Flag size={16} className="inline mr-1" />
            Priority
          </label>
          <select
            value={filter.priority}
            onChange={(e) => updateFilter({ priority: e.target.value as TaskPriority | 'all' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Project Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project
          </label>
          <select
            value={filter.project}
            onChange={(e) => updateFilter({ project: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          >
            <option value="all">All Projects</option>
            {projects.map(project => (
              <option key={project} value={project}>{project}</option>
            ))}
          </select>
        </div>

        {/* Due Date Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar size={16} className="inline mr-1" />
            Due Date
          </label>
          <select
            value={filter.dueDateFilter}
            onChange={(e) => updateFilter({ dueDateFilter: e.target.value as FilterState['dueDateFilter'] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          >
            <option value="all">All Dates</option>
            <option value="overdue">Overdue</option>
            <option value="today">Due Today</option>
            <option value="week">Due This Week</option>
          </select>
        </div>
      </div>
    </div>
  );
};