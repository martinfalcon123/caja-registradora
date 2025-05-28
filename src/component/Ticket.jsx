import React, { useState } from "react";

export default function Ticket({ cartItems, onClose }) {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState(null);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const generateTicketText = () => {
    let text = "----- TICKET DE COMPRA -----\n\n";
    cartItems.forEach(({ name, quantity, price }) => {
      text += `${name} x${quantity}  $${(price * quantity).toFixed(2)}\n`;
    });
    text += `\nTOTAL: $${total.toFixed(2)}\n`;
    text += "---------------------------\n";
    text += "¡Gracias por su compra!";
    return text;
  };

  const handleSendEmail = () => {
    if (!email) {
      setMessage("Por favor ingrese un email válido.");
      return;
    }

    setSending(true);
    setMessage(null);

    setTimeout(() => {
      setSending(false);
      setMessage(`Ticket enviado a ${email} ✅`);
      setEmail("");
    }, 2000);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "10%",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#fef6f0",
        border: "2px solid #a3d2ca",
        borderRadius: "10px",
        padding: "1rem",
        width: "320px",
        boxShadow: "0 0 15px rgba(0,0,0,0.3)",
        fontFamily: "monospace",
        zIndex: 1000,
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "1rem", color: "#317773" }}>
        🧾 Ticket de Compra
      </h3>

      <pre
        style={{
          whiteSpace: "pre-wrap",
          marginBottom: "1rem",
          borderTop: "1px dashed #317773",
          borderBottom: "1px dashed #317773",
          padding: "0.5rem 0",
        }}
      >
        {generateTicketText()}
      </pre>

      <input
        type="email"
        placeholder="Ingrese email para enviar"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "0.5rem",
          borderRadius: "5px",
          border: "1px solid #a3d2ca",
          fontFamily: "monospace",
        }}
      />

      <button
        onClick={handleSendEmail}
        disabled={sending}
        style={{
          width: "100%",
          padding: "0.5rem",
          backgroundColor: "#a3d2ca",
          color: "#317773",
          border: "none",
          borderRadius: "5px",
          cursor: sending ? "not-allowed" : "pointer",
          fontWeight: "bold",
          marginBottom: "0.5rem",
        }}
      >
        {sending ? "Enviando..." : "Enviar por Email"}
      </button>

      {message && (
        <p
          style={{
            marginTop: "0.5rem",
            color: message.includes("✅") ? "green" : "red",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {message}
        </p>
      )}

      <button
        onClick={onClose}
        style={{
          marginTop: "1rem",
          width: "100%",
          padding: "0.5rem",
          backgroundColor: "#f44336",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Cerrar
      </button>
    </div>
  );
}
