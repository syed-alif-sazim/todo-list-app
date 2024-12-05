export const loadTasksFromLocalStorage = () => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : null;
  };
  
export const saveTasksToLocalStorage = (tasks: any[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};
  