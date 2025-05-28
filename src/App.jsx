import React, { useState, useEffect } from "react";
import ProductList from "./component/listaProducto";
import Cart from "./component/Cart";
import Ticket from "./component/Ticket";


const initialProducts = [
  { id: 1, name: "Remera", price: 1200, stock: 10 },
  { id: 2, name: "Pantalón", price: 2500, stock: 5 },
  { id: 3, name: "Campera", price: 4200, stock: 3 },
  { id: 4, name: "Zapatillas", price: 5500, stock: 7 },
];

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [cartItems, setCartItems] = useState(() => {
    // Cargar carrito guardado en localStorage al iniciar
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  const [showTicket, setShowTicket] = useState(false);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product) => {
    // Solo agregar si hay stock disponible
    const productInStock = products.find(p => p.id === product.id);
    if (!productInStock || productInStock.stock === 0) return;

    // Actualizar carrito
    setCartItems((prev) => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        // Si ya está en carrito, sumo cantidad pero sin superar stock
        return prev.map(item =>
          item.id === product.id && item.quantity < productInStock.stock
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si no está, agregar nuevo con cantidad 1
        return [...prev, { ...product, quantity: 1 }];
      }
    });

    // Reducir stock en productos
    setProducts((prev) =>
      prev.map(p =>
        p.id === product.id && p.stock > 0
          ? { ...p, stock: p.stock - 1 }
          : p
      )
    );
  };

  const handleRemoveFromCart = (id) => {
    // Buscar item a remover para liberar stock
    const itemToRemove = cartItems.find(item => item.id === id);
    if (!itemToRemove) return;

    // Actualizar carrito: disminuir cantidad o eliminar
    setCartItems((prev) => {
      const item = prev.find(i => i.id === id);
      if (item.quantity === 1) {
        return prev.filter(i => i.id !== id);
      } else {
        return prev.map(i =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
    });

    // Aumentar stock en productos
    setProducts((prev) =>
      prev.map(p =>
        p.id === id
          ? { ...p, stock: p.stock + 1 }
          : p
      )
    );
  };

  const handleShowTicket = () => {
    if (cartItems.length === 0) {
      alert("El carrito está vacío.");
      return;
    }
    setShowTicket(true);
  };

  const handleCloseTicket = () => {
    setShowTicket(false);
    // Opcional: vaciar carrito después de cerrar ticket
    setCartItems([]);
    setProducts(initialProducts); // Restaurar stock original
  };

  return (
    <div style={{ maxWidth: "900px", margin: "2rem auto", padding: "0 1rem" }}>
      <h1 style={{ textAlign: "center", color: "#317773", marginBottom: "2rem" }}>
        Tienda de Ropa
      </h1>

      <ProductList products={products} onAddToCart={handleAddToCart} />

      <Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />

      <button
        onClick={handleShowTicket}
        style={{
          backgroundColor: "#a3d2ca",
          color: "#317773",
          border: "none",
          borderRadius: "5px",
          padding: "0.7rem 1.5rem",
          fontWeight: "bold",
          cursor: "pointer",
          marginBottom: "3rem",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Generar Ticket
      </button>

      {showTicket && (
        <Ticket cartItems={cartItems} onClose={handleCloseTicket} />
      )}
    </div>
  );
}
