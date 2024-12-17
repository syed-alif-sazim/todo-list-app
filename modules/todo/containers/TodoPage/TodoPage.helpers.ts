import axios from 'axios';
import { ITask } from './TodoPage.interfaces';

const API_URL = process.env.NEXT_PUBLIC_BE_URL|| '';

export const fetchTasks = async (setTasks: React.Dispatch<React.SetStateAction<ITask[]>>) => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
};

export const handleAddTask = async (task: string, setTasks: React.Dispatch<React.SetStateAction<ITask[]>>) => {
  const newTaskObj = {
    description: task,
    isCompleted: false,
  };
  try {
    const response = await axios.post(`${API_URL}/tasks`, newTaskObj);
    fetchTasks(setTasks)
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

export const handleDeleteTask = async (id: number, setTasks: React.Dispatch<React.SetStateAction<ITask[]>>) => {
  try {
    await axios.delete(`${API_URL}/tasks/${id}`);
    fetchTasks(setTasks)
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

export const handleEditTask = async (task: { id: number; description: string }, setTasks: React.Dispatch<React.SetStateAction<ITask[]>>) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${task.id}`, { description: task.description });
    fetchTasks(setTasks)
  } catch (error) {
    console.error('Error editing task:', error);
  }
};

export const handleToggleComplete = async (taskId: number, setTasks: React.Dispatch<React.SetStateAction<ITask[]>>) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/toggle/${taskId}`);
    fetchTasks(setTasks)
  } catch (error) {
    console.error('Error toggling task completion:', error);
  }
};