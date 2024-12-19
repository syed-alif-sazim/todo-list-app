export interface ITaskListProps {
    tasks: { id: number; description: string; is_completed: boolean }[];
    onDelete: (id: number) => void;
    onEdit: (task: { id: number; description: string }) => void;
    onToggleComplete: (id: number) => void;
}
  