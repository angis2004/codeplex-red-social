import React, { useState, useRef, useEffect } from "react";
import "./ModalPlanesGrifo.css";
import VisorCatalogoPDF from "../../ui/visor-catalogo/VisorCatalogoPDF";
import {
  PRECIOS_GRIFO,
  FEATURES_LISTA_GRIFO,
  FEATURES_GRIFO,
  CHATBOT_PREGUNTAS_GRIFO,
  CHATBOT_RESPUESTAS_GRIFO,
  CHATBOT_BIENVENIDA_GRIFO,
} from "./grifo.data.js";


/* ═══════════════════════════════════════════
   ÍCONOS
═══════════════════════════════════════════ */
function IconoGrifo({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#B91C1C" />
      <rect x="8"  y="28" width="7"  height="12" rx="1.5" fill="white" />
      <rect x="20" y="20" width="7"  height="20" rx="1.5" fill="#FCA5A5" />
      <rect x="33" y="12" width="7"  height="28" rx="1.5" fill="white" />
      <path d="M11.5 22 L23.5 15 L36.5 8" stroke="#FCA5A5" strokeWidth="2" strokeLinecap="round" />
      <circle cx="11.5" cy="22" r="2.5" fill="white" />
      <circle cx="23.5" cy="15" r="2.5" fill="white" />
      <circle cx="36.5" cy="8"  r="2.5" fill="white" />
    </svg>
  );
}

function IconoCheck({ dark = false }) {
  const bg    = dark ? "rgba(255,255,255,0.2)" : "#FEE2E2";
  const color = dark ? "#fff"                  : "#B91C1C";
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="7.5" cy="7.5" r="7.5" fill={bg} />
      <path d="M4.5 7.5L6.5 9.5L10.5 5.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconoPdf() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect width="36" height="36" rx="8" fill="#FEE2E2" />
      <path d="M10 8h12l6 6v18H10V8z" fill="#B91C1C" />
      <path d="M22 8l6 6h-6V8z" fill="#7F1D1D" />
      <text x="13" y="26" fontSize="7" fill="white" fontWeight="bold">PDF</text>
    </svg>
  );
}


/* ═══════════════════════════════════════════
   POPOVER DETALLE DE FEATURE
═══════════════════════════════════════════ */
function PopoverDetalleFeature({ nombreFeature, onCerrar }) {
  const info = FEATURES_GRIFO[nombreFeature];
  if (!info) return null;

  return (
    <div className="mgg-popover-overlay" onClick={onCerrar}>
      <div className="mgg-popover" onClick={(e) => e.stopPropagation()}>
        <button className="mgg-popover-close" onClick={onCerrar}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 2L8 8M8 2L2 8" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
        <h4 className="mgg-popover-titulo">{info.titulo}</h4>
        <p className="mgg-popover-desc">{info.desc}</p>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════
   COMPONENTE PRINCIPAL
═══════════════════════════════════════════ */
function SelectorPlanGrifo({ isOpen, onClose, onProcederPago }) {

  const [periodoFacturacion, setPeriodoFacturacion] = useState("mensual");
  const [planSeleccionado,   setPlanSeleccionado]   = useState(null);
  const [featureAbierta,     setFeatureAbierta]     = useState(null);
  const [chatVisible,        setChatVisible]        = useState(false);
  const [visorPdf,           setVisorPdf]           = useState(null);

  const [mensajesChat, setMensajesChat] = useState([CHATBOT_BIENVENIDA_GRIFO]);
  const [inputChat,    setInputChat]    = useState("");
  const refFinChat = useRef(null);

  useEffect(() => {
    if (chatVisible) refFinChat.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajesChat, chatVisible]);

  const handleClose = () => {
    setPlanSeleccionado(null);
    setFeatureAbierta(null);
    setChatVisible(false);
    setMensajesChat([CHATBOT_BIENVENIDA_GRIFO]);
    onClose();
  };

  if (!isOpen) return null;

  const handleClickOverlay = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const labelPeriodo   = periodoFacturacion === "mensual" ? "/mes" : "/año";
  const precioGrifo    = PRECIOS_GRIFO.grifo[periodoFacturacion];

  const handleConfirmarPlan = () => {
    const precio = planSeleccionado === "gratis" ? "0" : precioGrifo.replace(",", "");
    onProcederPago?.({ planNombre: planSeleccionado, precio, billing: periodoFacturacion });
  };

  const handleEnviarChat = (texto) => {
    if (!texto.trim()) return;
    const hora = new Date().toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });
    setMensajesChat((prev) => [...prev, { tipo: "usuario", texto, hora }]);
    setInputChat("");
    setTimeout(() => {
      const resp = CHATBOT_RESPUESTAS_GRIFO[texto] ||
        "Gracias por tu consulta. Un asesor te contactará pronto para brindarte más información.";
      setMensajesChat((prev) => [...prev, { tipo: "bot", texto: resp, hora }]);
    }, 800);
  };


  const nombrePlanDisplay = planSeleccionado === "gratis" ? "Gratis"
    : planSeleccionado === "grifo" ? "Plan Grifo" : "";


  return (
    <div className="mgg-overlay" onClick={handleClickOverlay}>
      <div className="mgg-modal">

        {/* Cerrar */}
        <button className="mgg-close" onClick={handleClose}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2L12 12M12 2L2 12" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Body */}
        <div className="mgg-body">
          <div className={`mgg-planes-wrap${chatVisible ? " mgg-planes-wrap--dimmed" : ""}`}>

            {/* Volver */}
            <button className="mgg-volver" onClick={handleClose}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Volver
            </button>

            {/* Header */}
            <div className="mgg-header">
              <IconoGrifo size={48} />
              <h2 className="mgg-titulo">Gestión-Plex Grifo</h2>
              <p className="mgg-subtitulo">
                Software especializado para grifos ,elige el plan perfecto para ti&nbsp; con comprobantes ilimitados
              </p>

              <div className="mgg-badges">
                <span className="mgg-badge-pill">1 mes gratis</span>
                <span className="mgg-badge-pill">IGV incluido</span>
                <span className="mgg-badge-pill">Actualizaciones</span>
                <span className="mgg-badge-pill">S/3,000 implementación</span>
              </div>

              <div className="mgg-toggle">
                <button
                  className={`mgg-toggle-btn${periodoFacturacion === "mensual" ? " mgg-toggle-btn--active" : ""}`}
                  onClick={() => setPeriodoFacturacion("mensual")}
                >Mensual</button>
                <button
                  className={`mgg-toggle-btn${periodoFacturacion === "anual" ? " mgg-toggle-btn--active" : ""}`}
                  onClick={() => setPeriodoFacturacion("anual")}
                >Anual</button>
              </div>
            </div>

            {/* Grid de planes */}
            <div className="mgg-planes">

              {/* ── Plan Gratis ── */}
              <div className={`mgg-plan${planSeleccionado === "gratis" ? " mgg-plan--selected" : ""}`}>
                <h3 className="mgg-plan-nombre">Gratis</h3>

                <div className="mgg-precio">
                  <span className="mgg-precio-moneda">s/</span>
                  <span className="mgg-precio-num">0</span>
                  <span className="mgg-precio-per">{labelPeriodo}</span>
                </div>

                <div className="mgg-plan-tags">
                  <span className="mgg-tag mgg-tag--outline">1 Empresa</span>
                  <span className="mgg-tag mgg-tag--outline">Ilimitados</span>
                </div>

                <ul className="mgg-features">
                  {FEATURES_LISTA_GRIFO.map((f) => (
                    <li key={f} className="mgg-feature-clickable" onClick={() => setFeatureAbierta(f)}>
                      <IconoCheck />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`mgg-btn-plan mgg-btn-plan--outline${planSeleccionado === "gratis" ? " mgg-btn-plan--sel" : ""}`}
                  onClick={() => setPlanSeleccionado("gratis")}
                >
                  {planSeleccionado === "gratis" ? "Seleccionado" : "Elegir Plan"}
                </button>
              </div>

              {/* ── Plan Grifo (dark) ── */}
              <div className={`mgg-plan mgg-plan--dark${planSeleccionado === "grifo" ? " mgg-plan--dark-sel" : ""}`}>
                <div className="mgg-popular-badge">TODO INCLUIDO</div>

                <h3 className="mgg-plan-nombre mgg-plan-nombre--white">Plan Grifo</h3>

                <div className="mgg-precio mgg-precio--white">
                  <span className="mgg-precio-moneda">s/</span>
                  <span className="mgg-precio-num">{precioGrifo}</span>
                  <span className="mgg-precio-per">{labelPeriodo}</span>
                </div>

                <div className="mgg-plan-tags">
                  <span className="mgg-tag mgg-tag--white">1 Empresa</span>
                  <span className="mgg-tag mgg-tag--white">Ilimitados</span>
                </div>

                <ul className="mgg-features mgg-features--white">
                  {FEATURES_LISTA_GRIFO.map((f) => (
                    <li key={f} className="mgg-feature-clickable" onClick={() => setFeatureAbierta(f)}>
                      <IconoCheck dark />
                      <span><u>{f}</u></span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`mgg-btn-plan mgg-btn-plan--dark-outline${planSeleccionado === "grifo" ? " mgg-btn-plan--dark-sel" : ""}`}
                  onClick={() => setPlanSeleccionado("grifo")}
                >
                  {planSeleccionado === "grifo" ? "Seleccionado" : "Elegir Plan"}
                </button>
              </div>

            </div>{/* /mgg-planes */}

            {/* Hint chat */}
            <div className="mgg-footer-hint" onClick={() => setChatVisible(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span>¿Tienes dudas sobre los planes?</span>
            </div>

            {planSeleccionado && (
              <button className="mgg-btn-continuar" onClick={handleConfirmarPlan}>
                Continuar con {nombrePlanDisplay}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            )}

          </div>{/* /mgg-planes-wrap */}

          {chatVisible && (
            <div className="mgg-chat-backdrop" onClick={() => setChatVisible(false)} />
          )}

          {/* Panel chat */}
          {chatVisible && (
            <div className="mgg-chat">
              <div className="mgg-chat-header">
                <div className="mgg-chat-header-left">
                  <div className="mgg-chat-avatar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="mgg-chat-nombre">Asistente Grifo</div>
                    <div className="mgg-chat-estado">
                      <span className="mgg-online-dot" />
                      En línea · Catálogo cargado
                    </div>
                  </div>
                </div>
                <button className="mgg-chat-close" onClick={() => setChatVisible(false)}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 2L10 10M10 2L2 10" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div
                className="mgg-chat-pdf"
                style={{ cursor: "pointer" }}
                onClick={() => setVisorPdf({
                  url: "/catalogos/gestionplex-grifo-2025.pdf",
                  nombre: "Catálogo GestiónPlex Grifo 2025.pdf",
                  tamanio: "PDF · Catálogo completo de planes"
                })}
              >
                <IconoPdf />
                <div className="mgg-chat-pdf-info">
                  <span className="mgg-chat-pdf-name">Catálogo GestiónPlex Grifo 2025.pdf</span>
                  <span className="mgg-chat-pdf-hint">Toca para ver el catálogo completo de planes</span>
                </div>
                <button
                  className="mgg-chat-pdf-ver"
                  onClick={(e) => { e.stopPropagation(); setVisorPdf({
                    url: "/catalogos/gestionplex-grifo-2025.pdf",
                    nombre: "Catálogo GestiónPlex Grifo 2025.pdf",
                    tamanio: "PDF · Catálogo completo de planes"
                  }); }}
                >
                  Ver&nbsp;
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="mgg-chat-messages">
                {mensajesChat.map((msg, i) => (
                  <div key={i} className={`mgg-msg mgg-msg--${msg.tipo}`}>
                    {msg.tipo === "bot" && (
                      <div className="mgg-msg-avatar-bot">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="mgg-msg-content">
                      <p className="mgg-msg-texto">{msg.texto}</p>
                      <span className="mgg-msg-hora">{msg.hora}</span>
                    </div>
                  </div>
                ))}
                <div ref={refFinChat} />
              </div>

              <div className="mgg-quick-replies">
                {CHATBOT_PREGUNTAS_GRIFO.map((q) => (
                  <button key={q} className="mgg-quick-btn" onClick={() => handleEnviarChat(q)}>
                    {q}
                  </button>
                ))}
              </div>

              <div className="mgg-chat-input-row">
                <button className="mgg-chat-attach">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                  </svg>
                </button>
                <input
                  className="mgg-chat-input"
                  placeholder="Escribe tu pregunta..."
                  value={inputChat}
                  onChange={(e) => setInputChat(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleEnviarChat(inputChat)}
                />
                <button className="mgg-chat-send" onClick={() => handleEnviarChat(inputChat)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2.2" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          )}{/* /mgg-chat */}

        </div>{/* /mgg-body */}

        {/* Popover feature */}
        {featureAbierta && (
          <PopoverDetalleFeature
            nombreFeature={featureAbierta}
            onCerrar={() => setFeatureAbierta(null)}
          />
        )}

        {/* FAB chat */}
        <button
          className={`mgg-fab-chat${chatVisible ? " mgg-fab-chat--active" : ""}`}
          onClick={() => setChatVisible(!chatVisible)}
        >
          {chatVisible ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="white" />
            </svg>
          )}
        </button>

      </div>{/* /mgg-modal */}

      <VisorCatalogoPDF
        isOpen={!!visorPdf}
        onClose={() => setVisorPdf(null)}
        pdfUrl={visorPdf?.url || ""}
        pdfNombre={visorPdf?.nombre || ""}
        pdfTamanio={visorPdf?.tamanio || ""}
        accentColor="#B91C1C"
      />

    </div>
  );
}

export default SelectorPlanGrifo;
