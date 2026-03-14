import React, { useState, useRef, useEffect } from "react";
import "./ModalPlanesGestionPlex.css";
import VisorCatalogoPDF from "../../ui/visor-catalogo/VisorCatalogoPDF";

/* ───────────────────────────────────────────
   DATOS — Planes
─────────────────────────────────────────── */
const PLANES = [
  {
    id: "gratis",
    nombre: "Gratis",
    precio: { mensual: "0", anual: "0" },
    empresas: "1 Empresa",
    dark: false,
    popular: false,
    features: [
      { texto: "Configuración Básica",          check: true  },
      { texto: "Compras + Almacén",             check: true  },
      { texto: "Ventas POS + SUNAT completo",   check: true  },
      { texto: "Inventarios + Reportes",        check: true  },
      { texto: "Tesorería",                     check: true  },
      { texto: "Soporte + Contable GRATIS",     check: true  },
      { texto: "Transferencias de mercadería",  check: false },
      { texto: "Cuentas Corrientes",            check: false },
      { texto: "Producción",                    check: false },
    ],
  },
  {
    id: "basico",
    nombre: "Básico",
    precio: { mensual: "100", anual: "1,000" },
    empresas: "5 Empresas",
    dark: false,
    popular: false,
    features: [
      { texto: "Configuración Básica",          check: true  },
      { texto: "Compras + Almacén",             check: true  },
      { texto: "Ventas POS + SUNAT completo",   check: true  },
      { texto: "Inventarios + Reportes",        check: true  },
      { texto: "Tesorería",                     check: true  },
      { texto: "Soporte + Contable GRATIS",     check: true  },
      { texto: "Transferencias de mercadería",  check: false },
      { texto: "Cuentas Corrientes",            check: false },
      { texto: "Producción",                    check: false },
    ],
  },
  {
    id: "estandar",
    nombre: "Estándar",
    precio: { mensual: "150", anual: "1,500" },
    empresas: "25 Empresas",
    dark: false,
    popular: false,
    features: [
      { texto: "Todo lo del Básico +",          check: true  },
      { texto: "Transferencia de mercadería",   check: true  },
      { texto: "Tesorería completa",            check: true  },
      { texto: "Inventarios + Completa",        check: true  },
      { texto: "Inventarios + Reportes completos", check: true },
      { texto: "Cuentas Corrientes",            check: false },
      { texto: "Producción",                    check: false },
    ],
  },
  {
    id: "profesional",
    nombre: "Profesional",
    precio: { mensual: "200", anual: "2,000" },
    empresas: "2 Empresas",
    dark: true,
    popular: true,
    features: [
      { texto: "Todo lo del Premium 1 +",             check: true, highlight: true },
      { texto: "Cuentas Corrientes completas",        check: true, highlight: true },
      { texto: "Transferencias de mercadería",        check: true, highlight: true },
      { texto: "Tesorería + cuentas por cobrar/pagar", check: true, highlight: true },
      { texto: "Producción",                          check: false },
    ],
  },
  {
    id: "gold",
    nombre: "Gold",
    precio: { mensual: "300", anual: "3,000" },
    empresas: "2 Empresas",
    dark: false,
    popular: false,
    features: [
      { texto: "Todo lo del Profesional +",     check: true },
      { texto: "Compras Avanzadas",             check: true },
      { texto: "Producción",                    check: true },
      { texto: "Cuentas Corrientes Completas",  check: true },
      { texto: "Absolutamente todo incluido",   check: true },
    ],
  },
];

/* ───────────────────────────────────────────
   DATOS — Chatbot
─────────────────────────────────────────── */
const CHATBOT_QUICK = [
  "¿Qué plan para 10 empresas?",
  "¿Qué incluye el Gold?",
  "¿Qué son Cuentas Corrientes?",
  "¿Puedo cambiar de plan?",
  "¿Hay prueba gratis?",
];

const CHATBOT_RESPUESTAS = {
  "¿Qué plan para 10 empresas?":
    "Para 10 empresas te recomendamos el plan Básico (5 empresas) o Estándar (25 empresas). Puedes escalar en cualquier momento.",
  "¿Qué incluye el Gold?":
    "El plan Gold incluye todo lo del Profesional más: Compras Avanzadas, Producción completa, Cuentas Corrientes Completas y absolutamente todo incluido.",
  "¿Qué son Cuentas Corrientes?":
    "Las cuentas corrientes te permiten gestionar créditos y cobranzas con tus clientes y proveedores, llevar el control de saldos pendientes y emitir estados de cuenta.",
  "¿Puedo cambiar de plan?":
    "¡Sí! Puedes cambiar de plan en cualquier momento desde tu panel de administración. El cambio se aplica inmediatamente.",
  "¿Hay prueba gratis?":
    "¡Sí! El plan Gratis no tiene costo y te permite probar con 1 empresa. Además, el primer mes del plan Básico es gratis.",
};

const CHATBOT_MSG_INICIAL = {
  tipo: "bot",
  texto: "¡Hola! 👋 Soy el asistente de Gestión-Plex Comercial. Conozco todos los planes y puedo responder tus dudas.\n¿En qué te ayudo?",
  hora: "09:30",
};


/* ───────────────────────────────────────────
   FEATURES INFO (popover)
─────────────────────────────────────────── */
const FEATURES_INFO = {
  "Configuración Básica": {
    titulo: "Configuración Básica",
    desc: "Configuración inicial del sistema: datos de la empresa, almacenes, categorías de productos y parámetros generales.",
  },
  "Compras + Almacén": {
    titulo: "Compras + Almacén",
    desc: "Módulo completo de compras: órdenes de compra, recepción de mercadería, control de stock y kardex de almacén.",
  },
  "Ventas POS + SUNAT completo": {
    titulo: "Ventas POS + SUNAT Completo",
    desc: "Punto de venta integrado con emisión de facturas, boletas y notas de crédito electrónicas directamente a SUNAT.",
  },
  "Inventarios + Reportes": {
    titulo: "Inventarios + Reportes",
    desc: "Control de inventario en tiempo real con reportes de stock, rotación de productos y valorización.",
  },
  "Tesorería": {
    titulo: "Tesorería",
    desc: "Gestión de caja y bancos: ingresos, egresos, transferencias y conciliación bancaria básica.",
  },
  "Soporte + Contable GRATIS": {
    titulo: "Soporte + Sistema Contable GRATIS",
    desc: "Soporte técnico incluido y módulo contable básico sin costo adicional.",
  },
  "Transferencias de mercadería": {
    titulo: "Transferencias de Mercadería",
    desc: "Traslado de mercadería entre almacenes o sucursales con guías de remisión electrónicas.",
  },
  "Cuentas Corrientes": {
    titulo: "Cuentas Corrientes",
    desc: "Gestión de créditos con clientes y proveedores: líneas de crédito, estados de cuenta y cobranza.",
  },
  "Producción": {
    titulo: "Producción",
    desc: "Módulo de producción: órdenes de fabricación, listas de materiales (BOM) y control de insumos.",
  },
  "Todo lo del Básico +": {
    titulo: "Todo lo del Básico +",
    desc: "Incluye todas las funcionalidades del plan Básico más las características del plan Estándar.",
  },
  "Transferencia de mercadería": {
    titulo: "Transferencia de Mercadería",
    desc: "Traslado interno de mercadería entre almacenes con seguimiento en tiempo real.",
  },
  "Tesorería completa": {
    titulo: "Tesorería Completa",
    desc: "Tesorería avanzada: flujo de caja proyectado, conciliación bancaria automática y gestión de cheques.",
  },
  "Inventarios + Completa": {
    titulo: "Inventarios Completa",
    desc: "Gestión completa de inventarios con múltiples métodos de valorización (PEPS, promedio) y auditoría.",
  },
  "Inventarios + Reportes completos": {
    titulo: "Inventarios + Reportes Completos",
    desc: "Reportes avanzados de inventario: antigüedad de stock, punto de reorden y análisis ABC.",
  },
  "Todo lo del Premium 1 +": {
    titulo: "Todo lo del Premium 1 +",
    desc: "Incluye todas las funcionalidades del plan Profesional más las características del plan Gold.",
  },
  "Cuentas Corrientes completas": {
    titulo: "Cuentas Corrientes Completas",
    desc: "Control completo de cuentas corrientes: límites de crédito, vencimientos, cobranza automática.",
  },
  "Tesorería + cuentas por cobrar/pagar": {
    titulo: "Tesorería + Cuentas por Cobrar/Pagar",
    desc: "Tesorería integrada con módulo de cuentas por cobrar y por pagar con alertas de vencimiento.",
  },
  "Todo lo del Profesional +": {
    titulo: "Todo lo del Profesional +",
    desc: "Incluye todo el plan Profesional más el módulo de Producción y funcionalidades avanzadas.",
  },
  "Compras Avanzadas": {
    titulo: "Compras Avanzadas",
    desc: "Compras con múltiples proveedores, comparación de cotizaciones, aprobaciones y órdenes de importación.",
  },
  "Absolutamente todo incluido": {
    titulo: "Absolutamente Todo Incluido",
    desc: "Acceso completo a todos los módulos del sistema sin restricciones ni cargos adicionales.",
  },
  "Cuentas Corrientes Completas": {
    titulo: "Cuentas Corrientes Completas",
    desc: "Gestión integral de créditos: scoring, límites por cliente, estados de cuenta automáticos y cobranza.",
  },
};

function PopoverDetalleFeature({ nombreFeature, onCerrar }) {
  const info = FEATURES_INFO[nombreFeature];
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
                FEATURES_INFO[f.texto] ? "mgpc-feature-clickable" : "",
                plan.dark && FEATURES_INFO[f.texto] ? "mgpc-feature-clickable--dark" : "",
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
function ModalPlanesGestionPlex({ isOpen, onClose, onProcederPago }) {

  const [periodoFacturacion, setPeriodoFacturacion] = useState("mensual");
  const [planSeleccionado,   setPlanSeleccionado]   = useState(null);
  const [chatVisible,        setChatVisible]        = useState(false);
  const [visorPdf,           setVisorPdf]           = useState(null);
  const [featureAbierta,     setFeatureAbierta]     = useState(null);

  /* Chatbot */
  const [mensajesChat, setMensajesChat] = useState([CHATBOT_MSG_INICIAL]);
  const [inputChat,    setInputChat]    = useState("");
  const refFinChat = useRef(null);

  useEffect(() => {
    if (chatVisible) refFinChat.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajesChat, chatVisible]);

  /* Reset al cerrar */
  const handleClose = () => {
    setPlanSeleccionado(null);
    setChatVisible(false);
    setMensajesChat([CHATBOT_MSG_INICIAL]);
    onClose();
  };

  if (!isOpen) return null;

  const handleClickOverlay = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const handleConfirmarPlan = () => {
    const plan = PLANES.find((p) => p.id === planSeleccionado);
    if (!plan) return;
    onProcederPago?.({
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
      const resp = CHATBOT_RESPUESTAS[texto] ||
        "Gracias por tu consulta. Un asesor te contactará pronto para brindarte más información.";
      setMensajesChat((prev) => [...prev, { tipo: "bot", texto: resp, hora }]);
    }, 800);
  };

  const nombrePlanDisplay = PLANES.find((p) => p.id === planSeleccionado)?.nombre || "";


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
            <div className="mgpc-planes-scroll">
              {PLANES.map((plan) => (
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
                {CHATBOT_QUICK.map((q) => (
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
        isOpen={!!visorPdf}
        onClose={() => setVisorPdf(null)}
        pdfUrl={visorPdf?.url || ""}
        pdfNombre={visorPdf?.nombre || ""}
        pdfTamanio={visorPdf?.tamanio || ""}
        accentColor="#0D9488"
      />

    </div>
  );
}

export default ModalPlanesGestionPlex;
