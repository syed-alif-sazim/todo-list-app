import { ITask } from "./localStorage.interfaces";

export const loadTasksFromLocalStorage = () => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : null;
  };
  
export const saveTasksToLocalStorage = (tasks: ITask[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};
  