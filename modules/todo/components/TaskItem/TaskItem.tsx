import { useState } from 'react';
import { ITaskItemProps } from './TaskItem.interfaces';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';


export const TaskItem: React.FC<ITaskItemProps> = ({ task, onDelete, onEdit, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSaveEdit = () => {
    if (editedDescription.trim()) {
      onEdit({ id: task.id, description: editedDescription });
      setIsEditing(false); 
    }
  };

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length <= maxLength) return description;
    return `${description.slice(0, maxLength)}... `;
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
        <input
          type="text"
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className="mr-4 p-1 border border-gray-300 rounded"
        />
      ) : (
        <span
          className={`cursor-pointer text-gray-700 ${task.isCompleted ? 'line-through text-gray-400' : ''}`}
          style={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            flexGrow: 1,
          }}
        >
          {truncateDescription(task.description, 100)}
          {task.description.length > 100 && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <button className="text-blue-500 hover:underline">Read more</button>
              </DialogTrigger>
              <DialogContent
                style={{
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  maxHeight: '400px',
                  overflowY: 'auto', 
                }}>
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
