import React from "react";

/**
 * Presentación — Confirmación de desinstalación de una Aplicacion.
 *
 * Solicita al usuario confirmar que desea dar de baja
 * una SuscripcionActiva. La acción es irreversible.
 *
 * Props:
 *   aplicacion  → la SuscripcionActiva a desinstalar (o null si está cerrado)
 *   alCancelar  → callback para cerrar sin acción
 *   alConfirmar → callback(id) para confirmar la desinstalación
 */
function ConfirmacionDesinstalacion({ aplicacion, alCancelar, alConfirmar }) {
  if (!aplicacion) return null;

  return (
    <div className="confirmacion-desinstalacion__overlay" onClick={alCancelar}>
      <div
        className="confirmacion-desinstalacion__modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="confirmacion-desinstalacion__icono">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M10 10L30 30M30 10L10 30"
              stroke="#EF4444"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h2 className="confirmacion-desinstalacion__titulo">
          ¿Desinstalar {aplicacion.appNombre || "GestiónPlex"}{" "}
          {aplicacion.appPublisher || "Restaurante"}?
        </h2>
        <p className="confirmacion-desinstalacion__descripcion">
          Perderá acceso a todos tus datos. Esta acción no se puede deshacer.
        </p>

        <div className="confirmacion-desinstalacion__botones">
          <button className="boton-cancelar-desinstalacion" onClick={alCancelar}>
            Cancelar
          </button>
          <button
            className="boton-confirmar-desinstalacion"
            onClick={() => alConfirmar(aplicacion.id)}
          >
            Sí, desinstalar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmacionDesinstalacion;
