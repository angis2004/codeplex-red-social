import React from "react";

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
    <div className="max-w-[1100px] mx-auto px-6 pt-6 pb-[60px] max-[600px]:px-4 max-[600px]:pb-20">

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          className="flex items-center gap-1.5 bg-transparent border border-[var(--border-color)] px-3.5 py-2 rounded-lg text-sm text-[var(--text-dark)] cursor-pointer font-[inherit] transition-all hover:border-[var(--primary-color)] hover:text-[var(--primary-color)]"
          onClick={alVolver}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Volver
        </button>
        <h1 className="text-2xl font-bold text-[var(--text-dark)] m-0 max-[600px]:text-xl">Tu Carrito</h1>
      </div>

      <div className="flex gap-7 items-start max-[900px]:flex-col">

        {/* ══ COLUMNA IZQUIERDA ══ */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-[var(--text-dark)] m-0">Aplicaciones seleccionadas</h2>
            <span className="text-[13px] text-[var(--text-muted)] bg-[var(--background-color)] px-3 py-1 rounded-full">
              {itemsCarrito.length} aplicación{itemsCarrito.length !== 1 ? "es" : ""}
            </span>
          </div>

          {itemsCarrito.length === 0 ? (
            <div className="text-center py-[60px] px-5 bg-[var(--white-color)] rounded-2xl border border-[var(--border-color)]">
              <div className="text-5xl mb-4">🛒</div>
              <h3 className="text-lg text-[var(--text-dark)] m-0 mb-2">No has agregado ninguna aplicación aún</h3>
              <p className="text-sm text-[var(--text-muted)] m-0 mb-5">Explora el catálogo y agrega las apps que necesitas</p>
              <button
                className="border-0 text-white px-7 py-3 rounded-xl text-[15px] font-semibold cursor-pointer font-[inherit]"
                style={{ background: "linear-gradient(135deg, var(--primary-color), var(--secondary-color))" }}
                onClick={alExplorar}
              >
                Explorar aplicaciones
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {itemsCarrito.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-[var(--white-color)] border border-[var(--border-color)] rounded-[14px] px-5 py-4 transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.07)] max-[600px]:px-4 max-[600px]:py-3.5 max-[600px]:gap-3"
                >
                  <IconoApp app={item} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-semibold text-[var(--text-dark)] mb-0.5">{item.nombre}</div>
                    <div className="text-[13px] text-[var(--text-muted)] mb-1.5">Plan Básico</div>
                    <span className="inline-block bg-[#dcfce7] text-[#16a34a] text-xs font-semibold px-2.5 py-[3px] rounded-full">
                      🎉 1 mes gratis incluido
                    </span>
                  </div>
                  <div className="text-base font-bold text-[var(--text-dark)] whitespace-nowrap">{item.precioDesde}/mes</div>
                  <button
                    className="w-8 h-8 rounded-full border border-[var(--border-color)] bg-transparent text-[var(--text-muted)] text-sm cursor-pointer flex items-center justify-center transition-all shrink-0 hover:bg-[#fee2e2] hover:border-[#ef4444] hover:text-[#ef4444]"
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

        {/* ══ COLUMNA DERECHA: Resumen ══ */}
        {itemsCarrito.length > 0 && (
          <div className="w-[320px] shrink-0 sticky top-[90px] max-[900px]:w-full max-[900px]:static">
            <div className="bg-[var(--white-color)] border border-[var(--border-color)] rounded-2xl p-6">
              <h3 className="text-[11px] font-bold text-[var(--text-muted)] tracking-[0.08em] uppercase m-0 mb-4">
                RESUMEN DEL PEDIDO
              </h3>

              <div className="flex flex-col gap-2.5 mb-4">
                {itemsCarrito.map((item) => (
                  <div key={item.id} className="flex justify-between items-center gap-2.5">
                    <span className="text-[13px] text-[var(--text-dark)] flex-1">{item.nombre} · Plan Básico</span>
                    <span className="text-[13px] font-semibold text-[var(--text-dark)] whitespace-nowrap">{item.precioDesde}</span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-[var(--border-color)] my-3" />

              <div className="flex justify-between items-center mb-3.5">
                <span className="text-sm text-[var(--text-muted)]">Total mensual</span>
                <span className="text-[22px] font-bold text-[var(--text-dark)]">S/{totalCarrito}/mes</span>
              </div>

              <div className="bg-[#f0fdf4] border border-[#86efac] rounded-[10px] px-3.5 py-3 text-[13px] text-[#16a34a] mb-4 leading-[1.4]">
                🎉 1 mes gratis activado — Hoy pagas <strong>S/0.00</strong>
              </div>

              <button
                className="w-full bg-[#0F1B3D] text-white border-0 py-3.5 rounded-[10px] text-[15px] font-bold cursor-pointer font-[inherit] transition-opacity mb-3 hover:opacity-[0.88]"
                onClick={alProcederPago}
              >
                Proceder al Pago →
              </button>

              <p className="text-center text-xs text-[var(--text-muted)] m-0">
                🔒 Pago 100% seguro · Cancela cuando quieras
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default PaginaCarrito;
