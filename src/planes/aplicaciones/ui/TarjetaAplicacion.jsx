import React from "react";
import IconoAplicacion from "./IconoAplicacion";
import { useSesion } from "../../../identidad/sesion/SesionContext";

function IconoVerificacion() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="7" fill="#22C55E" opacity="0.15" />
      <path
        d="M4 7L6 9L10 5"
        stroke="#22C55E"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
 *   alAgregarAlCarrito → callback(aplicacion) para agregar al carrito
 *   alQuitarDelCarrito → callback(aplicacionId) para quitar del carrito
 *   estaActiva        → true si ya tiene suscripción activa
 *   estaEnCarrito     → true si ya está en el carrito
 */
function TarjetaAplicacion({
  aplicacion,
  alIniciarAdquisicion,
  alQuitarDelCarrito,
  estaActiva,
  estaEnCarrito,
}) {
  const { modoExploracion } = useSesion();
  return (
    <div className={`tarjeta-aplicacion tarjeta-aplicacion--${aplicacion.colorTema}`}>

      {/* Encabezado */}
      <div className="tarjeta-aplicacion__encabezado">
        <div className="tarjeta-aplicacion__icono">
          <IconoAplicacion tipo={aplicacion.icono} colorTema={aplicacion.colorTema} />
        </div>
        <div className="tarjeta-aplicacion__info">
          <span className="tarjeta-aplicacion__nombre">{aplicacion.nombre}</span>
          <span className="tarjeta-aplicacion__publisher">{aplicacion.publisher}</span>
        </div>
        <span className="tarjeta-aplicacion__categoria">{aplicacion.categoria}</span>
      </div>

      {/* Descripción */}
      <p className="tarjeta-aplicacion__descripcion">{aplicacion.descripcion}</p>

      {/* Características */}
      <ul className="tarjeta-aplicacion__caracteristicas">
        {aplicacion.caracteristicas.map((c) => (
          <li key={c}>
            <IconoVerificacion />
            <span>{c}</span>
          </li>
        ))}
      </ul>

      {/* Pie: precio y acción */}
      <div className="tarjeta-aplicacion__pie">
        <div className="tarjeta-aplicacion__precio">
          <span className="etiqueta-gratis">Gratis</span>
          <span className="precio-desde">Desde {aplicacion.precioDesde}/mes</span>
        </div>

        {modoExploracion ? (
          /* Modo exploración: botón bloqueado visualmente, sin acción */
          <button
            className="boton-suscribir boton--bloqueado"
            disabled
            title="Inicia sesión para adquirir esta aplicación"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ marginRight: 5, flexShrink: 0 }}>
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            + Agregar
          </button>
        ) : estaActiva ? (
          <button className="boton-suscripcion-activa" disabled>
            ✓ Instalada
          </button>
        ) : estaEnCarrito ? (
          <button
            className="boton-en-carrito"
            onClick={() => alQuitarDelCarrito?.(aplicacion.id)}
            title="Clic para quitar del carrito"
          >
            ✓ En Carrito
          </button>
        ) : (
          <button
            className="boton-suscribir"
            onClick={() => alIniciarAdquisicion?.(aplicacion)}
          >
            + Agregar
          </button>
        )}
      </div>
    </div>
  );
}

export default TarjetaAplicacion;
