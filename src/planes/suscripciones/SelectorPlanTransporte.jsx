import React, { useState, useRef, useEffect } from "react";
import "./ModalPlanesTransporte.css";
import VisorCatalogoPDF from "../../ui/visor-catalogo/VisorCatalogoPDF";
import {
  PRECIOS_TRANSPORTE,
  FEATURES_LISTA_TRANSPORTE,
  FEATURES_TRANSPORTE,
  CHATBOT_PREGUNTAS_TRANSPORTE,
  CHATBOT_RESPUESTAS_TRANSPORTE,
  CHATBOT_BIENVENIDA_TRANSPORTE,
} from "./transporte.data.js";


/* ═══════════════════════════════════════════
   ÍCONOS
═══════════════════════════════════════════ */
function IconoTransporte({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#1E40AF" />
      <rect x="8"  y="26" width="7"  height="12" rx="1.5" fill="white" />
      <rect x="20" y="18" width="7"  height="20" rx="1.5" fill="#93C5FD" />
      <rect x="33" y="12" width="7"  height="26" rx="1.5" fill="white" />
      <path d="M11.5 20 L23.5 13 L36.5 8" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
      <circle cx="11.5" cy="20" r="2.5" fill="white" />
      <circle cx="23.5" cy="13" r="2.5" fill="white" />
      <circle cx="36.5" cy="8"  r="2.5" fill="white" />
    </svg>
  );
}

function IconoCheck({ dark = false }) {
  const bg    = dark ? "rgba(255,255,255,0.2)" : "#DBEAFE";
  const color = dark ? "#fff"                  : "#1D4ED8";
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
      <rect width="36" height="36" rx="8" fill="#DBEAFE" />
      <path d="M10 8h12l6 6v18H10V8z" fill="#1D4ED8" />
      <path d="M22 8l6 6h-6V8z" fill="#1E3A8A" />
      <text x="13" y="26" fontSize="7" fill="white" fontWeight="bold">PDF</text>
    </svg>
  );
}


/* ═══════════════════════════════════════════
   POPOVER DETALLE DE FEATURE
═══════════════════════════════════════════ */
function PopoverDetalleFeature({ nombreFeature, onCerrar }) {
  const info = FEATURES_TRANSPORTE[nombreFeature];
  if (!info) return null;

  return (
    <div className="mgt-popover-overlay" onClick={onCerrar}>
      <div className="mgt-popover" onClick={(e) => e.stopPropagation()}>
        <button className="mgt-popover-close" onClick={onCerrar}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 2L8 8M8 2L2 8" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
        <h4 className="mgt-popover-titulo">{info.titulo}</h4>
        <p className="mgt-popover-desc">{info.desc}</p>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════
   COMPONENTE PRINCIPAL
═══════════════════════════════════════════ */
function SelectorPlanTransporte({ estaAbierto, alCerrar, alProcederPago }) {

  const [periodoFacturacion, setPeriodoFacturacion] = useState("mensual");
  const [planSeleccionado,   setPlanSeleccionado]   = useState(null);
  const [featureAbierta,     setFeatureAbierta]     = useState(null);
  const [chatVisible,        setChatVisible]        = useState(false);
  const [visorPdf,           setVisorPdf]           = useState(null);

  const [mensajesChat, setMensajesChat] = useState([CHATBOT_BIENVENIDA_TRANSPORTE]);
  const [inputChat,    setInputChat]    = useState("");
  const refFinChat = useRef(null);

  /* ── Drag-scroll en el scroll horizontal de planes ── */
  const refPlanesScroll = useRef(null);
  const dragScroll = useRef({ activo: false, startX: 0, scrollLeft: 0 });
  const handlePlanesMouseDown = (e) => {
    dragScroll.current = { activo: true, startX: e.pageX - refPlanesScroll.current.offsetLeft, scrollLeft: refPlanesScroll.current.scrollLeft };
  };
  const handlePlanesMouseMove = (e) => {
    if (!dragScroll.current.activo) return;
    e.preventDefault();
    const x = e.pageX - refPlanesScroll.current.offsetLeft;
    refPlanesScroll.current.scrollLeft = dragScroll.current.scrollLeft - (x - dragScroll.current.startX);
  };
  const handlePlanesMouseUp = () => { dragScroll.current.activo = false; };

  useEffect(() => {
    if (chatVisible) refFinChat.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajesChat, chatVisible]);

  const handleClose = () => {
    setPlanSeleccionado(null);
    setFeatureAbierta(null);
    setChatVisible(false);
    setMensajesChat([CHATBOT_BIENVENIDA_TRANSPORTE]);
    alCerrar();
  };

  if (!estaAbierto) return null;

  const handleClickOverlay = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const labelPeriodo = periodoFacturacion === "mensual" ? "/mes" : "/año";
  const precioTransporte = PRECIOS_TRANSPORTE.transporte[periodoFacturacion];

  const handleConfirmarPlan = () => {
    const precio = planSeleccionado === "gratis" ? "0" : precioTransporte.replace(",", "");
    alProcederPago?.({ planNombre: planSeleccionado, precio, billing: periodoFacturacion });
  };

  const handleEnviarChat = (texto) => {
    if (!texto.trim()) return;
    const hora = new Date().toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });
    setMensajesChat((prev) => [...prev, { tipo: "usuario", texto, hora }]);
    setInputChat("");
    setTimeout(() => {
      const resp = CHATBOT_RESPUESTAS_TRANSPORTE[texto] ||
        "Gracias por tu consulta. Un asesor te contactará pronto para brindarte más información.";
      setMensajesChat((prev) => [...prev, { tipo: "bot", texto: resp, hora }]);
    }, 800);
  };


  const nombrePlanDisplay = planSeleccionado === "gratis" ? "Gratis"
    : planSeleccionado === "transporte" ? "Plan Transporte" : "";


  /* ═══════════════════════════════════════
     RENDER
  ═══════════════════════════════════════ */
  return (
    <div className="mgt-overlay" onClick={handleClickOverlay}>
      <div className="mgt-modal">

        {/* Cerrar */}
        <button className="mgt-close" onClick={handleClose}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2L12 12M12 2L2 12" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Body */}
        <div className="mgt-body">
          <div className={`mgt-planes-wrap${chatVisible ? " mgt-planes-wrap--dimmed" : ""}`}>

            {/* Volver */}
            <button className="mgt-volver" onClick={handleClose}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Volver
            </button>

            {/* Header */}
            <div className="mgt-header">
              <IconoTransporte size={48} />
              <h2 className="mgt-titulo">Gestión-Plex Transporte</h2>
              <p className="mgt-subtitulo">
                Software especializado para empresas de transporte ,elige el plan perfecto para ti&nbsp; con comprobantes ilimitados
              </p>

              <div className="mgt-badges">
                <span className="mgt-badge-pill">1 mes gratis</span>
                <span className="mgt-badge-pill">IGV incluido</span>
                <span className="mgt-badge-pill">Actualizaciones</span>
                <span className="mgt-badge-pill">Usuarios ilimitados</span>
              </div>

              <div className="mgt-toggle">
                <button
                  className={`mgt-toggle-btn${periodoFacturacion === "mensual" ? " mgt-toggle-btn--active" : ""}`}
                  onClick={() => setPeriodoFacturacion("mensual")}
                >Mensual</button>
                <button
                  className={`mgt-toggle-btn${periodoFacturacion === "anual" ? " mgt-toggle-btn--active" : ""}`}
                  onClick={() => setPeriodoFacturacion("anual")}
                >Anual</button>
              </div>
            </div>

            {/* Scroll horizontal de planes */}
            <div
              className="mgt-planes"
              ref={refPlanesScroll}
              onMouseDown={handlePlanesMouseDown}
              onMouseMove={handlePlanesMouseMove}
              onMouseUp={handlePlanesMouseUp}
              onMouseLeave={handlePlanesMouseUp}
            >

              {/* ── Plan Gratis ── */}
              <div className={`mgt-plan mgt-plan--compact${planSeleccionado === "gratis" ? " mgt-plan--selected" : ""}`}>
                <h3 className="mgt-plan-nombre">Gratis</h3>

                <div className="mgt-precio">
                  <span className="mgt-precio-moneda">s/</span>
                  <span className="mgt-precio-num">0</span>
                  <span className="mgt-precio-per">{labelPeriodo}</span>
                </div>

                <div className="mgt-plan-tags">
                  <span className="mgt-tag mgt-tag--outline">1 Empresa</span>
                  <span className="mgt-tag mgt-tag--outline">1 sedes/transp.</span>
                </div>

                <ul className="mgt-features">
                  {FEATURES_LISTA_TRANSPORTE.map((f) => (
                    <li key={f} className="mgt-feature-clickable" onClick={() => setFeatureAbierta(f)}>
                      <IconoCheck />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`mgt-btn-plan mgt-btn-plan--outline${planSeleccionado === "gratis" ? " mgt-btn-plan--sel" : ""}`}
                  onClick={() => setPlanSeleccionado("gratis")}
                >
                  {planSeleccionado === "gratis" ? "Seleccionado" : "Elegir Plan"}
                </button>
              </div>

              {/* ── Plan Transporte (dark) ── */}
              <div className={`mgt-plan mgt-plan--compact mgt-plan--dark${planSeleccionado === "transporte" ? " mgt-plan--dark-sel" : ""}`}>
                <div className="mgt-popular-badge">TODO INCLUIDO</div>

                <h3 className="mgt-plan-nombre mgt-plan-nombre--white">Plan Transporte</h3>

                <div className="mgt-precio mgt-precio--white">
                  <span className="mgt-precio-moneda">s/</span>
                  <span className="mgt-precio-num">{precioTransporte}</span>
                  <span className="mgt-precio-per">{labelPeriodo}</span>
                </div>

                <div className="mgt-plan-tags">
                  <span className="mgt-tag mgt-tag--white">1 Empresa</span>
                  <span className="mgt-tag mgt-tag--white">3 sedes/transp.</span>
                </div>

                <ul className="mgt-features mgt-features--white">
                  {FEATURES_LISTA_TRANSPORTE.map((f) => (
                    <li key={f} className="mgt-feature-clickable" onClick={() => setFeatureAbierta(f)}>
                      <IconoCheck dark />
                      <span><u>{f}</u></span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`mgt-btn-plan mgt-btn-plan--dark-outline${planSeleccionado === "transporte" ? " mgt-btn-plan--dark-sel" : ""}`}
                  onClick={() => setPlanSeleccionado("transporte")}
                >
                  {planSeleccionado === "transporte" ? "Seleccionado" : "Elegir Plan"}
                </button>
              </div>

            </div>{/* /mgt-planes */}

            {/* Hint chat */}
            <div className="mgt-footer-hint" onClick={() => setChatVisible(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span>¿Tienes dudas sobre los planes?</span>
            </div>

            {planSeleccionado && (
              <button className="mgt-btn-continuar" onClick={handleConfirmarPlan}>
                Continuar con {nombrePlanDisplay}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            )}

          </div>{/* /mgt-planes-wrap */}

          {chatVisible && (
            <div className="mgt-chat-backdrop" onClick={() => setChatVisible(false)} />
          )}

          {/* Panel chat */}
          {chatVisible && (
            <div className="mgt-chat">
              <div className="mgt-chat-header">
                <div className="mgt-chat-header-left">
                  <div className="mgt-chat-avatar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="mgt-chat-nombre">Asistente Transporte</div>
                    <div className="mgt-chat-estado">
                      <span className="mgt-online-dot" />
                      En línea · Catálogo cargado
                    </div>
                  </div>
                </div>
                <button className="mgt-chat-close" onClick={() => setChatVisible(false)}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 2L10 10M10 2L2 10" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div
                className="mgt-chat-pdf"
                style={{ cursor: "pointer" }}
                onClick={() => setVisorPdf({
                  url: "/catalogos/gestionplex-transporte-2025.pdf",
                  nombre: "Catálogo GestiónPlex Transporte 2025.pdf",
                  tamanio: "PDF · Catálogo completo de planes"
                })}
              >
                <IconoPdf />
                <div className="mgt-chat-pdf-info">
                  <span className="mgt-chat-pdf-name">Catálogo GestiónPlex Transporte 2025.pdf</span>
                  <span className="mgt-chat-pdf-hint">Toca para ver el catálogo completo de planes</span>
                </div>
                <button
                  className="mgt-chat-pdf-ver"
                  onClick={(e) => { e.stopPropagation(); setVisorPdf({
                    url: "/catalogos/gestionplex-transporte-2025.pdf",
                    nombre: "Catálogo GestiónPlex Transporte 2025.pdf",
                    tamanio: "PDF · Catálogo completo de planes"
                  }); }}
                >
                  Ver&nbsp;
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="mgt-chat-messages">
                {mensajesChat.map((msg, i) => (
                  <div key={i} className={`mgt-msg mgt-msg--${msg.tipo}`}>
                    {msg.tipo === "bot" && (
                      <div className="mgt-msg-avatar-bot">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="mgt-msg-content">
                      <p className="mgt-msg-texto">{msg.texto}</p>
                      <span className="mgt-msg-hora">{msg.hora}</span>
                    </div>
                  </div>
                ))}
                <div ref={refFinChat} />
              </div>

              <div className="mgt-quick-replies">
                {CHATBOT_PREGUNTAS_TRANSPORTE.map((q) => (
                  <button key={q} className="mgt-quick-btn" onClick={() => handleEnviarChat(q)}>
                    {q}
                  </button>
                ))}
              </div>

              <div className="mgt-chat-input-row">
                <button className="mgt-chat-attach">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                  </svg>
                </button>
                <input
                  className="mgt-chat-input"
                  placeholder="Escribe tu pregunta..."
                  value={inputChat}
                  onChange={(e) => setInputChat(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleEnviarChat(inputChat)}
                />
                <button className="mgt-chat-send" onClick={() => handleEnviarChat(inputChat)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2.2" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          )}{/* /mgt-chat */}

        </div>{/* /mgt-body */}

        {/* Popover feature */}
        {featureAbierta && (
          <PopoverDetalleFeature
            nombreFeature={featureAbierta}
            onCerrar={() => setFeatureAbierta(null)}
          />
        )}

        {/* FAB chat */}
        <button
          className={`mgt-fab-chat${chatVisible ? " mgt-fab-chat--active" : ""}`}
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

      </div>{/* /mgt-modal */}

      <VisorCatalogoPDF
        estaAbierto={!!visorPdf}
        alCerrar={() => setVisorPdf(null)}
        pdfUrl={visorPdf?.url || ""}
        pdfNombre={visorPdf?.nombre || ""}
        pdfTamanio={visorPdf?.tamanio || ""}
        accentColor="#1D4ED8"
      />

    </div>
  );
}

export default SelectorPlanTransporte;
