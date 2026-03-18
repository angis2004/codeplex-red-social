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
    <div className="vcat-overlay" onClick={handleOverlay}>
      <div className="vcat-modal">

        {/* ── Header ── */}
        <div className="vcat-header" style={{ background: accentColor }}>
          <div className="vcat-header-left">
            <div className="vcat-pdf-icon-wrap">
              <IcoFileText />
            </div>
            <div className="vcat-header-info">
              <span className="vcat-nombre">{pdfNombre}</span>
              {pdfTamanio && (
                <span className="vcat-tamanio">{pdfTamanio}</span>
              )}
            </div>
          </div>

          <div className="vcat-header-actions">
            {/* Abrir en nueva pestaña (útil en mobile) */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="vcat-btn-externo"
              title="Abrir en nueva pestaña"
            >
              <IcoExternalLink />
              <span>Nueva pestaña</span>
            </a>

            {/* Cerrar */}
            <button className="vcat-btn-cerrar" onClick={alCerrar}>
              <IcoX />
              <span>Cerrar</span>
            </button>
          </div>
        </div>

        {/* ── Contenido ── */}
        <div className="vcat-body">
          {/* Spinner mientras carga */}
          {cargando && (
            <div className="vcat-loading">
              <div className="vcat-spinner" style={{ borderTopColor: accentColor }} />
              <span>Cargando catálogo...</span>
            </div>
          )}

          {/* iframe PDF */}
          <iframe
            key={pdfUrl}
            src={pdfUrl}
            title={pdfNombre}
            className="vcat-iframe"
            style={{ opacity: cargando ? 0 : 1 }}
            onLoad={() => setCargando(false)}
          />
        </div>

        {/* ── Footer ── */}
        <div className="vcat-footer">
          <span className="vcat-footer-hint">
            💡 Usa los controles del visor para navegar páginas, hacer zoom y descargar
          </span>
          <button
            className="vcat-footer-cerrar"
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
