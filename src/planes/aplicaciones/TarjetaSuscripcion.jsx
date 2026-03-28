import React from "react";
import "./TarjetaSuscripcion.css";
import { useSesion } from "../../identidad/sesion/SesionContext";
import IconoAplicacion from "./IconoAplicacion";

/* SVG reutilizable — candado */
function IcoCandado() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      className="shrink-0">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

/**
 * Presentación — Tarjeta de una Suscripcion Activa del usuario.
 *
 * Muestra el plan vigente, fechas de prueba, días restantes y
 * las acciones disponibles: Mejorar Plan o Desinstalar.
 *
 * Props:
 *   suscripcion              → objeto de SuscripcionActiva
 *   alMejorarPlan            → callback para mejorar el plan
 *   alSolicitarDesinstalacion → callback para iniciar el flujo de desinstalación
 */
function TarjetaSuscripcion({ suscripcion, alMejorarPlan, alSolicitarDesinstalacion }) {
  const { modoExploracion } = useSesion();

  const appNombre    = suscripcion.appNombre    || suscripcion.nombre    || "Aplicación";
  const appPublisher = suscripcion.appPublisher || suscripcion.publisher || "";

  const planDisplay =
    { gratis: "Gratis", basico: "Básico", gold: "Gold", "Exploración": "Exploración" }[suscripcion.planNombre] ||
    suscripcion.planDisplay ||
    suscripcion.planNombre  ||
    "—";

  const hoy        = new Date();
  const fechaVence = new Date(hoy);
  fechaVence.setMonth(hoy.getMonth() + 1);

  const diasRestantes = Math.max(
    0,
    Math.round((fechaVence - hoy) / (1000 * 60 * 60 * 24))
  );

  const fmtFecha = (d) =>
    new Date(d)
      .toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" })
      .replace(/\./g, "");

  return (
    <div
      className="tarjeta-suscripcion flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-5 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-[14px] p-[18px_20px] shadow-[var(--shadow-sm)] transition-all duration-200 hover:-translate-y-px hover:shadow-[var(--shadow-md)]"
      style={{ '--color-tema': `var(--${suscripcion.colorTema})`, borderTopWidth: '3px', borderTopColor: `var(--${suscripcion.colorTema})` }}
    >
      {/* Ícono + nombre */}
      <div className="flex items-center gap-3 lg:min-w-[140px]">
        <IconoAplicacion tipo={suscripcion.icono} colorTema={suscripcion.colorTema} />
        <div>
          <div className="text-[15px] font-bold text-[var(--text-primary)]">{appNombre}</div>
          <div className="text-[12px] text-[var(--text-secondary)] mt-[1px]">{appPublisher}</div>
        </div>
      </div>

      {/* Meta: 3 columnas → fila 1: PLAN · INICIO · VENCE | fila 2: DÍAS · SI NO MIGRAS */}
      <div className="grid grid-cols-3 gap-x-5 gap-y-3 lg:grid-cols-5 lg:gap-x-[22px] lg:gap-y-0 lg:flex-1">

        <div className="flex flex-col gap-[3px]">
          <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.4px]">PLAN</span>
          <span className="text-[13px] font-semibold text-[var(--accent)]">{planDisplay}</span>
        </div>

        <div className="flex flex-col gap-[3px]">
          <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.4px]">INICIO PRUEBA</span>
          <span className="text-[13px] font-semibold text-[var(--text-primary)]">{fmtFecha(hoy)}</span>
        </div>

        <div className="flex flex-col gap-[3px]">
          <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.4px]">VENCE PRUEBA</span>
          <span className="text-[13px] font-semibold text-[var(--text-primary)]">{fmtFecha(fechaVence)}</span>
        </div>

        <div className="flex flex-col gap-[3px]">
          <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.4px]">DIAS RESTANTES</span>
          <span className="flex items-center gap-[5px] text-[13px] font-semibold text-[var(--text-primary)]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            {diasRestantes} días
          </span>
        </div>

        <div className="flex flex-col gap-[3px]">
          <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.4px]">SI NO MIGRAS</span>
          <span className="flex items-center gap-[5px] text-[13px] font-semibold text-[var(--accent)]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Modo limitado
          </span>
        </div>

      </div>

      {/* Acciones */}
      <div className="flex gap-2 lg:shrink-0">
        <button
          className={`flex items-center gap-[5px] px-[14px] py-2 rounded-lg text-[13px] font-semibold whitespace-nowrap transition-colors duration-200 ${
            modoExploracion
              ? "bg-[var(--border-light)] text-[var(--text-secondary)] border border-[var(--border-color)] opacity-70 cursor-not-allowed"
              : "bg-[var(--accent)] text-white border-none cursor-pointer hover:bg-[var(--accent-hover)]"
          }`}
          onClick={modoExploracion ? undefined : alMejorarPlan}
          disabled={modoExploracion}
          title={modoExploracion ? "Inicia sesión para gestionar tu plan" : undefined}
        >
          {modoExploracion && <IcoCandado />}
          Mejorar Plan
        </button>

        <button
          className={`flex items-center gap-[5px] px-[14px] py-2 rounded-lg text-[13px] font-semibold whitespace-nowrap transition-all duration-200 ${
            modoExploracion
              ? "bg-[var(--border-light)] text-[var(--text-secondary)] border border-[var(--border-color)] opacity-70 cursor-not-allowed"
              : "bg-transparent text-[var(--text-secondary)] border border-[var(--border-color)] cursor-pointer hover:border-[var(--error-color)] hover:text-[var(--error-color)]"
          }`}
          onClick={modoExploracion ? undefined : alSolicitarDesinstalacion}
          disabled={modoExploracion}
          title={modoExploracion ? "Inicia sesión para gestionar tus apps" : undefined}
        >
          {modoExploracion && <IcoCandado />}
          Desinstalar
        </button>
      </div>
    </div>
  );
}

export default TarjetaSuscripcion;
