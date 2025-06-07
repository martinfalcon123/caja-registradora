// src/App.jsx
import React, { useState, useEffect } from "react";
import TaskList from "./component/TaskList";
import TaskForm from "./component/TaskForm";

function App() {
  // Estado principal para tareas
  const [tasks, setTasks] = useState(() => {
    // Cargar tareas guardadas en localStorage o iniciar vacío
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // Guardar tareas en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Programar notificación 30 minutos antes de la tarea
  const scheduleNotification = (task) => {
    const taskDateTime = new Date(`${task.date}T${task.time}`);
    const notifyBeforeMs = 30 * 60 * 1000; // 30 minutos antes

    const notifyTime = taskDateTime.getTime() - notifyBeforeMs;
    const now = Date.now();

    const delay = notifyTime - now;

    if (delay > 0) {
      setTimeout(() => {
        if (Notification.permission === "granted") {
          new Notification("Recordatorio de tarea", {
            body: `${task.title} a las ${task.time}`,
            icon: "/icon-192.png", // pon un icono aquí
          });
        }
      }, delay);
    }
  };

  // Agregar nueva tarea + notificación
  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
    scheduleNotification(task);
  };

  // Marcar tarea como completada o no
  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Eliminar tarea
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Solicitar permiso de notificaciones al cargar app
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial" }}>
      <h1>Agenda de Tareas</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList tasks={tasks} onToggleComplete={toggleComplete} onDelete={deleteTask} />
    </div>
  );
}

export default App;
