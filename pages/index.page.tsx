import { useState, useEffect } from 'react';

export default function Home() {

  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mt-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">To-Do List</h1>
      </div>
    </div>
  );
}
