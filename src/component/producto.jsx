// src/components/Product.jsx

import React from "react";

export default function Product({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <button
        className="btn-add"
        onClick={() => onAddToCart(product)}
      >
        Agregar
      </button>
    </div>
  );
}
