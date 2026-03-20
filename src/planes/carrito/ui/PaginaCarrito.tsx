import React from "react";
import "./PaginaCarrito.css";

// Colores por categoría para el ícono de app
const COLORES_CATEGORIA = {
  contabilidad: "#7F0DF2",
  logistica:    "#3B82F6",
  restaurante:  "#F97316",
  grifo:        "#EF4444",
  facturacion:  "#06B6D4",
  transporte:   "#8B5CF6",
};

function IconoApp({ app, size = 44 }) {
  const color = COLORES_CATEGORIA[app.categoria?.toLowerCase?.()] || "#534AB7";
  const letra = (app.nombre || "A")[0].toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: 12,
      background: color, display: "flex", alignItems: "center",
      justifyContent: "center", color: "white",
      fontSize: size * 0.4, fontWeight: 700, flexShrink: 0,
    }}>
      {letra}
    </div>
  );
}

function PaginaCarrito({ itemsCarrito = [], totalCarrito = 0, alQuitarItem, alProcederPago, alExplorar, alVolver }) {
  return (
    <div className="pgcarrito-container">

      {/* Header de la página */}
      <div className="pgcarrito-header">
        <button className="pgcarrito-volver" onClick={alVolver}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Volver
        </button>
        <h1 className="pgcarrito-titulo">Tu Carrito</h1>
      </div>

      <div className="pgcarrito-body">

        {/* ══ COLUMNA IZQUIERDA: Lista de apps ══ */}
        <div className="pgcarrito-lista-col">
          <div className="pgcarrito-lista-header">
            <h2>Aplicaciones seleccionadas</h2>
            <span className="pgcarrito-contador">{itemsCarrito.length} aplicación{itemsCarrito.length !== 1 ? "es" : ""}</span>
          </div>

          {itemsCarrito.length === 0 ? (
            <div className="pgcarrito-vacio">
              <div className="pgcarrito-vacio-icono">🛒</div>
              <h3>No has agregado ninguna aplicación aún</h3>
              <p>Explora el catálogo y agrega las apps que necesitas</p>
              <button className="pgcarrito-explorar-btn" onClick={alExplorar}>
                Explorar aplicaciones
              </button>
            </div>
          ) : (
            <div className="pgcarrito-items">
              {itemsCarrito.map((item) => (
                <div key={item.id} className="pgcarrito-item">
                  <IconoApp app={item} />
                  <div className="pgcarrito-item-info">
                    <div className="pgcarrito-item-nombre">{item.nombre}</div>
                    <div className="pgcarrito-item-plan">Plan Básico</div>
                    <span className="pgcarrito-item-chip">🎉 1 mes gratis incluido</span>
                  </div>
                  <div className="pgcarrito-item-precio">{item.precioDesde}/mes</div>
                  <button
                    className="pgcarrito-item-quitar"
                    onClick={() => alQuitarItem(item.id)}
                    title="Quitar del carrito"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ══ COLUMNA DERECHA: Resumen del pedido ══ */}
        {itemsCarrito.length > 0 && (
          <div className="pgcarrito-resumen-col">
            <div className="pgcarrito-resumen-card">
              <h3 className="pgcarrito-resumen-titulo">RESUMEN DEL PEDIDO</h3>

              <div className="pgcarrito-resumen-items">
                {itemsCarrito.map((item) => (
                  <div key={item.id} className="pgcarrito-resumen-fila">
                    <span className="pgcarrito-resumen-app-nombre">{item.nombre} · Plan Básico</span>
                    <span className="pgcarrito-resumen-app-precio">{item.precioDesde}</span>
                  </div>
                ))}
              </div>

              <div className="pgcarrito-resumen-divider" />

              <div className="pgcarrito-resumen-total">
                <span>Total mensual</span>
                <span className="pgcarrito-resumen-total-num">S/{totalCarrito}/mes</span>
              </div>

              <div className="pgcarrito-trial-box">
                🎉 1 mes gratis activado — Hoy pagas <strong>S/0.00</strong>
              </div>

              <button className="pgcarrito-cta-btn" onClick={alProcederPago}>
                Proceder al Pago →
              </button>

              <p className="pgcarrito-seguro">🔒 Pago 100% seguro · Cancela cuando quieras</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default PaginaCarrito;
