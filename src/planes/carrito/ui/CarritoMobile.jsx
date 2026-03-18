import React, { useState } from "react";
import "./CarritoMobile.css";

function CarritoMobile({ itemsCarrito = [], totalCarrito = 0, onQuitarItem, onVerCarrito }) {
  const [expandido, setExpandido] = useState(false);

  if (itemsCarrito.length === 0) return null;

  return (
    <div className={`carrito-mobile${expandido ? " carrito-mobile--expandido" : ""}`}>
      {/* Drawer expandido */}
      {expandido && (
        <div className="carrito-mobile-drawer">
          <div className="carrito-mobile-handle" onClick={() => setExpandido(false)} />
          <div className="carrito-mobile-drawer-items">
            {itemsCarrito.map((item) => (
              <div key={item.id} className="carrito-mobile-drawer-item">
                <div className="carrito-mobile-drawer-info">
                  <span className="carrito-mobile-drawer-nombre">{item.nombre}</span>
                  <span className="carrito-mobile-drawer-plan">Plan Básico · {item.precioDesde}/mes</span>
                </div>
                <button
                  className="carrito-mobile-drawer-quitar"
                  onClick={() => onQuitarItem(item.id)}
                >✕</button>
              </div>
            ))}
          </div>
          <button className="carrito-mobile-drawer-cta" onClick={onVerCarrito}>
            Ver carrito completo →
          </button>
        </div>
      )}

      {/* Bottom bar colapsado */}
      <div className="carrito-mobile-bar">
        <div className="carrito-mobile-bar-info">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span>{itemsCarrito.length} app{itemsCarrito.length > 1 ? "s" : ""} agregada{itemsCarrito.length > 1 ? "s" : ""}</span>
          <span className="carrito-mobile-bar-total">Total: S/{totalCarrito}/mes</span>
        </div>
        <button
          className="carrito-mobile-bar-btn"
          onClick={() => setExpandido(!expandido)}
        >
          {expandido ? "Cerrar ↓" : "Ver carrito ↑"}
        </button>
      </div>
    </div>
  );
}

export default CarritoMobile;
