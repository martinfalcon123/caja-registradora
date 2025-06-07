import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [date, setDate] = useState("");

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
    onSearch(e.target.value, date);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    onSearch(keyword, e.target.value);
  };

  const handleClear = () => {
    setKeyword("");
    setDate("");
    onSearch("", "");
  };

  return (
    <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
      <input
        type="text"
        placeholder="Buscar por palabra clave..."
        value={keyword}
        onChange={handleKeywordChange}
        style={{
          padding: "0.5rem",
          width: "40%",
          marginRight: "1rem",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      <input
        type="date"
        value={date}
        onChange={handleDateChange}
        style={{
          padding: "0.5rem",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      <button
        onClick={handleClear}
        style={{
          marginLeft: "1rem",
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#e07a5f",
          color: "white",
          cursor: "pointer",
        }}
      >
        Limpiar
      </button>
    </div>
  );
}
