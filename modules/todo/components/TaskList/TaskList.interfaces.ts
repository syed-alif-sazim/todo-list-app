export interface ITaskListProps {
    tasks: { id: number; description: string; isCompleted: boolean }[];
    onDelete: (id: number) => void;
}
  