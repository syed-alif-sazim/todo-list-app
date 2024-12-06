import { TaskItem } from '../TaskItem';
import { ITaskListProps } from './TaskList.interfaces';

export const TaskList: React.FC<ITaskListProps> = ({ tasks, onDelete, onEdit}) => {
  return (
    <ul className="space-y-4">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};
