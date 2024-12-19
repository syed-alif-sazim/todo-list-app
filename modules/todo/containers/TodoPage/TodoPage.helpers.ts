import axios from 'axios';
import { ITask } from './TodoPage.interfaces';

export const fetchTasks = async (setTasks: React.Dispatch<React.SetStateAction<ITask[]>>) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BE_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
};