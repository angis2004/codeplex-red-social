import React, { useState, useRef, useEffect } from "react";
import "./ModalPlanesGestionPlex.css";
import VisorCatalogoPDF from "../../ui/visor-catalogo/VisorCatalogoPDF";
import {
  PLANES_COMERCIAL,
  CHATBOT_PREGUNTAS_COMERCIAL,
  CHATBOT_RESPUESTAS_COMERCIAL,
  CHATBOT_BIENVENIDA_COMERCIAL,
  FEATURES_COMERCIAL,
} from "./gestionplex.data.js";


function PopoverDetalleFeature({ nombreFeature, onCerrar }) {
  const info = FEATURES_COMERCIAL[nombreFeature];
  if (!info) return null;
  return (
    <div className="mgpc-popover-overlay" onClick={onCerrar}>
      <div className="mgpc-popover" onClick={(e) => e.stopPropagation()}>
        <button className="mgpc-popover-close" onClick={onCerrar}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 2l6 6M8 2l-6 6" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
        <h4 className="mgpc-popover-titulo">{info.titulo}</h4>
        <p className="mgpc-popover-desc">{info.desc}</p>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════
   ÍCONOS
═══════════════════════════════════════════ */
function IconoGestionPlex({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#0D9488" />
      <rect x="8"  y="30" width="8"  height="10" rx="2" fill="white" />
      <rect x="20" y="22" width="8"  height="18" rx="2" fill="#99F6E4" />
      <rect x="32" y="14" width="8"  height="26" rx="2" fill="white" />
      <path d="M12 22 L24 16 L36 10" stroke="#99F6E4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="22" r="2.5" fill="white" />
      <circle cx="24" cy="16" r="2.5" fill="white" />
      <circle cx="36" cy="10" r="2.5" fill="white" />
    </svg>
  );
}

function IconoCheck({ dark = false }) {
  const bg    = dark ? "rgba(255,255,255,0.2)" : "#CCFBF1";
  const color = dark ? "#fff"                  : "#0D9488";
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="7.5" cy="7.5" r="7.5" fill={bg} />
      <path d="M4.5 7.5L6.5 9.5L10.5 5.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconoX({ dark = false }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="5" cy="5" r="5" fill={dark ? "rgba(255,255,255,0.15)" : "#FEE2E2"} />
      <path d="M3.5 3.5L6.5 6.5M6.5 3.5L3.5 6.5" stroke={dark ? "rgba(255,255,255,0.5)" : "#EF4444"} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IconoPdf() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect width="36" height="36" rx="8" fill="#CCFBF1" />
      <path d="M10 8h12l6 6v18H10V8z" fill="#0D9488" />
      <path d="M22 8l6 6h-6V8z" fill="#0B7A6E" />
      <text x="13" y="26" fontSize="7" fill="white" fontWeight="bold">PDF</text>
    </svg>
  );
}


/* ═══════════════════════════════════════════
   TARJETA DE PLAN
═══════════════════════════════════════════ */
function PlanCard({ plan, periodo, seleccionado, onSeleccionar, onFeatureClick }) {
  const precio   = plan.precio[periodo];
  const labelPer = periodo === "mensual" ? "/mes" : "/año";

  return (
    <div
      className={[
        "mgpc-plan",
        plan.dark    ? "mgpc-plan--dark"     : "",
        plan.popular ? "mgpc-plan--popular"  : "",
        seleccionado ? "mgpc-plan--selected" : "",
      ].filter(Boolean).join(" ")}
    >
      {plan.popular && <div className="mgpc-popular-badge">MAS POPULAR</div>}

      <h3 className={`mgpc-plan-nombre${plan.dark ? " mgpc-plan-nombre--white" : ""}`}>
        {plan.nombre}
      </h3>

      <div className={`mgpc-precio${plan.dark ? " mgpc-precio--white" : ""}`}>
        <span className="mgpc-precio-moneda">s/</span>
        <span className="mgpc-precio-num">{precio}</span>
        <span className="mgpc-precio-per">{labelPer}</span>
      </div>

      <div className="mgpc-plan-tags">
        <span className={`mgpc-tag${plan.dark ? " mgpc-tag--white" : " mgpc-tag--filled"}`}>
          {plan.empresas}
        </span>
      </div>

      <ul className={`mgpc-features${plan.dark ? " mgpc-features--white" : ""}`}>
        {plan.features.map((f, i) => (
          <li
            key={i}
            className={f.check === false ? "mgpc-feature-disabled" : ""}
          >
            {f.check === true
              ? <IconoCheck dark={plan.dark} />
              : <IconoX dark={plan.dark} />}
            <span
              className={[
                f.highlight ? "mgpc-feature-highlight" : "",
                FEATURES_COMERCIAL[f.texto] ? "mgpc-feature-clickable" : "",
                plan.dark && FEATURES_COMERCIAL[f.texto] ? "mgpc-feature-clickable--dark" : "",
              ].filter(Boolean).join(" ")}
              onClick={FEATURES_COMERCIAL[f.texto] ? (e) => { e.stopPropagation(); onFeatureClick(f.texto); } : undefined}
            >
              {plan.dark && FEATURES_COMERCIAL[f.texto] ? <u>{f.texto}</u> : f.texto}
            </span>
          </li>
        ))}
      </ul>

      <button
        className={[
          "mgpc-btn-plan",
          plan.dark
            ? (seleccionado ? "mgpc-btn-plan--dark-sel" : "mgpc-btn-plan--dark-outline")
            : (seleccionado ? "mgpc-btn-plan--sel"      : "mgpc-btn-plan--outline"),
        ].join(" ")}
        onClick={onSeleccionar}
      >
        {seleccionado ? "Seleccionado" : "Elegir Plan"}
      </button>
    </div>
  );
}


/* ═══════════════════════════════════════════
   COMPONENTE PRINCIPAL
═══════════════════════════════════════════ */
function SelectorPlanGestionPlex({ estaAbierto, alCerrar, alProcederPago }) {

  const [periodoFacturacion, setPeriodoFacturacion] = useState("mensual");
  const [planSeleccionado,   setPlanSeleccionado]   = useState(null);
  const [chatVisible,        setChatVisible]        = useState(false);
  const [visorPdf,           setVisorPdf]           = useState(null);
  const [featureAbierta,     setFeatureAbierta]     = useState(null);

  /* Chatbot */
  const [mensajesChat, setMensajesChat] = useState([CHATBOT_BIENVENIDA_COMERCIAL]);
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

  /* Reset al cerrar */
  const handleClose = () => {
    setPlanSeleccionado(null);
    setChatVisible(false);
    setMensajesChat([CHATBOT_BIENVENIDA_COMERCIAL]);
    alCerrar();
  };

  if (!estaAbierto) return null;

  const handleClickOverlay = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const handleConfirmarPlan = () => {
    const plan = PLANES_COMERCIAL.find((p) => p.id === planSeleccionado);
    if (!plan) return;
    alProcederPago?.({
      planNombre: plan.id,
      precio: plan.precio[periodoFacturacion].replace(",", ""),
      billing: periodoFacturacion,
    });
  };

  const handleEnviarChat = (texto) => {
    if (!texto.trim()) return;
    const hora = new Date().toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });
    setMensajesChat((prev) => [...prev, { tipo: "usuario", texto, hora }]);
    setInputChat("");
    setTimeout(() => {
      const resp = CHATBOT_RESPUESTAS_COMERCIAL[texto] ||
        "Gracias por tu consulta. Un asesor te contactará pronto para brindarte más información.";
      setMensajesChat((prev) => [...prev, { tipo: "bot", texto: resp, hora }]);
    }, 800);
  };

  const nombrePlanDisplay = PLANES_COMERCIAL.find((p) => p.id === planSeleccionado)?.nombre || "";


  /* ═══════════════════════════════════════
     RENDER
  ═══════════════════════════════════════ */
  return (
    <div className="mgpc-overlay" onClick={handleClickOverlay}>
      <div className="mgpc-modal">

        {/* ── Cerrar ── */}
        <button className="mgpc-close" onClick={handleClose}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2L12 12M12 2L2 12" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>

        {/* ── Body ── */}
        <div className="mgpc-body">
          <div className={`mgpc-planes-wrap${chatVisible ? " mgpc-planes-wrap--dimmed" : ""}`}>

            {/* Botón volver */}
            <button className="mgpc-volver" onClick={handleClose}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Volver
            </button>

            {/* Header */}
            <div className="mgpc-header">
              <IconoGestionPlex size={44} />
              <h2 className="mgpc-titulo">Gestión-Plex Comercial</h2>
              <p className="mgpc-subtitulo">Elige el plan perfecto para ti  con comprobantes ilimitados</p>

              <div className="mgpc-badges">
                <span className="mgpc-badge-pill">1 mes gratis</span>
                <span className="mgpc-badge-pill">IGV incluido</span>
                <span className="mgpc-badge-pill">Actualizaciones</span>
              </div>

              {/* Toggle Mensual / Anual */}
              <div className="mgpc-toggle">
                <button
                  className={`mgpc-toggle-btn${periodoFacturacion === "mensual" ? " mgpc-toggle-btn--active" : ""}`}
                  onClick={() => setPeriodoFacturacion("mensual")}
                >
                  Mensual
                </button>
                <button
                  className={`mgpc-toggle-btn${periodoFacturacion === "anual" ? " mgpc-toggle-btn--active" : ""}`}
                  onClick={() => setPeriodoFacturacion("anual")}
                >
                  Anual
                </button>
              </div>
            </div>

            {/* Planes — scroll horizontal */}
            <div
              className="mgpc-planes-scroll"
              ref={refPlanesScroll}
              onMouseDown={handlePlanesMouseDown}
              onMouseMove={handlePlanesMouseMove}
              onMouseUp={handlePlanesMouseUp}
              onMouseLeave={handlePlanesMouseUp}
            >
              {PLANES_COMERCIAL.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  periodo={periodoFacturacion}
                  seleccionado={planSeleccionado === plan.id}
                  onSeleccionar={() => setPlanSeleccionado(plan.id)}
                  onFeatureClick={setFeatureAbierta}
                />
              ))}
            </div>

            {/* Hint chat */}
            <div className="mgpc-footer-hint" onClick={() => setChatVisible(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2" strokeLinecap="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span>¿Tienes dudas sobre los planes?</span>
            </div>

            {/* Botón confirmar */}
            {planSeleccionado && (
              <button className="mgpc-btn-continuar" onClick={handleConfirmarPlan}>
                Continuar con Plan {nombrePlanDisplay}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            )}

          </div>{/* /mgpc-planes-wrap */}

          {/* Backdrop oscuro (mobile) */}
          {chatVisible && (
            <div className="mgpc-chat-backdrop" onClick={() => setChatVisible(false)} />
          )}

          {/* ── Panel chat ── */}
          {chatVisible && (
            <div className="mgpc-chat">
              {/* Header chat */}
              <div className="mgpc-chat-header">
                <div className="mgpc-chat-header-left">
                  <div className="mgpc-chat-avatar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="mgpc-chat-nombre">Asistente Gestión-Plex</div>
                    <div className="mgpc-chat-estado">
                      <span className="mgpc-online-dot" />
                      En línea · Catálogo cargado
                    </div>
                  </div>
                </div>
                <button className="mgpc-chat-close" onClick={() => setChatVisible(false)}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 2L10 10M10 2L2 10" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* PDF adjunto */}
              <div
                className="mgpc-chat-pdf"
                style={{ cursor: "pointer" }}
                onClick={() => setVisorPdf({
                  url: "/catalogos/gestionplex-comercial-2025.pdf",
                  nombre: "Catálogo GestiónPlex Comercial 2025.pdf",
                  tamanio: "PDF · Catálogo completo de planes"
                })}
              >
                <IconoPdf />
                <div className="mgpc-chat-pdf-info">
                  <span className="mgpc-chat-pdf-name">Catálogo GestiónPlex Comercial 2025.pdf</span>
                  <span className="mgpc-chat-pdf-hint">Toca para ver el catálogo completo de planes</span>
                </div>
                <button
                  className="mgpc-chat-pdf-ver"
                  onClick={(e) => { e.stopPropagation(); setVisorPdf({
                    url: "/catalogos/gestionplex-comercial-2025.pdf",
                    nombre: "Catálogo GestiónPlex Comercial 2025.pdf",
                    tamanio: "PDF · Catálogo completo de planes"
                  }); }}
                >
                  Ver&nbsp;
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Mensajes */}
              <div className="mgpc-chat-messages">
                {mensajesChat.map((msg, i) => (
                  <div key={i} className={`mgpc-msg mgpc-msg--${msg.tipo}`}>
                    {msg.tipo === "bot" && (
                      <div className="mgpc-msg-avatar-bot">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2" strokeLinecap="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="mgpc-msg-content">
                      <p className="mgpc-msg-texto">{msg.texto}</p>
                      <span className="mgpc-msg-hora">{msg.hora}</span>
                    </div>
                  </div>
                ))}
                <div ref={refFinChat} />
              </div>

              {/* Quick replies */}
              <div className="mgpc-quick-replies">
                {CHATBOT_PREGUNTAS_COMERCIAL.map((q) => (
                  <button key={q} className="mgpc-quick-btn" onClick={() => handleEnviarChat(q)}>
                    {q}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="mgpc-chat-input-row">
                <button className="mgpc-chat-attach">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                  </svg>
                </button>
                <input
                  className="mgpc-chat-input"
                  placeholder="Escribe tu pregunta..."
                  value={inputChat}
                  onChange={(e) => setInputChat(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleEnviarChat(inputChat)}
                />
                <button className="mgpc-chat-send" onClick={() => handleEnviarChat(inputChat)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2.2" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          )}{/* /mgpc-chat */}

        </div>{/* /mgpc-body */}

        {/* FAB chat */}
        <button
          className={`mgpc-fab-chat${chatVisible ? " mgpc-fab-chat--active" : ""}`}
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

        {featureAbierta && (
          <PopoverDetalleFeature
            nombreFeature={featureAbierta}
            onCerrar={() => setFeatureAbierta(null)}
          />
        )}

      </div>{/* /mgpc-modal */}

      <VisorCatalogoPDF
        estaAbierto={!!visorPdf}
        alCerrar={() => setVisorPdf(null)}
        pdfUrl={visorPdf?.url || ""}
        pdfNombre={visorPdf?.nombre || ""}
        pdfTamanio={visorPdf?.tamanio || ""}
        accentColor="#0D9488"
      />

    </div>
  );
}

export default SelectorPlanGestionPlex;
