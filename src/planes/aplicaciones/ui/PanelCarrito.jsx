import React from "react";

/**
 * Presentación — Panel lateral del Carrito de Suscripciones
 *
 * Se muestra fijo a la derecha del catálogo.
 * Permite al usuario ver, quitar apps y proceder al pago.
 *
 * Props:
 *   itemsCarrito    → Aplicaciones actualmente en el carrito
 *   totalCarrito    → Número: suma de precios base
 *   onQuitarItem    → callback(aplicacionId) para quitar un item
 *   onProcederPago  → callback() para ir a la pasarela de pago
 */
function PanelCarrito({ itemsCarrito = [], totalCarrito = 0, onQuitarItem, onProcederPago }) {
  const tieneItems = itemsCarrito.length > 0;

  return (
    <div className="panel-carrito">

      {/* ── Encabezado ── */}
      <div className="panel-carrito__encabezado">
        <div className="panel-carrito__titulo-wrap">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <h3 className="panel-carrito__titulo">Tu Carrito</h3>
          {tieneItems && (
            <span className="panel-carrito__badge">{itemsCarrito.length}</span>
          )}
        </div>
      </div>

      {/* ── Cuerpo ── */}
      <div className="panel-carrito__cuerpo">
        {!tieneItems ? (

          /* Estado vacío */
          <div className="panel-carrito__vacio">
            <div className="panel-carrito__vacio-icono">🛒</div>
            <p className="panel-carrito__vacio-texto">
              Agrega aplicaciones para comenzar
            </p>
            <p className="panel-carrito__vacio-subtexto">
              Haz clic en "+ Agregar" en cualquier app
            </p>
          </div>

        ) : (
          <>
            {/* Lista de items */}
            <div className="panel-carrito__lista">
              {itemsCarrito.map((item) => (
                <div key={item.id} className="panel-carrito__item">
                  <div className="panel-carrito__item-info">
                    <span className="panel-carrito__item-nombre">{item.nombre}</span>
                    <span className="panel-carrito__item-precio">
                      Desde {item.precioDesde}/mes
                    </span>
                  </div>
                  <button
                    className="panel-carrito__item-quitar"
                    onClick={() => onQuitarItem?.(item.id)}
                    aria-label={`Quitar ${item.nombre} del carrito`}
                    title="Quitar"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Separador */}
            <div className="panel-carrito__divider" />

            {/* Resumen de precio */}
            <div className="panel-carrito__resumen">
              <div className="panel-carrito__resumen-fila">
                <span className="panel-carrito__resumen-label">
                  {itemsCarrito.length} {itemsCarrito.length === 1 ? "app" : "apps"} seleccionadas
                </span>
              </div>
              <div className="panel-carrito__resumen-fila panel-carrito__resumen-fila--total">
                <span>Total desde:</span>
                <span className="panel-carrito__total-precio">S/ {totalCarrito}/mes</span>
              </div>
              <p className="panel-carrito__nota">
                * Primer mes gratis · Cancela cuando quieras
              </p>
            </div>

            {/* Botón de pago */}
            <button
              className="panel-carrito__btn-pago"
              onClick={onProcederPago}
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
