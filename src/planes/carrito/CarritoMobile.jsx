import React from "react";
import "./CarritoMobile.css";

/**
 * Presentación — Barra fija inferior del Carrito en mobile.
 *
 * Muestra el resumen del carrito y lleva directo a PaginaCarrito.
 * No permite eliminar items desde aquí — eso se hace en el carrito completo.
 *
 * Props:
 *   itemsCarrito  → lista de Aplicaciones en el carrito
 *   totalCarrito  → precio total calculado
 *   alVerCarrito  → callback para navegar a PaginaCarrito
 */
function CarritoMobile({ itemsCarrito = [], totalCarrito = 0, alVerCarrito }) {
  if (itemsCarrito.length === 0) return null;

  return (
    <div className="carrito-mobile">
      <div className="carrito-mobile-bar">
        <div className="carrito-mobile-bar-info">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span>{itemsCarrito.length} app{itemsCarrito.length > 1 ? "s" : ""} agregada{itemsCarrito.length > 1 ? "s" : ""}</span>
          <span className="carrito-mobile-bar-total">Total: S/{totalCarrito}/mes</span>
        </div>
        <button className="carrito-mobile-bar-btn" onClick={alVerCarrito}>
          Ver carrito →
        </button>
      </div>
    </div>
  );
}

export default CarritoMobile;
