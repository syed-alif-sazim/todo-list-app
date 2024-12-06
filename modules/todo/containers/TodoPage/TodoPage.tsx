import { useState, useEffect } from 'react';
import { TaskInput } from '../../components/TaskInput';
import { TaskList } from '../../components/TaskList';
import { loadTasksFromLocalStorage, saveTasksToLocalStorage } from '../../utils';


export const TodoPage = () => {
    const [tasks, setTasks] = useState<{ id: number; description: string; isCompleted: boolean }[]>([]);

    useEffect(() => {
      const storedTasks = loadTasksFromLocalStorage();
      if (storedTasks && storedTasks.length > 0) {
        setTasks(storedTasks);
      } else {
        const dummyTasks = [
          { id: 1, description: 'Read Next.js 13 docs', isCompleted: false },
          { id: 2, description: 'Build a To-Do App', isCompleted: true },
        ];
        setTasks(dummyTasks);
        saveTasksToLocalStorage(dummyTasks);  // Save dummy tasks to local storage
      }
    }, []);

    useEffect(() => {
      saveTasksToLocalStorage(tasks);
    }, [tasks]);
  
    const handleAddTask = (task: string) => {
      const newTaskObj = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        description: task,
        isCompleted: false,
      };
      setTasks([...tasks, newTaskObj]);
    };

    const handleDeleteTask = (id: number) => {
      setTasks(tasks.filter(task => task.id !== id));
    };

    return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mt-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">To-Do List</h1>
                <TaskInput onAddTask={handleAddTask} />
                <TaskList tasks={tasks} onDelete={handleDeleteTask}/>
        </div>
    </div>
    );
};
