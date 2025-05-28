import { useState } from "react";

export default function ProductForm({ onAddProduct }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !price || !stock) {
      alert("Por favor completa todos los campos");
      return;
    }

    if (isNaN(price) || isNaN(stock)) {
      alert("Precio y stock deben ser números válidos");
      return;
    }

    onAddProduct({
      id: Date.now(),
      name: name.trim(),
      price: parseFloat(price),
      stock: parseInt(stock, 10),
    });

    // Limpiar campos
    setName("");
    setPrice("");
    setStock("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Nombre del producto"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        min="0"
        step="0.01"
        required
      />
      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        min="0"
        required
      />
      <button type="submit">Agregar producto</button>
    </form>
  );
}
