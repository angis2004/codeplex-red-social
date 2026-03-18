import React from "react";
import { useSesion } from "../../../identidad/sesion/SesionContext";

function IconoSuscripcionActiva() {
  return (
    <svg width="38" height="38" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#F97316" />
      <line x1="17" y1="13" x2="17" y2="35" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M14 13V20C14 21.7 15.3 23 17 23C18.7 23 20 21.7 20 20V13" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="13" x2="30" y2="35" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M27 13C27 13 27 20 30 21V35" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
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
function SuscripcionActivaItem({ suscripcion, alMejorarPlan, alSolicitarDesinstalacion }) {
  const { modoExploracion } = useSesion();
  // Soporta tanto apps adquiridas (appNombre/appPublisher) como apps de exploración (nombre/publisher)
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
    <div className="suscripcion-activa-tarjeta">
      <div className="suscripcion-activa-tarjeta__izquierda">
        <IconoSuscripcionActiva />
        <div>
          <div className="suscripcion-activa-tarjeta__nombre">{appNombre}</div>
          <div className="suscripcion-activa-tarjeta__publisher">{appPublisher}</div>
        </div>
      </div>

      <div className="suscripcion-activa-tarjeta__meta">
        <div className="suscripcion-activa-tarjeta__meta-columna">
          <span className="suscripcion-activa-tarjeta__meta-etiqueta">PLAN</span>
          <span className="suscripcion-activa-tarjeta__meta-valor suscripcion-activa-tarjeta__meta-valor--plan">
            {planDisplay}
          </span>
        </div>
        <div className="suscripcion-activa-tarjeta__meta-columna">
          <span className="suscripcion-activa-tarjeta__meta-etiqueta">INICIO PRUEBA</span>
          <span className="suscripcion-activa-tarjeta__meta-valor">{fmtFecha(hoy)}</span>
        </div>
        <div className="suscripcion-activa-tarjeta__meta-columna">
          <span className="suscripcion-activa-tarjeta__meta-etiqueta">VENCE PRUEBA</span>
          <span className="suscripcion-activa-tarjeta__meta-valor">{fmtFecha(fechaVence)}</span>
        </div>
        <div className="suscripcion-activa-tarjeta__meta-columna">
          <span className="suscripcion-activa-tarjeta__meta-etiqueta">DIAS RESTANTES</span>
          <span className="suscripcion-activa-tarjeta__meta-valor suscripcion-activa-tarjeta__meta-valor--dias">
            🕐 {diasRestantes} días
          </span>
        </div>
        <div className="suscripcion-activa-tarjeta__meta-columna">
          <span className="suscripcion-activa-tarjeta__meta-etiqueta">Si no Migras</span>
          <span className="suscripcion-activa-tarjeta__meta-valor suscripcion-activa-tarjeta__meta-valor--alerta">
            🔒 Modo limitado
          </span>
        </div>
      </div>

      <div className="suscripcion-activa-tarjeta__acciones">
        <button
          className={`boton-mejorar-plan${modoExploracion ? " boton--bloqueado" : ""}`}
          onClick={modoExploracion ? undefined : alMejorarPlan}
          disabled={modoExploracion}
          title={modoExploracion ? "Inicia sesión para gestionar tu plan" : undefined}
        >
          {modoExploracion && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ marginRight: 5, flexShrink: 0 }}>
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          )}
          Mejorar Plan
        </button>
        <button
          className={`boton-desinstalar${modoExploracion ? " boton--bloqueado" : ""}`}
          onClick={modoExploracion ? undefined : alSolicitarDesinstalacion}
          disabled={modoExploracion}
          title={modoExploracion ? "Inicia sesión para gestionar tus apps" : undefined}
        >
          {modoExploracion && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ marginRight: 5, flexShrink: 0 }}>
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          )}
          Desinstalar
        </button>
      </div>
    </div>
  );
}

export default SuscripcionActivaItem;
