import { useState, useEffect } from 'react';
import { TaskInput } from '../../components/TaskInput';
import { TaskList } from '../../components/TaskList';
import { z } from 'zod';
import { ITask } from './TodoPage.interfaces';
import { fetchTasks } from './TodoPage.helpers';


export const TodoPage = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);

    const handleAddTask = (task: string) => {
      const newTaskObj = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        description: task,
        isCompleted: false,
      };
      setTasks([...tasks, newTaskObj]);
    };

    useEffect(() => {
      fetchTasks(setTasks)
    }, []);

    const handleDeleteTask = (id: number) => {
      setTasks(tasks.filter(task => task.id !== id));
    };

    const handleEditTask = (task: { id: number; description: string }) => {
      setTasks(
        tasks.map(existingTask =>
          existingTask.id === task.id ? { ...existingTask, description: task.description } : existingTask
        )
      );
    };

    const handleToggleComplete = (taskId: number) => {
      setTasks(
        tasks.map(task =>
          task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
        )
      );
    };

    return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mt-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">To-Do List</h1>
                <TaskInput onAddTask={handleAddTask} />
                <TaskList tasks={tasks} onDelete={handleDeleteTask} onEdit={handleEditTask} onToggleComplete={handleToggleComplete}/>
        </div>
    </div>
    );
};
