import { useState, useEffect } from 'react';
import { TaskInput } from '../../components/TaskInput';
import { TaskList } from '../../components/TaskList';
import { z } from 'zod';
import { ITask } from './TodoPage.interfaces';
import { fetchTasks } from './TodoPage.helpers';
import axios from 'axios';


export const TodoPage = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);

    const handleAddTask = async (task: string) => {
      const newTaskObj = {
        description: task,
        isCompleted: false,
      };
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BE_URL}/tasks`, newTaskObj);
        fetchTasks(setTasks)
      } catch (error) {
        console.error('Error adding task:', error);
      }
    };

    useEffect(() => {
      fetchTasks(setTasks)
    }, []);

    const handleDeleteTask = async (id: number) => {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_BE_URL}/tasks/${id}`);
        fetchTasks(setTasks)
      } catch (error) {
        console.error('Error deleting task:', error);
      }
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
