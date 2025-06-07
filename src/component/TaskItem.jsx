export default function TaskItem({ task, onToggleComplete, onDelete }) {
  const taskDate = new Date(task.dateTime).toLocaleString();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "0.7rem",
        padding: "0.5rem",
        borderRadius: "5px",
        backgroundColor: task.completed ? "#d4edda" : "#f8f9fa",
        border: "1px solid #ccc",
      }}
    >
      <div style={{ flex: 1 }}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          style={{ marginRight: "0.7rem" }}
        />
        <strong
          style={{
            textDecoration: task.completed ? "line-through" : "none",
            color: task.completed ? "#6c757d" : "#212529",
          }}
        >
          {task.title}
        </strong>
        <div style={{ fontSize: "0.85rem", color: "#495057" }}>{taskDate}</div>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        style={{
          backgroundColor: "#e07a5f",
          border: "none",
          borderRadius: "5px",
          color: "white",
          padding: "0.3rem 0.6rem",
          cursor: "pointer",
          fontWeight: "bold",
          marginLeft: "1rem",
        }}
      >
        🗑️
      </button>
    </div>
  );
}
