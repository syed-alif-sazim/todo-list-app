import { useState, useEffect, useReducer } from 'react';
import { TaskInput } from '../../components/TaskInput';
import { TaskList } from '../../components/TaskList';
import { z } from 'zod';
import { ITask } from './TodoPage.interfaces';
import { fetchTasks, handleAddTask, handleDeleteTask, handleEditTask, handleToggleComplete } from './TodoPage.helpers';
import axios from 'axios';

const initialState: ITask[] = [];

const taskReducer = (state: ITask[], action: { type: string; payload: any }) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.payload];
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.payload);
    case 'EDIT_TASK':
      return state.map(task =>
        task.id === action.payload.id ? { ...task, ...action.payload } : task
      );
    case 'TOGGLE_COMPLETE':
      return state.map(task =>
        task.id === action.payload ? { ...task, isCompleted: !task.isCompleted } : task
      );
    default:
      return state;
  }
};

export const TodoPage = () => {
    const [tasks, dispatch] = useReducer(taskReducer, initialState);

    useEffect(() => {
      fetchTasks(dispatch)
    }, []);

    return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mt-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">To-Do List</h1>
            <TaskInput onAddTask={(task) => handleAddTask(task, dispatch)} />
            <TaskList
            tasks={tasks}
            onDelete={(id) => handleDeleteTask(id, dispatch)}
            onEdit={(task) => handleEditTask(task, dispatch)}
            onToggleComplete={(taskId) => handleToggleComplete(taskId, dispatch)}
            />
        </div>
    </div>
    );
};
