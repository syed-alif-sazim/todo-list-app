import { useState } from 'react';
import { ITaskItemProps } from './TaskItem.interfaces';


export const TaskItem: React.FC<ITaskItemProps> = ({ task }) => {

  return (
    <li className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
        <span
          className={`cursor-pointer text-gray-700 ${task.isCompleted ? 'line-through text-gray-400' : ''}`}
        >
          {task.description}
        </span>
    </li>
  );
};
