import React from "react";
import IconoAplicacion from "./IconoAplicacion";
import { useSesion } from "../../identidad/sesion/SesionContext";

function IconoVerificacion() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="7" fill="#22C55E" opacity="0.15" />
      <path d="M4 7L6 9L10 5" stroke="#22C55E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Presentación — Tarjeta de una Aplicacion disponible en el catálogo.
 *
 * Tres estados del botón de acción:
 *   1. "✓ Instalada"   → estaActiva = true  (gris, deshabilitado)
 *   2. "✓ En Carrito"  → estaEnCarrito = true (verde)
 *   3. "+ Agregar"     → estado inicial (morado)
 *
 * Props:
 *   aplicacion        → entidad Aplicacion del catálogo
 *   alIniciarAdquisicion → callback(aplicacion) para iniciar compra
 *   alQuitarDelCarrito   → callback(aplicacionId) para quitar del carrito
 *   estaActiva        → true si ya tiene suscripción activa
 *   estaEnCarrito     → true si ya está en el carrito
 */
function TarjetaCatalogo({
  aplicacion,
  alIniciarAdquisicion,
  alQuitarDelCarrito,
  estaActiva,
  estaEnCarrito,
}) {
  const { modoExploracion } = useSesion();

  const cardColor = `var(--${aplicacion.colorTema})`;
  const shimmerBg = `linear-gradient(180deg, rgba(var(--${aplicacion.colorTema}-rgb), 0.08) 0%, transparent 100%)`;

  return (
    <div
      className="group relative overflow-hidden flex flex-col gap-[14px] p-5 rounded-[14px] bg-[var(--surface-color)] border border-[var(--border-color)] shadow-[var(--shadow-sm)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
      style={{ borderTopWidth: '3px', borderTopColor: cardColor }}
    >
      {/* Shimmer hover */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-20 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: shimmerBg }}
      />

      {/* Encabezado */}
      <div className="flex items-center gap-[10px]">
        <div className="shrink-0">
          <IconoAplicacion tipo={aplicacion.icono} colorTema={aplicacion.colorTema} />
        </div>
        <div className="flex-1 min-w-0 flex flex-col">
          <span className="text-[15px] font-bold text-[var(--text-primary)] leading-tight">{aplicacion.nombre}</span>
          <span className="text-[12px] text-[var(--text-secondary)] mt-[1px]">{aplicacion.publisher}</span>
        </div>
        <span className="text-[10px] font-semibold px-2 py-[3px] rounded-md tracking-[0.6px] uppercase shrink-0 self-start bg-[var(--border-light)] text-[var(--text-secondary)] border border-[var(--border-color)]">
          {aplicacion.categoria}
        </span>
      </div>

      {/* Descripción */}
      <p className="text-[13px] text-[var(--text-secondary)] leading-[1.55] m-0">{aplicacion.descripcion}</p>

      {/* Características */}
      <ul className="list-none p-0 m-0 flex flex-col gap-[7px]">
        {aplicacion.caracteristicas.map((c) => (
          <li key={c} className="flex items-center gap-2 text-[13px] text-[var(--text-primary)]">
            <IconoVerificacion />
            <span>{c}</span>
          </li>
        ))}
      </ul>

      {/* Pie: precio y acción */}
      <div className="flex items-center justify-between mt-auto pt-[14px] border-t border-[var(--border-light)]">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-[var(--success-color)] bg-[var(--success-bg)] px-2 py-[2px] rounded-full">
            Gratis
          </span>
          <span className="text-[13px] font-semibold text-[var(--text-primary)]">
            Desde {aplicacion.precioDesde}/mes
          </span>
        </div>

        {modoExploracion ? (
          <button
            className="inline-flex items-center justify-center bg-[var(--border-light)] text-[var(--text-secondary)] border border-[var(--border-color)] rounded-lg px-4 py-2 text-[13px] font-semibold opacity-70 cursor-not-allowed"
            disabled
            title="Inicia sesión para adquirir esta aplicación"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className="mr-[5px] shrink-0">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            + Agregar
          </button>
        ) : estaActiva ? (
          <button
            className="bg-[var(--border-light)] text-[var(--text-secondary)] border border-[var(--border-color)] rounded-lg px-4 py-2 text-[13px] font-semibold cursor-default pointer-events-none"
            disabled
          >
            ✓ Instalada
          </button>
        ) : estaEnCarrito ? (
          <button
            className="bg-[var(--success-bg)] text-[var(--success-color)] border border-[var(--success-border)] rounded-lg px-4 py-2 text-[13px] font-semibold cursor-pointer transition-colors hover:bg-[var(--error-bg)] hover:text-[var(--error-color)] hover:border-[var(--error-color)]"
            onClick={() => alQuitarDelCarrito?.(aplicacion.id)}
            title="Clic para quitar del carrito"
          >
            ✓ En Carrito
          </button>
        ) : (
          <button
            className="bg-[var(--accent)] text-white border-none rounded-lg px-4 py-2 text-[13px] font-semibold cursor-pointer transition-all duration-200 hover:bg-[var(--accent-hover)] hover:-translate-y-px"
            onClick={() => alIniciarAdquisicion?.(aplicacion)}
          >
            + Agregar
          </button>
        )}
      </div>
    </div>
  );
}

export default TarjetaCatalogo;
