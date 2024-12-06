import { useState } from 'react';
import { ITaskItemProps } from './TaskItem.interfaces';


export const TaskItem: React.FC<ITaskItemProps> = ({ task, onDelete }) => {

  return (
    <li className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
        <span
          className={`cursor-pointer text-gray-700 ${task.isCompleted ? 'line-through text-gray-400' : ''}`}
        >
          {task.description}
        </span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onDelete(task.id)}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
          Delete
        </button>
      </div>
    </li>
  );
};
