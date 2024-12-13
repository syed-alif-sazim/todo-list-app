import { useState } from 'react';
import { ITaskItemProps } from './TaskItem.interfaces';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TaskSchema } from './TaskItem.helpers'; 
import { z } from 'zod';
import { truncateDescription } from './TaskItem.helpers';


export const TaskItem: React.FC<ITaskItemProps> = ({ task, onDelete, onEdit, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null); 

  const handleSaveEdit = () => {
    try {
      TaskSchema.parse(editedDescription);
      onEdit({ id: task.id, description: editedDescription });
      setIsEditing(false);
      setError(null);
    } catch (e) {
      if (e instanceof z.ZodError) {
        const errorMessage = e.errors.map((err) => err.message).join(', ');
        setError(errorMessage);
      }
    }
  };

  return (
    <li className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => onToggleComplete(task.id)}
        className="mr-4"
      />
      {isEditing ? (
        <div className="flex flex-col">
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="mr-4 p-1 border border-gray-300 rounded"
          />
          {error && (
            <div className="mt-2 text-red-500 text-sm">{error}</div> 
          )}
      </div>
      ) : (
        <span
          className={`whitespace-pre-wrap break-words overflow-clip flex-grow break-all cursor-pointer text-gray-700 ${task.isCompleted ? 'line-through text-gray-400' : ''}`}>
          {truncateDescription(task.description)}
          {task.description.length > 100 && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <button className="text-blue-500 hover:underline">Read more</button>
              </DialogTrigger>
              <DialogContent className="whitespace-pre-wrap break-words break-all overflow-clip max-h-[400px] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Task Description</DialogTitle>
                </DialogHeader>
                <p>{task.description}</p>
              </DialogContent>
            </Dialog>
          )}
        </span>
      )}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
        {!task.isCompleted && (
          isEditing ? (
            <button
              onClick={handleSaveEdit}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Edit
            </button>
          )
        )}
      </div>
    </li>
  );
};
