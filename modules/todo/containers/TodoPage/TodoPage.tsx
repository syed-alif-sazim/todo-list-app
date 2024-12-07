import { useState, useEffect } from 'react';
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
        saveTasksToLocalStorage(dummyTasks);  
      }
    }, []);

    return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mt-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">To-Do List</h1>
                <TaskList tasks={tasks}/>
        </div>
    </div>
    );
};
