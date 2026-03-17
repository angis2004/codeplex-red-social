import React from "react";

/**
 * Presentación — Barra flotante del Carrito de Suscripciones
 *
 * Aparece en la parte inferior cuando el usuario agrega al menos
 * una Aplicacion al carrito. Muestra los items seleccionados,
 * el total desde y el botón para proceder al pago.
 *
 * Props:
 *   items          → lista de Aplicaciones en el carrito
 *   totalCarrito   → precio total calculado (número)
 *   alQuitarItem   → callback(id) para quitar una Aplicacion del carrito
 *   alProcederPago → callback para iniciar el flujo de SelectorPlan
 */
function BarraCarritoSuscripciones({ items, totalCarrito, alQuitarItem, alProcederPago }) {
  if (items.length === 0) return null;

  return (
    <div className="carrito-bar">
      <div className="carrito-bar-left">
        <span className="carrito-bar-count">
          {items.length} {items.length === 1 ? "app" : "apps"}
        </span>
        <div className="carrito-bar-items">
          {items.map((item) => (
            <span key={item.id} className="carrito-bar-chip">
              {item.nombre}
              <button
                className="carrito-bar-chip-x"
                onClick={() => alQuitarItem(item.id)}
                aria-label={`Quitar ${item.nombre} del carrito`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="carrito-bar-right">
        <span className="carrito-bar-total">
          Desde S/{totalCarrito}/mes
        </span>
        <button className="carrito-bar-btn" onClick={alProcederPago}>
          Proceder al pago →
        </button>
      </div>
    </div>
  );
}

export default BarraCarritoSuscripciones;
