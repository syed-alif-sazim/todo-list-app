import { useState } from 'react';
import { ITaskInputProps } from './TaskInput.interfaces';

export const TaskInput: React.FC<ITaskInputProps> = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (!newTask) return;
    onAddTask(newTask);
    setNewTask('');
  };

  return (
    <div className="flex mb-4">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
        className="flex-grow border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleAddTask}
        className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
      >
        Add Task
      </button>
    </div>
  );
};
