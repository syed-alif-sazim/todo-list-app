export interface ITaskItemProps {
    task: { id: number; description: string; isCompleted: boolean };
    onDelete: (id: number) => void;
}