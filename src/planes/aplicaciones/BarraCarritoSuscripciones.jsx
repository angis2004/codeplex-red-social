import React from "react";
import "./PanelCarrito.css"; /* solo @keyframes carrito-in */

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
    <div className="carrito-bar-anim fixed bottom-6 left-1/2 -translate-x-1/2 bg-[var(--color-red-social)] text-white rounded-2xl px-5 py-[14px] flex items-center justify-between gap-5 shadow-[0_8px_32px_rgba(0,0,0,0.25)] z-[600] min-w-[360px] max-w-[680px] w-[calc(100%-48px)] max-[600px]:flex-col max-[600px]:items-stretch max-[600px]:gap-[10px] max-[600px]:bottom-4">

      {/* Izquierda: count + chips */}
      <div className="flex items-center gap-[10px] flex-1 min-w-0 overflow-hidden">
        <span className="text-[13px] font-semibold whitespace-nowrap text-white/90">
          {items.length} {items.length === 1 ? "app" : "apps"}
        </span>
        <div className="flex gap-[6px] flex-nowrap overflow-hidden max-[600px]:hidden">
          {items.map((item) => (
            <span
              key={item.id}
              className="inline-flex items-center gap-1 bg-white/15 rounded-full py-[3px] pl-3 pr-[10px] text-[12px] font-medium whitespace-nowrap"
            >
              {item.nombre}
              <button
                className="bg-transparent border-none text-white/60 text-[14px] cursor-pointer p-0 leading-none transition-colors duration-150 hover:text-[var(--error-color)]"
                onClick={() => alQuitarItem(item.id)}
                aria-label={`Quitar ${item.nombre} del carrito`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Derecha: total + botón */}
      <div className="flex items-center gap-[14px] shrink-0 max-[600px]:justify-between">
        <span className="text-[15px] font-extrabold text-white whitespace-nowrap">
          Desde S/{totalCarrito}/mes
        </span>
        <button
          className="flex items-center gap-[6px] bg-[var(--accent)] text-white border-none rounded-[10px] px-[18px] py-[10px] text-[13px] font-bold cursor-pointer whitespace-nowrap transition-all duration-200 hover:bg-[var(--accent-hover)] hover:-translate-y-px"
          onClick={alProcederPago}
        >
          Proceder al pago
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

    </div>
  );
}

export default BarraCarritoSuscripciones;
