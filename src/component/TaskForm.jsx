import React, { useState } from "react";

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !time) {
      alert("Por favor completa todos los campos.");
      return;
    }

    onAddTask({
      id: Date.now(),
      title,
      date,
      time,
      completed: false,
    });

    setTitle("");
    setDate("");
    setTime("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <input
        type="text"
        placeholder="Título de la tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "0.5rem",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "1rem",
        }}
      />
      <div style={{ display: "flex", gap: "1rem", marginBottom: "0.5rem" }}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ flex: 1, padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{ flex: 1, padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }}
        />
      </div>
      <button
        type="submit"
        style={{
          backgroundColor: "#a3d2ca",
          color: "#317773",
          border: "none",
          borderRadius: "5px",
          padding: "0.7rem 1.5rem",
          fontWeight: "bold",
          cursor: "pointer",
          width: "100%",
        }}
      >
        Agregar Tarea
      </button>
    </form>
  );
}
