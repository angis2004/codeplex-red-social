import React, { useState, useEffect } from "react";
import "./VisorCatalogoPDF.css";

/* ═══════════════════════════════════════════
   Visor de Catálogo PDF — in-app
   Uso:
     <VisorCatalogoPDF
       estaAbierto={visorAbierto}
       alCerrar={() => setVisorAbierto(false)}
       pdfUrl="/catalogos/contaplex-independientes-2026.pdf"
       pdfNombre="Brochure Conta-Plex Independientes 2026.pdf"
       pdfTamanio="1.8 MB · 4 páginas"
       accentColor="#0094C0"
     />
═══════════════════════════════════════════ */

function IcoFileText() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  );
}

function IcoX() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  );
}

function IcoExternalLink() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}

export default function VisorCatalogoPDF({
  estaAbierto,
  alCerrar,
  pdfUrl,
  pdfNombre   = "Catálogo.pdf",
  pdfTamanio  = "",
  accentColor = "#7C3AED",
}) {
  const [cargando, setCargando] = useState(true);

  /* Reset carga al abrir */
  useEffect(() => {
    if (estaAbierto) setCargando(true);
  }, [estaAbierto, pdfUrl]);

  /* Bloquear scroll del body */
  useEffect(() => {
    if (estaAbierto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [estaAbierto]);

  if (!estaAbierto) return null;

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) alCerrar();
  };

  return (
    <div
      className="vcat-fade-in fixed inset-0 bg-[rgba(0,0,0,0.72)] z-[20000] flex items-end justify-center p-0 sm:items-center sm:p-4"
      onClick={handleOverlay}
    >
      <div className="vcat-slide-in bg-[#1a1f2e] rounded-[20px_20px_0_0] sm:rounded-[16px] overflow-hidden w-full sm:max-w-[960px] h-[96vh] sm:h-[90vh] sm:max-h-[860px] flex flex-col shadow-[0_24px_80px_rgba(0,0,0,0.5)]">

        {/* ── Header ── */}
        <div
          className="flex items-center justify-between p-[14px_20px] gap-3 shrink-0"
          style={{ background: accentColor }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 bg-[rgba(255,255,255,0.18)] rounded-[10px] flex items-center justify-center shrink-0">
              <IcoFileText />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[14px] font-bold text-white truncate">{pdfNombre}</span>
              {pdfTamanio && (
                <span className="text-[12px] text-[rgba(255,255,255,0.65)] mt-[1px]">{pdfTamanio}</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Abrir en nueva pestaña (útil en mobile) */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-[6px] bg-[rgba(255,255,255,0.15)] text-white border border-[rgba(255,255,255,0.25)] rounded-lg p-[8px_10px] sm:p-[7px_12px] text-[12px] font-medium cursor-pointer no-underline transition-[background] duration-150 hover:bg-[rgba(255,255,255,0.25)]"
              title="Abrir en nueva pestaña"
            >
              <IcoExternalLink />
              <span className="hidden sm:inline">Nueva pestaña</span>
            </a>

            {/* Cerrar */}
            <button
              className="flex items-center gap-[6px] bg-[rgba(255,255,255,0.92)] text-[#111827] border-none rounded-lg p-[8px_10px] sm:p-[7px_14px] text-[13px] font-bold cursor-pointer transition-[background,transform] duration-150 hover:bg-[rgba(255,255,255,0.80)] hover:scale-[1.02]"
              onClick={alCerrar}
            >
              <IcoX />
              <span className="hidden sm:inline">Cerrar</span>
            </button>
          </div>
        </div>

        {/* ── Contenido ── */}
        <div className="flex-1 relative bg-[#2d3748] overflow-hidden">
          {/* Spinner mientras carga */}
          {cargando && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-[14px] text-[rgba(255,255,255,0.6)] text-[14px] z-[2]">
              <div
                className="vcat-spinner w-9 h-9 rounded-full border-[3px] border-[rgba(255,255,255,0.15)]"
                style={{ borderTopColor: accentColor }}
              />
              <span>Cargando catálogo...</span>
            </div>
          )}

          {/* iframe PDF */}
          <iframe
            key={pdfUrl}
            src={pdfUrl}
            title={pdfNombre}
            className="w-full h-full border-none block transition-opacity duration-300"
            style={{ opacity: cargando ? 0 : 1 }}
            onLoad={() => setCargando(false)}
          />
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-end sm:justify-between p-[10px_20px] bg-[#111827] border-t border-[rgba(255,255,255,0.08)] shrink-0 gap-3">
          <span className="hidden sm:block text-[12px] text-[rgba(255,255,255,0.45)] leading-[1.4]">
            💡 Usa los controles del visor para navegar páginas, hacer zoom y descargar
          </span>
          <button
            className="bg-transparent border-[1.5px] border-current rounded-lg p-[7px_16px] text-[13px] font-semibold cursor-pointer whitespace-nowrap transition-opacity duration-150 shrink-0 hover:opacity-75"
            style={{ color: accentColor, borderColor: accentColor }}
            onClick={alCerrar}
          >
            Volver a los planes
          </button>
        </div>

      </div>
    </div>
  );
}
