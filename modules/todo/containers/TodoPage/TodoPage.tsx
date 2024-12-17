import { useState, useEffect } from 'react';
import { TaskInput } from '../../components/TaskInput';
import { TaskList } from '../../components/TaskList';
import { z } from 'zod';
import { ITask } from './TodoPage.interfaces';
import { fetchTasks, handleAddTask, handleDeleteTask, handleEditTask, handleToggleComplete } from './TodoPage.helpers';
import axios from 'axios';


export const TodoPage = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);

    useEffect(() => {
      fetchTasks(setTasks)
    }, []);

    return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mt-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">To-Do List</h1>
                <TaskInput onAddTask={(task) => handleAddTask(task, setTasks)}/>
                <TaskList tasks={tasks} onDelete={(id) => handleDeleteTask(id, setTasks)}  onEdit={(task) => handleEditTask(task, setTasks)} onToggleComplete={(taskId) => handleToggleComplete(taskId, setTasks)}/>
        </div>
    </div>
    );
};
