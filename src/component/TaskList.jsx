import React from "react";

export default function TaskList({ tasks, onToggleComplete, onDelete }) {
  if (tasks.length === 0) return <p>No hay tareas para mostrar.</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {tasks.map(({ id, title, date, time, completed }) => (
        <li
          key={id}
          style={{
            background: completed ? "#d3f8d3" : "#f9f9f9",
            padding: "0.8rem",
            marginBottom: "0.7rem",
            borderRadius: "6px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <div>
            <strong style={{ textDecoration: completed ? "line-through" : "none" }}>
              {title}
            </strong>
            <br />
            <small>
              {date} - {time}
            </small>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={() => onToggleComplete(id)}
              style={{
                backgroundColor: completed ? "#6bc36b" : "#ccc",
                border: "none",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                cursor: "pointer",
              }}
              title={completed ? "Marcar como no completada" : "Marcar como completada"}
            >
              ✓
            </button>
            <button
              onClick={() => onDelete(id)}
              style={{
                backgroundColor: "#f28b82",
                border: "none",
                borderRadius: "4px",
                padding: "0 0.5rem",
                cursor: "pointer",
                color: "#fff",
              }}
              title="Eliminar tarea"
            >
              🗑️
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
