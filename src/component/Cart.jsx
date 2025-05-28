import React from "react";

export default function Cart({ cartItems, onRemoveFromCart }) {
  if (cartItems.length === 0) return <p>El carrito está vacío.</p>;

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      style={{
        borderTop: "2px solid #a3d2ca",
        paddingTop: "1rem",
        marginBottom: "1rem",
      }}
    >
      <h2>Carrito de Compras</h2>
      {cartItems.map(({ id, name, price, quantity }) => (
        <div
          key={id}
          style={{
            marginBottom: "0.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <strong>{name}</strong> - ${price.toFixed(2)} x {quantity}
          </div>
          <button
            onClick={() => onRemoveFromCart(id)}
            style={{
              marginLeft: "1rem",
              backgroundColor: "#f44336",
              border: "none",
              color: "#fff",
              borderRadius: "5px",
              padding: "0.3rem 0.7rem",
              cursor: "pointer",
            }}
          >
            Quitar
          </button>
        </div>
      ))}
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
}
