import React from "react";
import IconoAplicacion from "./IconoAplicacion";

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
 * Muestra nombre, publisher, categoría, descripción, características
 * y precio de entrada. Permite al usuario agregar al CarritoSuscripciones.
 *
 * Props:
 *   aplicacion    → entidad Aplicacion del catálogo
 *   alSuscribirse → callback(aplicacion) para agregar al carrito
 *   estaActiva    → true si el usuario ya tiene una suscripción activa
 *   estaEnCarrito → true si la aplicacion ya está en el carrito
 */
function TarjetaAplicacion({ aplicacion, alSuscribirse, estaActiva, estaEnCarrito }) {
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
        {estaActiva ? (
          <button className="boton-suscripcion-activa" disabled>
            ✓ Instalada
          </button>
        ) : estaEnCarrito ? (
          <button className="btn-en-carrito" disabled>
            ✓ En Carrito
          </button>
        ) : (
          <button className="boton-suscribir" onClick={() => alSuscribirse?.(aplicacion)}>
            + Agregar
          </button>
        )}
      </div>
    </div>
  );
}

export default TarjetaAplicacion;
