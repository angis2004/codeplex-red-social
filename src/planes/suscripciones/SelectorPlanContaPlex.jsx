import React, { useState, useRef, useEffect } from "react";
import "./ModalPlanesContaPlex.css";
import VisorCatalogoPDF from "../../compartido/visor-catalogo/VisorCatalogoPDF";
import {
  PLANES_IND,
  PLANES_EMP,
  CHATBOT_QUICK,
  CHATBOT_RESPUESTAS,
  CHATBOT_MSG_INICIAL,
  FEATURES_INFO,
} from "./contaplex.data";

function PopoverDetalleFeature({ nombreFeature, onCerrar }) {
  const info = FEATURES_INFO[nombreFeature];
  if (!info) return null;
  return (
    <div className="mpc-popover-overlay" onClick={onCerrar}>
      <div className="mpc-popover" onClick={(e) => e.stopPropagation()}>
        <button className="mpc-popover-close" onClick={onCerrar}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 2l6 6M8 2l-6 6" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
        <h4 className="mpc-popover-titulo">{info.titulo}</h4>
        <p className="mpc-popover-desc">{info.desc}</p>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════
   ÍCONOS
═══════════════════════════════════════════ */
function IconoContaPlex({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#0094C0" />
      <rect x="10" y="28" width="6"  height="11" rx="1.5" fill="white" />
      <rect x="21" y="20" width="6"  height="19" rx="1.5" fill="#7DE0F5" />
      <rect x="32" y="10" width="6"  height="29" rx="1.5" fill="white" />
    </svg>
  );
}

function IconoContaPlexSm({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#0094C0" />
      <rect x="10" y="28" width="6"  height="11" rx="1.5" fill="white" />
      <rect x="21" y="20" width="6"  height="19" rx="1.5" fill="#7DE0F5" />
      <rect x="32" y="10" width="6"  height="29" rx="1.5" fill="white" />
    </svg>
  );
}

function IconoCheck({ dark = false }) {
  const bg    = dark ? "rgba(255,255,255,0.2)" : "#DBEAFE";
  const color = dark ? "#fff"                  : "#0094C0";
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
      <path d="M3.5 3.5L6.5 6.5M6.5 3.5L3.5 6.5" stroke={dark ? "rgba(255,255,255,0.6)" : "#EF4444"} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IconoPdf() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect width="36" height="36" rx="8" fill="#DBEAFE" />
      <path d="M10 8h12l6 6v18H10V8z" fill="#0094C0" />
      <path d="M22 8l6 6h-6V8z" fill="#0077A8" />
      <text x="13" y="26" fontSize="7" fill="white" fontWeight="bold">PDF</text>
    </svg>
  );
}


/* ═══════════════════════════════════════════
   TARJETA DE PLAN
═══════════════════════════════════════════ */
function PlanCard({ plan, periodo, seleccionado, onSeleccionar, compact = false, onFeatureClick }) {
  const precio    = plan.precio[periodo];
  const labelPer  = periodo === "mensual" ? "/mes" : "/año";

  return (
    <div
      className={[
        "mpc-plan",
        plan.dark      ? "mpc-plan--dark"     : "",
        plan.popular   ? "mpc-plan--popular"  : "",
        seleccionado   ? "mpc-plan--selected" : "",
        compact        ? "mpc-plan--compact"  : "",
      ].filter(Boolean).join(" ")}
    >
      {plan.popular && <div className="mpc-popular-badge">MAS POPULAR</div>}

      <h3 className={`mpc-plan-nombre${plan.dark ? " mpc-plan-nombre--white" : ""}`}>
        {plan.nombre}
      </h3>

      <div className={`mpc-precio${plan.dark ? " mpc-precio--white" : ""}`}>
        <span className="mpc-precio-moneda">s/</span>
        <span className="mpc-precio-num">{precio}</span>
        <span className="mpc-precio-per">{labelPer}</span>
      </div>

      <div className="mpc-plan-tags">
        <span className={`mpc-tag${plan.dark ? " mpc-tag--white" : " mpc-tag--filled"}`}>
          {plan.empresas}
        </span>
      </div>

      <ul className={`mpc-features${plan.dark ? " mpc-features--white" : ""}`}>
        {plan.features.map((f, i) => (
          <li
            key={i}
            className={[
              f.check === false ? "mpc-feature-disabled" : "",
            ].filter(Boolean).join(" ")}
          >
            {f.check === null  ? <span className="mpc-feature-spacer" /> :
             f.check === true  ? <IconoCheck dark={plan.dark} /> :
                                 <IconoX dark={plan.dark} />}
            <span
              className={[
                f.highlight ? "mpc-feature-highlight" : "",
                FEATURES_INFO[f.texto] ? "mpc-feature-clickable" : "",
                plan.dark && FEATURES_INFO[f.texto] ? "mpc-feature-clickable--dark" : "",
              ].filter(Boolean).join(" ")}
              onClick={FEATURES_INFO[f.texto] ? (e) => { e.stopPropagation(); onFeatureClick(f.texto); } : undefined}
            >
              {plan.dark && FEATURES_INFO[f.texto] ? <u>{f.texto}</u> : f.texto}
            </span>
          </li>
        ))}
      </ul>

      <button
        className={[
          "mpc-btn-plan",
          plan.dark
            ? (seleccionado ? "mpc-btn-plan--dark-sel" : "mpc-btn-plan--dark-outline")
            : (seleccionado ? "mpc-btn-plan--sel"       : "mpc-btn-plan--outline"),
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
function SelectorPlanContaPlex({ estaAbierto, alCerrar, alProcederPago }) {

  const [tipoSeleccionado,   setTipoSeleccionado]   = useState("independiente");   /* "independiente" | "empresarial" */
  const [periodoFacturacion, setPeriodoFacturacion] = useState("mensual");
  const [planSeleccionado,   setPlanSeleccionado]   = useState(null);
  const [chatVisible,        setChatVisible]        = useState(false);
  const [visorPdf,           setVisorPdf]           = useState(null); /* { url, nombre, tamanio } */
  const [featureAbierta,     setFeatureAbierta]     = useState(null);

  /* Chatbot */
  const [mensajesChat, setMensajesChat] = useState([CHATBOT_MSG_INICIAL]);
  const [inputChat,    setInputChat]    = useState("");
  const refFinChat = useRef(null);

  /* Drag-scroll en desktop */
  const refPlanesScroll = useRef(null);
  const dragState = useRef({ dragging: false, startX: 0, scrollLeft: 0 });

  const onDragStart = (e) => {
    dragState.current = { dragging: true, startX: e.pageX, scrollLeft: refPlanesScroll.current.scrollLeft };
    refPlanesScroll.current.style.cursor = "grabbing";
    refPlanesScroll.current.style.userSelect = "none";
  };
  const onDragMove = (e) => {
    if (!dragState.current.dragging) return;
    e.preventDefault();
    const dx = e.pageX - dragState.current.startX;
    refPlanesScroll.current.scrollLeft = dragState.current.scrollLeft - dx;
  };
  const onDragEnd = () => {
    dragState.current.dragging = false;
    if (refPlanesScroll.current) {
      refPlanesScroll.current.style.cursor = "grab";
      refPlanesScroll.current.style.userSelect = "";
    }
  };

  useEffect(() => {
    if (chatVisible) refFinChat.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajesChat, chatVisible]);

  /* Reset al cerrar */
  const handleClose = () => {
    setTipoSeleccionado("independiente");
    setPlanSeleccionado(null);
    setChatVisible(false);
    setMensajesChat([CHATBOT_MSG_INICIAL]);
    alCerrar();
  };

  if (!estaAbierto) return null;

  const handleClickOverlay = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const planes = tipoSeleccionado === "empresarial" ? PLANES_EMP : PLANES_IND;

  const handleConfirmarPlan = () => {
    const plan = planes.find((p) => p.id === planSeleccionado);
    if (!plan) return;
    alProcederPago?.({
      planNombre: plan.id,
      precio: plan.precio[periodoFacturacion].replace(",", ""),
      billing: periodoFacturacion,
      tipo: tipoSeleccionado,
    });
  };

  const handleEnviarChat = (texto) => {
    if (!texto.trim()) return;
    const hora = new Date().toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });
    setMensajesChat((prev) => [...prev, { tipo: "usuario", texto, hora }]);
    setInputChat("");
    setTimeout(() => {
      const resp = CHATBOT_RESPUESTAS[texto] ||
        "Gracias por tu consulta. Un asesor te contactará pronto para brindarte más información.";
      setMensajesChat((prev) => [...prev, { tipo: "bot", texto: resp, hora }]);
    }, 800);
  };

  const tituloPlanes = "Conta-Plex";

  const nombrePlanDisplay = planes.find((p) => p.id === planSeleccionado)?.nombre || "";


  /* ═══════════════════════════════════════
     RENDER
  ═══════════════════════════════════════ */
  return (
    <div className="mpc-overlay" onClick={handleClickOverlay}>
      <div className="mpc-modal">

        {/* ── Cerrar ── */}
        <button className="mpc-close" onClick={handleClose}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2L12 12M12 2L2 12" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>

        {/* ══════════════════════════════════════
            Planes (vista directa)
        ══════════════════════════════════════ */}
          <div className="mpc-body">
            {/* Wrap de planes (scrollable) */}
            <div className={`mpc-planes-wrap${chatVisible ? " mpc-planes-wrap--dimmed" : ""}`}>

              {/* ── Header ── */}
              <div className="mpc-header">
                <IconoContaPlexSm size={36} />
                <h2 className="mpc-titulo mpc-titulo--planes">{tituloPlanes}</h2>
                <p className="mpc-subtitulo">Sistema contable integral · Comprobantes ilimitados</p>
                <div className="mpc-badges">
                  <span className="mpc-badge-pill">1 mes gratis</span>
                  <span className="mpc-badge-pill">IGV incluido</span>
                  <span className="mpc-badge-pill">Actualizaciones</span>
                </div>

                {/* Tabs Independiente / Empresarial */}
                <div className="mpc-tipo-tabs">
                  <button
                    className={`mpc-tipo-tab${tipoSeleccionado === "independiente" ? " mpc-tipo-tab--active" : ""}`}
                    onClick={() => { setTipoSeleccionado("independiente"); setPlanSeleccionado(null); }}
                  >
                    <span className="mpc-tipo-tab-nombre">Independiente</span>
                    <small className="mpc-tipo-tab-sub">Para Contadores y gestores</small>
                  </button>
                  <button
                    className={`mpc-tipo-tab${tipoSeleccionado === "empresarial" ? " mpc-tipo-tab--active" : ""}`}
                    onClick={() => { setTipoSeleccionado("empresarial"); setPlanSeleccionado(null); }}
                  >
                    <span className="mpc-tipo-tab-nombre">Empresarial</span>
                    <small className="mpc-tipo-tab-sub">Para empresas Propias</small>
                  </button>
                </div>

                {/* Toggle Mensual / Anual */}
                <div className="mpc-toggle-row">
                  <span className={`mpc-toggle-label${periodoFacturacion === "mensual" ? " mpc-toggle-label--active" : ""}`}>Mensual</span>
                  <button
                    className={`mpc-toggle-switch${periodoFacturacion === "anual" ? " mpc-toggle-switch--on" : ""}`}
                    onClick={() => setPeriodoFacturacion(periodoFacturacion === "mensual" ? "anual" : "mensual")}
                    aria-label="Cambiar periodo de facturación"
                  >
                    <span className="mpc-toggle-thumb" />
                  </button>
                  <span className={`mpc-toggle-label${periodoFacturacion === "anual" ? " mpc-toggle-label--active" : ""}`}>Anual</span>
                </div>
              </div>

              {/* ── Planes ── */}
              {tipoSeleccionado === "independiente" ? (
                <div
                  className="mpc-planes-scroll"
                  ref={refPlanesScroll}
                  onMouseDown={onDragStart}
                  onMouseMove={onDragMove}
                  onMouseUp={onDragEnd}
                  onMouseLeave={onDragEnd}
                >
                  {PLANES_IND.map((plan) => (
                    <PlanCard
                      key={plan.id}
                      plan={plan}
                      periodo={periodoFacturacion}
                      seleccionado={planSeleccionado === plan.id}
                      onSeleccionar={() => setPlanSeleccionado(plan.id)}
                      compact
                      onFeatureClick={setFeatureAbierta}
                    />
                  ))}
                </div>
              ) : (
                <div className="mpc-planes-grid">
                  {PLANES_EMP.map((plan) => (
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
              )}

              {/* ── Hint chat ── */}
              <div className="mpc-footer-hint" onClick={() => setChatVisible(true)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0094C0" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>¿Tienes dudas sobre los planes?</span>
              </div>

              {/* ── Botón confirmar ── */}
              {planSeleccionado && (
                <button className="mpc-btn-continuar" onClick={handleConfirmarPlan}>
                  Continuar con Plan {nombrePlanDisplay}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>{/* /mpc-planes-wrap */}

            {/* Backdrop oscuro para cerrar chat en mobile */}
            {chatVisible && (
              <div className="mpc-chat-backdrop" onClick={() => setChatVisible(false)} />
            )}

            {/* ══════════════════════════════════════
                PANEL CHAT
            ══════════════════════════════════════ */}
            {chatVisible && (
              <div className="mpc-chat">
                {/* Header */}
                <div className="mpc-chat-header">
                  <div className="mpc-chat-header-left">
                    <div className="mpc-chat-avatar">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="mpc-chat-nombre">Asistente Conta-Plex</div>
                      <div className="mpc-chat-estado">
                        <span className="mpc-online-dot" />
                        En línea · Catálogo cargado
                      </div>
                    </div>
                  </div>
                  <button className="mpc-chat-close" onClick={() => setChatVisible(false)}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 2L10 10M10 2L2 10" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                {/* PDF adjunto */}
                {(() => {
                  const esEmp   = tipoSeleccionado === "empresarial";
                  const pdfUrl  = esEmp
                    ? "/catalogos/contaplex-empresariales-2026.pdf"
                    : "/catalogos/contaplex-independientes-2026.pdf";
                  const pdfNom  = esEmp
                    ? "Brochure Conta-Plex Empresariales 2026.pdf"
                    : "Brochure Conta-Plex Independientes 2026.pdf";
                  const pdfInfo = esEmp ? "PDF · Catálogo empresarial" : "1.8 MB · 4 páginas";
                  const abrirVisor = () => setVisorPdf({ url: pdfUrl, nombre: pdfNom, tamanio: pdfInfo });
                  return (
                    <div className="mpc-chat-pdf" style={{ cursor: "pointer" }} onClick={abrirVisor}>
                      <IconoPdf />
                      <div className="mpc-chat-pdf-info">
                        <span className="mpc-chat-pdf-name">{pdfNom}</span>
                        <span className="mpc-chat-pdf-hint">Toca para ver el catálogo completo de planes</span>
                      </div>
                      <button
                        className="mpc-chat-pdf-ver"
                        onClick={(e) => { e.stopPropagation(); abrirVisor(); }}
                      >
                        Ver&nbsp;
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  );
                })()}

                {/* Mensajes */}
                <div className="mpc-chat-messages">
                  {mensajesChat.map((msg, i) => (
                    <div key={i} className={`mpc-msg mpc-msg--${msg.tipo}`}>
                      {msg.tipo === "bot" && (
                        <div className="mpc-msg-avatar-bot">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0094C0" strokeWidth="2" strokeLinecap="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                        </div>
                      )}
                      <div className="mpc-msg-content">
                        <p className="mpc-msg-texto">{msg.texto}</p>
                        <span className="mpc-msg-hora">{msg.hora}</span>
                      </div>
                    </div>
                  ))}
                  <div ref={refFinChat} />
                </div>

                {/* Quick replies */}
                <div className="mpc-quick-replies">
                  {CHATBOT_QUICK.map((q) => (
                    <button key={q} className="mpc-quick-btn" onClick={() => handleEnviarChat(q)}>
                      {q}
                    </button>
                  ))}
                </div>

                {/* Input */}
                <div className="mpc-chat-input-row">
                  <input
                    className="mpc-chat-input"
                    placeholder="Escribe tu pregunta..."
                    value={inputChat}
                    onChange={(e) => setInputChat(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleEnviarChat(inputChat)}
                  />
                  <button className="mpc-chat-send" onClick={() => handleEnviarChat(inputChat)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M22 2L11 13" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2.2" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            )}{/* /mpc-chat */}

          </div>

        {/* FAB chat */}
        <button
          className={`mpc-fab-chat${chatVisible ? " mpc-fab-chat--active" : ""}`}
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

      </div>{/* /mpc-modal */}

      {/* ── Visor PDF in-app ── */}
      <VisorCatalogoPDF
        estaAbierto={!!visorPdf}
        alCerrar={() => setVisorPdf(null)}
        pdfUrl={visorPdf?.url || ""}
        pdfNombre={visorPdf?.nombre || ""}
        pdfTamanio={visorPdf?.tamanio || ""}
        accentColor="#0094C0"
      />

    </div>
  );
}

export default SelectorPlanContaPlex;
