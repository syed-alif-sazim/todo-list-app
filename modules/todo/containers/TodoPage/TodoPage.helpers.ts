import axios from 'axios';
import { ITask } from './TodoPage.interfaces';

const API_URL = process.env.NEXT_PUBLIC_BE_URL|| '';

export const fetchTasks = async (dispatch: React.Dispatch<any>) => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      response.data.forEach((task: any) => {
        dispatch({ type: 'ADD_TASK', payload: task });
      });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
};

export const handleAddTask = async (task: string, dispatch: React.Dispatch<any>) => {
  const newTaskObj = {
    description: task,
    isCompleted: false,
  };
  try {
    const response = await axios.post(`${API_URL}/tasks`, newTaskObj);
    dispatch({ type: 'ADD_TASK', payload: response.data });
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

export const handleDeleteTask = async (id: number, dispatch: React.Dispatch<any>) => {
  try {
    await axios.delete(`${API_URL}/tasks/${id}`);
    dispatch({ type: 'DELETE_TASK', payload: id });
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

export const handleEditTask = async (task: { id: number; description: string },dispatch: React.Dispatch<any>) => {
  const updatedTaskObj = {
    id: task.id,
    description: task.description
  };
  try {
    const response = await axios.put(`${API_URL}/tasks/${updatedTaskObj.id}`, updatedTaskObj);
    dispatch({ type: 'EDIT_TASK', payload: response.data });
  } catch (error) {
    console.error('Error editing task:', error);
  }
};

export const handleToggleComplete = async (taskId: number, dispatch: React.Dispatch<any>) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/toggle/${taskId}`);
    dispatch({ type: 'TOGGLE_COMPLETE', payload: taskId });
  } catch (error) {
    console.error('Error toggling task completion:', error);
  }
};