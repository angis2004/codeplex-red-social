import React from "react";

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
    <div className="block md:hidden fixed bottom-0 left-0 right-0 z-[300]">
      <div className="flex items-center justify-between gap-3 px-4 py-3 bg-[var(--surface-color)] border-t border-[var(--border-color)] shadow-[0_-4px_16px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-2 text-[13px] text-[var(--text-dark)] font-medium flex-1 min-w-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span>{itemsCarrito.length} app{itemsCarrito.length > 1 ? "s" : ""} agregada{itemsCarrito.length > 1 ? "s" : ""}</span>
          <span className="font-bold text-[var(--text-dark)] whitespace-nowrap">Total: S/{totalCarrito}/mes</span>
        </div>
        <button
          className="bg-[var(--primary-color)] text-white border-none px-4 py-[9px] rounded-lg text-[13px] font-semibold cursor-pointer shrink-0 whitespace-nowrap"
          onClick={alVerCarrito}
        >
          Ver carrito →
        </button>
      </div>
    </div>
  );
}

export default CarritoMobile;
