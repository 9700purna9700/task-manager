import React, { useState, useEffect, useMemo } from 'react';
import { CheckSquare } from 'lucide-react';
import { Task, FilterState, TaskFormData } from './types';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { FilterBar } from './components/FilterBar';
import { generateId, filterTasks, sortTasks } from './utils/taskUtils';
import { loadTasks, saveTasks } from './utils/storage';
import { mockTasks } from './data/mockTasks';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterState>({
    search: '',
    status: 'all',
    priority: 'all',
    project: 'all',
    dueDateFilter: 'all'
  });

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = loadTasks();
    if (savedTasks.length > 0) {
      setTasks(savedTasks);
    } else {
      // If no saved tasks, use mock data for demonstration
      setTasks(mockTasks);
      saveTasks(mockTasks);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      saveTasks(tasks);
    }
  }, [tasks]);

  // Get unique projects
  const projects = useMemo(() => {
    const projectSet = new Set(tasks.map(task => task.project));
    return Array.from(projectSet).sort();
  }, [tasks]);

  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    const filtered = filterTasks(tasks, filter);
    return sortTasks(filtered);
  }, [tasks, filter]);

  // Calculate task counts
  const taskCounts = useMemo(() => {
    return {
      total: tasks.length,
      completed: tasks.filter(t => t.status === 'completed').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      todo: tasks.filter(t => t.status === 'todo').length
    };
  }, [tasks]);

  const handleCreateTask = (formData: TaskFormData) => {
    const newTask: Task = {
      id: generateId(),
      ...formData,
      status: 'todo',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setTasks(prev => [newTask, ...prev]);
  };

  const handleUpdateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <CheckSquare size={24} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
              TaskFlow
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Streamline your productivity with our comprehensive task management solution. 
            Organize, prioritize, and track your progress with ease.
          </p>
        </header>

        <div className="space-y-8">
          {/* Task Creation Form */}
          <TaskForm 
            onSubmit={handleCreateTask} 
            projects={projects.length > 0 ? projects : ['Personal', 'Work']}
          />

          {/* Filters and Stats */}
          <FilterBar
            filter={filter}
            onFilterChange={setFilter}
            projects={projects}
            taskCounts={taskCounts}
          />

          {/* Results Summary */}
          {filter.search || filter.status !== 'all' || filter.priority !== 'all' || 
           filter.project !== 'all' || filter.dueDateFilter !== 'all' ? (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-blue-800">
                Showing <span className="font-semibold">{filteredTasks.length}</span> of{' '}
                <span className="font-semibold">{tasks.length}</span> tasks
                {filter.search && ` matching "${filter.search}"`}
              </p>
            </div>
          ) : null}

          {/* Task List */}
          <TaskList
            tasks={filteredTasks}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500">
          <p>Built with React, TypeScript, and Tailwind CSS • Data stored locally in your browser</p>
        </footer>
      </div>
    </div>
  );
}

export default App;