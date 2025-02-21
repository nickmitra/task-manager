import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

// WebSocket Connection
const socket = io("http://localhost:3000");

export default function TaskDashboard() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks when the component loads
  useEffect(() => {
    async function fetchTasks() {
      const response = await axios.get("http://localhost:3000/api/tasks");
      setTasks(response.data);
    }
    fetchTasks();
  }, []);

  // Listen for real-time updates
  useEffect(() => {
    socket.on("taskUpdated", (newTask) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    });

    return () => {
      socket.off("taskUpdated"); // Cleanup listener on unmount
    };
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📋 Task Dashboard</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 bg-white shadow-md rounded-lg border-l-4 border-blue-500 transition duration-300 hover:scale-105">
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
