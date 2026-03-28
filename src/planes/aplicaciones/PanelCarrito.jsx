import React from "react";
import "./PanelCarrito.css";

/**
 * Presentación — Panel lateral del Carrito de Suscripciones
 *
 * Se muestra fijo a la derecha del catálogo.
 * Permite al usuario ver, quitar apps y proceder al pago.
 *
 * Props:
 *   itemsCarrito    → Aplicaciones actualmente en el carrito
 *   totalCarrito    → Número: suma de precios base
 *   alQuitarItem    → callback(aplicacionId) para quitar un item
 *   alProcederPago  → callback() para ir a la pasarela de pago
 */
function PanelCarrito({ itemsCarrito = [], totalCarrito = 0, alQuitarItem, alProcederPago }) {
  const tieneItems = itemsCarrito.length > 0;

  return (
    <div className="w-[300px] shrink-0 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-2xl shadow-[var(--shadow-md)] sticky top-6 overflow-hidden">

      {/* ── Encabezado ── */}
      <div className="px-5 pt-[18px] pb-[14px] border-b border-[var(--border-light)] bg-[var(--background-color)]">
        <div className="flex items-center gap-2 text-[var(--text-primary)]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <h3 className="text-[15px] font-bold text-[var(--text-primary)] m-0 flex-1">Tu Carrito</h3>
          {tieneItems && (
            <span className="bg-[var(--accent)] text-white text-[11px] font-bold px-2 py-[2px] rounded-full min-w-[20px] text-center">
              {itemsCarrito.length}
            </span>
          )}
        </div>
      </div>

      {/* ── Cuerpo ── */}
      <div className="p-4 flex flex-col gap-3">
        {!tieneItems ? (

          /* Estado vacío */
          <div className="text-center py-8 px-3 text-[var(--text-secondary)]">
            <div className="text-[40px] mb-3 opacity-50">🛒</div>
            <p className="text-[13px] font-semibold text-[var(--text-primary)] m-0 mb-1">
              Agrega aplicaciones para comenzar
            </p>
            <p className="text-[12px] text-[var(--text-secondary)] m-0">
              Haz clic en "+ Agregar" en cualquier app
            </p>
          </div>

        ) : (
          <>
            {/* Lista de items */}
            <div className="flex flex-col gap-2">
              {itemsCarrito.map((item) => (
                <div key={item.id} className="item-entrada flex items-center gap-[10px] bg-[var(--background-color)] border border-[var(--border-light)] rounded-[10px] px-3 py-[10px]">
                  <div className="flex-1 min-w-0 flex flex-col gap-[2px]">
                    <span className="text-[13px] font-semibold text-[var(--text-primary)] whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.nombre}
                    </span>
                    <span className="text-[11px] text-[var(--text-secondary)]">
                      Desde {item.precioDesde}/mes
                    </span>
                  </div>
                  <button
                    className="bg-none border-none text-[var(--text-secondary)] text-[18px] leading-none cursor-pointer p-[2px_4px] rounded shrink-0 transition-colors duration-150 hover:text-[var(--error-color)] hover:bg-[var(--error-bg)]"
                    onClick={() => alQuitarItem?.(item.id)}
                    aria-label={`Quitar ${item.nombre} del carrito`}
                    title="Quitar"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Separador */}
            <div className="h-px bg-[var(--border-light)] -mx-1" />

            {/* Resumen de precio */}
            <div className="flex flex-col gap-[6px]">
              <div className="flex justify-between items-center text-[13px] text-[var(--text-secondary)]">
                <span>{itemsCarrito.length} {itemsCarrito.length === 1 ? "app" : "apps"} seleccionadas</span>
              </div>
              <div className="flex justify-between items-center text-[14px] font-bold text-[var(--text-primary)]">
                <span>Total desde:</span>
                <span className="text-[var(--accent)] text-[16px] font-extrabold">S/ {totalCarrito}/mes</span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] m-0 text-center leading-[1.4]">
                * Primer mes gratis · Cancela cuando quieras
              </p>
            </div>

            {/* Botón de pago */}
            <button
              className="w-full bg-[var(--accent)] text-white border-none rounded-[10px] py-[13px] px-4 text-[14px] font-bold cursor-pointer flex items-center justify-center gap-2 transition-all duration-200 shadow-[0_4px_12px_var(--accent-shadow)] hover:bg-[var(--accent-hover)] hover:-translate-y-px"
              onClick={alProcederPago}
            >
              Proceder al pago
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default PanelCarrito;
