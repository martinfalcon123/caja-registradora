import React from "react";

export default function listaProducto({ products, onAddToCart }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: "1rem", marginBottom: "2rem" }}>
      {products.map(({ id, name, price, stock }) => (
        <div
          key={id}
          className="product-card"
          style={{
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "10px",
            backgroundColor: "#f5f5f5",
            textAlign: "center",
            boxShadow: "2px 2px 5px rgba(0,0,0,0.1)"
          }}
        >
          <h3>{name}</h3>
          <p>Precio: ${price.toFixed(2)}</p>
          <p>Stock: {stock}</p>
          <button
            className="btn-add"
            onClick={() => onAddToCart({ id, name, price, stock })}
            style={{
              backgroundColor: "#a3d2ca",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              cursor: stock > 0 ? "pointer" : "not-allowed",
              color: stock > 0 ? "#000" : "#888",
              fontWeight: "bold"
            }}
            disabled={stock === 0}
          >
            Agregar
          </button>
        </div>
      ))}
    </div>
  );
}
