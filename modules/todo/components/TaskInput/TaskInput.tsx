import { useState } from 'react';
import { ITaskInputProps } from './TaskInput.interfaces';
import { TaskSchema } from './TaskInput.helpers';
import { z } from 'zod';

export const TaskInput: React.FC<ITaskInputProps> = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAddTask = async () => {
    try {
      TaskSchema.parse(newTask);
      await onAddTask(newTask);
      setNewTask('');
      setError(null);
    } catch (e) {
      if (e instanceof z.ZodError) {
        const errorMessage = e.errors.map((err) => err.message).join(', ');
        setError(errorMessage);
      }
    }
  };

  return (
    <div className='mb-2'>
      <div className="flex mb-2">
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
      {error && (
        <div className="mt-2 text-red-500 text-sm">{error}</div>
      )}
    </div>
  );
};
