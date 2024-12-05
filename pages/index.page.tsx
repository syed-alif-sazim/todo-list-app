import { useState, useEffect } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState<{ id: number; description: string; isCompleted: boolean }[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      const dummyTasks = [
        { id: 1, description: 'Read Next.js 13 docs', isCompleted: false },
        { id: 2, description: 'Build a To-Do App', isCompleted: true },
      ];
      setTasks(dummyTasks);
      localStorage.setItem('tasks', JSON.stringify(dummyTasks));
    }
  }, []);

  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mt-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">To-Do List</h1>
        <ul className="space-y-4">
          {tasks.map(task => (
            <li
              key={task.id}
              className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
            >
                <span
                  className={`cursor-pointer text-gray-700 ${
                    task.isCompleted ? 'line-through text-gray-400' : ''
                  }`}
                >
                  {task.description}
                </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
