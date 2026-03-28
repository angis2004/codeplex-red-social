import React from "react";
import "./ConfirmacionDesinstalacion.css";

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
    <div
      className="fixed inset-0 z-[9999] bg-[rgba(15,10,30,0.45)] backdrop-blur-sm flex items-center justify-center p-5"
      onClick={alCancelar}
    >
      <div
        className="modal-entrada bg-[var(--surface-color)] rounded-[20px] p-[40px_32px_32px] max-w-[400px] w-full text-center shadow-[var(--shadow-lg)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ícono */}
        <div className="w-[76px] h-[76px] rounded-full bg-[var(--error-bg)] border-2 border-[var(--error-color)] flex items-center justify-center mx-auto mb-[22px] opacity-80">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M10 10L30 30M30 10L10 30" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>

        {/* Título */}
        <h2 className="text-[20px] font-extrabold text-[var(--text-primary)] m-0 mb-[10px] leading-[1.35]">
          ¿Desinstalar {aplicacion.appNombre || "GestiónPlex"}{" "}
          {aplicacion.appPublisher || "Restaurante"}?
        </h2>

        {/* Descripción */}
        <p className="text-[14px] text-[var(--text-secondary)] m-0 mb-7 leading-[1.6]">
          Perderá acceso a todos tus datos. Esta acción no se puede deshacer.
        </p>

        {/* Botones */}
        <div className="grid grid-cols-2 gap-3">
          <button
            className="bg-[var(--surface-color)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-[10px] py-[13px] text-[15px] font-semibold cursor-pointer transition-all duration-200 hover:border-[var(--text-secondary)] hover:bg-[var(--background-color)]"
            onClick={alCancelar}
          >
            Cancelar
          </button>
          <button
            className="bg-[var(--error-color)] text-white border-none rounded-[10px] py-[13px] text-[15px] font-semibold cursor-pointer transition-all duration-200 hover:brightness-90 hover:-translate-y-px"
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
