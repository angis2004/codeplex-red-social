import React, { useState, useRef, useEffect } from "react";
import "./ModalPlanesFacturacion.css";
import VisorCatalogoPDF from "../../ui/visor-catalogo/VisorCatalogoPDF";

/* ───────────────────────────────────────────
   DATOS — Precios
─────────────────────────────────────────── */
const PRECIOS = {
  gratis:   { mensual: "0",   anual: "0" },
  basico:   { mensual: "50",  anual: "500" },
  premium:  { mensual: "150", anual: "1,500" },
  gold:     { mensual: "200", anual: "2,000" },
};

/* ───────────────────────────────────────────
   DATOS — Paquetes adicionales
─────────────────────────────────────────── */
const PAQUETES = [
  { rango: "1 - 1,000 comprobantes",       tarifa: "S/0.030 c/u", total: "S/30.00" },
  { rango: "1,000 - 5,000 comprobantes",   tarifa: "S/0.030 c/u", total: "S/30.00" },
  { rango: "5,000 - 10,000 comprobantes",  tarifa: "S/0.030 c/u", total: "S/30.00" },
  { rango: "10,001 - 50,000 comprobantes", tarifa: "S/0.030 c/u", total: "S/30.00" },
];

/* ───────────────────────────────────────────
   DATOS — Descripciones de features (popover)
─────────────────────────────────────────── */
const FEATURES_INFO = {
  "Configuración completa": {
    titulo: "Configuración Completa",
    desc: "Configura tu empresa, sucursales, series de comprobantes, usuarios y permisos desde un panel centralizado. Incluye configuración de impresoras térmicas y conexión con SUNAT.",
  },
  "Ventas POS + SUNAT completo": {
    titulo: "Ventas POS + SUNAT",
    desc: "Emite facturas, boletas, notas de crédito y débito electrónicas validadas por SUNAT en tiempo real. Incluye POS táctil para ventas rápidas en mostrador, compatible con lector de código de barras.",
  },
  "Guías de remisión": {
    titulo: "Guías de Remisión Electrónicas",
    desc: "Genera y envía guías de remisión electrónicas (remitente y transportista) directamente a SUNAT. Controla el traslado de mercancías con validación automática y seguimiento de estado.",
  },
  "Web · Android · iOS · Usuarios ilimitados": {
    titulo: "Multiplataforma · Usuarios Ilimitados",
    desc: "Accede desde cualquier dispositivo: navegador web, app Android o iOS. Agrega todos los usuarios que necesites sin costo adicional, cada uno con sus propios permisos y roles.",
  },
  "Soporte Personalizado": {
    titulo: "Soporte Personalizado",
    desc: "Accede a soporte técnico por chat, correo electrónico y videollamada. Nuestro equipo te ayuda con configuración, dudas operativas y resolución de incidencias con SUNAT.",
  },
  "Sistema Contable Basic GRATIS": {
    titulo: "Sistema Contable Básico GRATIS",
    desc: "Incluido sin costo adicional: libro de compras, libro de ventas y reportes básicos de contabilidad. Ideal para llevar al día tus obligaciones tributarias sin contratar un sistema aparte.",
  },
  "Todo lo del Plan Básico Incluido +": {
    titulo: "Todo lo del Plan Básico +",
    desc: "El Plan Premium incluye absolutamente todas las funciones del Plan Básico, más las capacidades adicionales de gestión multisucursal y beneficios exclusivos para empresas en crecimiento.",
  },
  "Gestión de 3 sucursales o almacenes desde un solo sistema": {
    titulo: "Gestión Multisucursal (3 sedes)",
    desc: "Administra hasta 3 sucursales o almacenes desde un único panel. Visualiza ventas, inventario y comprobantes por sede en tiempo real, sin necesidad de cambiar de sistema o sesión.",
  },
  "Ideal para empresas con múltiples puntos de venta en crecimiento": {
    titulo: "Para Empresas en Crecimiento",
    desc: "Diseñado para negocios con múltiples puntos de venta que buscan escalar. Consolida la información de todas tus sedes, simplifica la gestión y toma decisiones basadas en datos unificados.",
  },
  "Todo lo del Plan Premium +": {
    titulo: "Todo lo del Plan Premium +",
    desc: "El Plan Gold incluye todas las funciones del Plan Premium más la máxima capacidad operativa: hasta 4 sucursales, mayor volumen de comprobantes y prioridad en soporte y actualizaciones.",
  },
  "Gestión de 4 sucursales o almacenes — máxima capacidad": {
    titulo: "Gestión Multisucursal (4 sedes)",
    desc: "Gestiona hasta 4 sucursales o almacenes desde un solo sistema. Ideal para cadenas de tiendas y empresas con presencia regional que necesitan consolidar toda su operación en una sola plataforma.",
  },
  "Para empresas con mayor presencia y volumen de operaciones": {
    titulo: "Máxima Escala Operativa",
    desc: "El plan ideal para empresas con alto volumen de transacciones, múltiples sedes y equipos numerosos. Incluye reportes avanzados, consolidación contable y acceso a funciones empresariales exclusivas.",
  },
};

/* ───────────────────────────────────────────
   DATOS — Planes
─────────────────────────────────────────── */
const PLANES = [
  {
    key: "gratis",
    nombre: "Gratis",
    dark: false,
    badge: null,
    sede: "1 sucursal o almacen",
    features: [
      "Configuración completa",
      "Ventas POS + SUNAT completo",
      "Guías de remisión",
      "Web · Android · iOS · Usuarios ilimitados",
      "Soporte Personalizado",
      "Sistema Contable Basic GRATIS",
    ],
  },
  {
    key: "basico",
    nombre: "Básico",
    dark: false,
    badge: null,
    sede: "1 sucursal o almacen",
    features: [
      "Configuración completa",
      "Ventas POS + SUNAT completo",
      "Guías de remisión",
      "Web · Android · iOS · Usuarios ilimitados",
      "Soporte Personalizado",
      "Sistema Contable Basic GRATIS",
    ],
  },
  {
    key: "premium",
    nombre: "Premium",
    dark: true,
    badge: "MÁS POPULAR",
    sede: "3 sucursales o almacenes",
    features: [
      "Todo lo del Plan Básico Incluido +",
      "Gestión de 3 sucursales o almacenes desde un solo sistema",
      "Ideal para empresas con múltiples puntos de venta en crecimiento",
    ],
  },
  {
    key: "gold",
    nombre: "Gold",
    dark: false,
    badge: "MAYOR CAPACIDAD",
    sede: "4 sucursales o almacenes",
    features: [
      "Todo lo del Plan Premium +",
      "Gestión de 4 sucursales o almacenes — máxima capacidad",
      "Para empresas con mayor presencia y volumen de operaciones",
    ],
  },
];

/* ───────────────────────────────────────────
   DATOS — Chatbot
─────────────────────────────────────────── */
const CHATBOT_QUICK = [
  "¿Qué incluye el Plan Premium?",
  "¿Qué son los comprobantes adicionales?",
  "¿Puedo tener varias sucursales?",
  "¿Puedo cambiar de plan?",
  "¿Hay prueba gratis?",
];

const CHATBOT_RESPUESTAS = {
  "¿Qué incluye el Plan Premium?":
    "El Plan Premium (S/150/mes) incluye todo lo del Plan Básico más gestión de hasta 3 sucursales o almacenes desde un solo sistema, con usuarios ilimitados y soporte prioritario.",
  "¿Qué son los comprobantes adicionales?":
    "Todos los planes incluyen hasta 2,000 comprobantes. Si necesitas más, puedes adquirir paquetes adicionales desde S/0.030 por comprobante, según el rango que necesites.",
  "¿Puedo tener varias sucursales?":
    "Sí. El Plan Básico incluye 1 sucursal, Premium hasta 3 y Gold hasta 4 sucursales o almacenes, todos gestionados desde un solo sistema.",
  "¿Puedo cambiar de plan?":
    "¡Sí! Puedes cambiar de plan en cualquier momento desde tu panel de administración. El cambio aplica de inmediato.",
  "¿Hay prueba gratis?":
    "¡Sí! El plan Gratis no tiene costo. Además, el primer mes de cualquier plan de pago es gratis para que lo pruebes sin compromiso.",
};

const CHATBOT_MSG_INICIAL = {
  tipo: "bot",
  texto: "¡Hola! 👋 Soy el asistente de Facturación Electrónica. Puedo ayudarte a elegir el plan ideal para tu empresa.\n¿En qué te ayudo?",
  hora: "09:30",
};


/* ═══════════════════════════════════════════
   ÍCONOS
═══════════════════════════════════════════ */
function IconoFacturacion({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#0D9488" />
      <rect x="9"  y="28" width="6"  height="12" rx="2" fill="white" />
      <rect x="21" y="18" width="6"  height="22" rx="2" fill="#99F6E4" />
      <rect x="33" y="10" width="6"  height="30" rx="2" fill="white" />
      <path d="M12 20 L24 12 L36 5" stroke="#99F6E4" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 2" />
    </svg>
  );
}

function IconoCheck({ dark = false }) {
  const bg    = dark ? "rgba(255,255,255,0.2)" : "#CCFBF1";
  const color = dark ? "#fff" : "#0D9488";
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
      <rect width="36" height="36" rx="8" fill="#CCFBF1" />
      <path d="M10 8h12l6 6v18H10V8z" fill="#0D9488" />
      <path d="M22 8l6 6h-6V8z" fill="#134E4A" />
      <text x="13" y="26" fontSize="7" fill="white" fontWeight="bold">PDF</text>
    </svg>
  );
}

function IconoPaquete() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
    </svg>
  );
}


/* ═══════════════════════════════════════════
   POPOVER DETALLE DE FEATURE
═══════════════════════════════════════════ */
function PopoverDetalleFeature({ nombreFeature, onCerrar }) {
  const info = FEATURES_INFO[nombreFeature];
  if (!info) return null;

  return (
    <div className="mffe-popover-overlay" onClick={onCerrar}>
      <div className="mffe-popover" onClick={(e) => e.stopPropagation()}>
        <button className="mffe-popover-close" onClick={onCerrar}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 2L8 8M8 2L2 8" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
        <h4 className="mffe-popover-titulo">{info.titulo}</h4>
        <p className="mffe-popover-desc">{info.desc}</p>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════
   PANEL PAQUETES ADICIONALES
═══════════════════════════════════════════ */
function PanelPaquetes({ onCerrar }) {
  return (
    <div className="mffe-paq-overlay" onClick={onCerrar}>
      <div className="mffe-paq-panel" onClick={(e) => e.stopPropagation()}>
        <button className="mffe-paq-close" onClick={onCerrar}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 2L10 10M10 2L2 10" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <h3 className="mffe-paq-titulo">Paquetes Adicionales</h3>
        <p className="mffe-paq-subtitulo">
          Al superar los 2,000 comprobantes electrónicos en el plan
        </p>

        <div className="mffe-paq-lista">
          {PAQUETES.map((p, i) => (
            <div key={i} className="mffe-paq-row">
              <div>
                <div className="mffe-paq-rango">{p.rango}</div>
                <div className="mffe-paq-tarifa">{p.tarifa}</div>
              </div>
              <div className="mffe-paq-total">{p.total}</div>
            </div>
          ))}
        </div>

        <div className="mffe-paq-privada">
          <div className="mffe-paq-privada-titulo">Base de datos privada</div>
          <ul className="mffe-paq-privada-items">
            <li>Alojamiento exclusivo de la información de tus clientes</li>
            <li>Mayor velocidad y tiempo de respuesta</li>
            <li>Canal directo a RENIEC y SUNAT</li>
          </ul>
          <div className="mffe-paq-privada-precio">
            <span className="mffe-paq-privada-label">Pago único</span>
            <span className="mffe-paq-privada-valor">S/1,000.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════
   COMPONENTE PRINCIPAL
═══════════════════════════════════════════ */
function ModalPlanesFacturacion({ isOpen, onClose, onProcederPago }) {

  const [periodoFacturacion, setPeriodoFacturacion] = useState("mensual");
  const [planSeleccionado,   setPlanSeleccionado]   = useState(null);
  const [paquetesVisible,    setPaquetesVisible]    = useState(false);
  const [featureAbierta,     setFeatureAbierta]     = useState(null);
  const [chatVisible,        setChatVisible]        = useState(false);
  const [visorPdf,           setVisorPdf]           = useState(null);

  const [mensajesChat, setMensajesChat] = useState([CHATBOT_MSG_INICIAL]);
  const [inputChat,    setInputChat]    = useState("");
  const refFinChat = useRef(null);

  useEffect(() => {
    if (chatVisible) refFinChat.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajesChat, chatVisible]);

  const handleClose = () => {
    setPlanSeleccionado(null);
    setPaquetesVisible(false);
    setFeatureAbierta(null);
    setChatVisible(false);
    setMensajesChat([CHATBOT_MSG_INICIAL]);
    onClose();
  };

  if (!isOpen) return null;

  const handleClickOverlay = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const labelPeriodo = periodoFacturacion === "mensual" ? "/mes" : "/año";

  const handleConfirmarPlan = () => {
    const precio = PRECIOS[planSeleccionado][periodoFacturacion].replace(",", "");
    const plan   = PLANES.find((p) => p.key === planSeleccionado);
    onProcederPago?.({ planNombre: plan?.nombre, precio, billing: periodoFacturacion });
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

  const nombrePlanDisplay = PLANES.find((p) => p.key === planSeleccionado)?.nombre ?? "";

  return (
    <div className="mffe-overlay" onClick={handleClickOverlay}>
      <div className="mffe-modal">

        {/* Cerrar */}
        <button className="mffe-close" onClick={handleClose}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2L12 12M12 2L2 12" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Body */}
        <div className="mffe-body">
          <div className={`mffe-planes-wrap${chatVisible ? " mffe-planes-wrap--dimmed" : ""}`}>

            {/* Volver */}
            <button className="mffe-volver" onClick={handleClose}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Volver
            </button>

            {/* Header — ícono + título en fila */}
            <div className="mffe-header">
              <div className="mffe-header-top">
                <IconoFacturacion size={44} />
                <h2 className="mffe-titulo">Facturación Electrónica</h2>
              </div>
              <p className="mffe-subtitulo">
                Software empresarial, elige el plan perfecto para ti&nbsp; con hasta 2,000 comprobantes
              </p>

              <div className="mffe-badges">
                <span className="mffe-badge-pill">1 mes gratis</span>
                <span className="mffe-badge-pill">IGV incluido</span>
                <span className="mffe-badge-pill">Multiusuario</span>
                <span className="mffe-badge-pill">Actualizaciones</span>
              </div>

              <div className="mffe-toggle">
                <button
                  className={`mffe-toggle-btn${periodoFacturacion === "mensual" ? " mffe-toggle-btn--active" : ""}`}
                  onClick={() => setPeriodoFacturacion("mensual")}
                >Mensual</button>
                <button
                  className={`mffe-toggle-btn${periodoFacturacion === "anual" ? " mffe-toggle-btn--active" : ""}`}
                  onClick={() => setPeriodoFacturacion("anual")}
                >Anual</button>
              </div>
            </div>

            {/* Scroll de planes */}
            <div className="mffe-planes-scroll-wrap">
              <div className="mffe-planes-scroll">

                {PLANES.map((plan) => {
                  const isSelected = planSeleccionado === plan.key;

                  let cardClass = "mffe-plan";
                  if (plan.dark)  cardClass += " mffe-plan--dark";
                  if (plan.badge && !plan.dark) cardClass += " mffe-plan--has-badge";
                  if (isSelected && !plan.dark) cardClass += " mffe-plan--selected";
                  if (isSelected && plan.dark)  cardClass += " mffe-plan--dark-sel";

                  return (
                    <div key={plan.key} className={cardClass}>

                      {plan.badge && (
                        <div className={`mffe-plan-badge${plan.dark ? " mffe-plan-badge--teal" : " mffe-plan-badge--gray"}`}>
                          {plan.badge}
                        </div>
                      )}

                      <h3 className={`mffe-plan-nombre${plan.dark ? " mffe-plan-nombre--white" : ""}`}>
                        {plan.nombre}
                      </h3>

                      <div className={`mffe-precio${plan.dark ? " mffe-precio--white" : ""}`}>
                        <span className="mffe-precio-moneda">s/</span>
                        <span className="mffe-precio-num">{PRECIOS[plan.key][periodoFacturacion]}</span>
                        <span className="mffe-precio-per">{labelPeriodo}</span>
                      </div>

                      <div className="mffe-plan-tags">
                        <span className={`mffe-tag${plan.dark ? " mffe-tag--white" : " mffe-tag--outline"}`}>
                          {plan.sede}
                        </span>
                      </div>

                      <ul className={`mffe-features${plan.dark ? " mffe-features--white" : ""}`}>
                        {plan.features.map((f) => (
                          <li
                            key={f}
                            className="mffe-feature-clickable"
                            onClick={() => setFeatureAbierta(f)}
                          >
                            <IconoCheck dark={plan.dark} />
                            <span>{plan.dark ? <u>{f}</u> : f}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Ver paquetes */}
                      <button
                        className={`mffe-ver-paquetes${plan.dark ? " mffe-ver-paquetes--dark" : ""}`}
                        onClick={() => setPaquetesVisible(true)}
                      >
                        <IconoPaquete />
                        <span>¿Más de 2,000 comprobantes?</span>
                        <span className="mffe-ver-paquetes-link">Ver paquetes →</span>
                      </button>

                      <button
                        className={`mffe-btn-plan${
                          plan.dark
                            ? isSelected ? " mffe-btn-plan--dark-sel" : " mffe-btn-plan--dark"
                            : isSelected ? " mffe-btn-plan--sel" : " mffe-btn-plan--outline"
                        }`}
                        onClick={() => setPlanSeleccionado(plan.key)}
                      >
                        {isSelected ? "Seleccionado" : plan.key === "gratis" ? "Comenzar gratis" : "Elegir Plan"}
                      </button>

                    </div>
                  );
                })}

              </div>
            </div>

            {/* Hint chat */}
            <div className="mffe-footer-hint" onClick={() => setChatVisible(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2" strokeLinecap="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span>¿Tienes dudas sobre los planes?</span>
            </div>

            {planSeleccionado && (
              <button className="mffe-btn-continuar" onClick={handleConfirmarPlan}>
                Continuar con {nombrePlanDisplay}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            )}

          </div>{/* /mffe-planes-wrap */}

          {chatVisible && (
            <div className="mffe-chat-backdrop" onClick={() => setChatVisible(false)} />
          )}

          {/* Panel chat */}
          {chatVisible && (
            <div className="mffe-chat">
              <div className="mffe-chat-header">
                <div className="mffe-chat-header-left">
                  <div className="mffe-chat-avatar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="mffe-chat-nombre">Asistente Facturación</div>
                    <div className="mffe-chat-estado">
                      <span className="mffe-online-dot" />
                      En línea · Catálogo cargado
                    </div>
                  </div>
                </div>
                <button className="mffe-chat-close" onClick={() => setChatVisible(false)}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 2L10 10M10 2L2 10" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div
                className="mffe-chat-pdf"
                style={{ cursor: "pointer" }}
                onClick={() => setVisorPdf({
                  url: "/catalogos/facturacion-electronica-2025.pdf",
                  nombre: "Catálogo Facturación Electrónica 2025.pdf",
                  tamanio: "PDF · Catálogo completo de planes"
                })}
              >
                <IconoPdf />
                <div className="mffe-chat-pdf-info">
                  <span className="mffe-chat-pdf-name">Catálogo Facturación Electrónica 2025.pdf</span>
                  <span className="mffe-chat-pdf-hint">Toca para ver el catálogo completo de planes</span>
                </div>
                <button
                  className="mffe-chat-pdf-ver"
                  onClick={(e) => { e.stopPropagation(); setVisorPdf({
                    url: "/catalogos/facturacion-electronica-2025.pdf",
                    nombre: "Catálogo Facturación Electrónica 2025.pdf",
                    tamanio: "PDF · Catálogo completo de planes"
                  }); }}
                >
                  Ver&nbsp;
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="mffe-chat-messages">
                {mensajesChat.map((msg, i) => (
                  <div key={i} className={`mffe-msg mffe-msg--${msg.tipo}`}>
                    {msg.tipo === "bot" && (
                      <div className="mffe-msg-avatar-bot">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2" strokeLinecap="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="mffe-msg-content">
                      <p className="mffe-msg-texto">{msg.texto}</p>
                      <span className="mffe-msg-hora">{msg.hora}</span>
                    </div>
                  </div>
                ))}
                <div ref={refFinChat} />
              </div>

              <div className="mffe-quick-replies">
                {CHATBOT_QUICK.map((q) => (
                  <button key={q} className="mffe-quick-btn" onClick={() => handleEnviarChat(q)}>
                    {q}
                  </button>
                ))}
              </div>

              <div className="mffe-chat-input-row">
                <button className="mffe-chat-attach">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                  </svg>
                </button>
                <input
                  className="mffe-chat-input"
                  placeholder="Escribe tu pregunta..."
                  value={inputChat}
                  onChange={(e) => setInputChat(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleEnviarChat(inputChat)}
                />
                <button className="mffe-chat-send" onClick={() => handleEnviarChat(inputChat)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2.2" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          )}

        </div>{/* /mffe-body */}

        {/* Panel paquetes */}
        {paquetesVisible && (
          <PanelPaquetes onCerrar={() => setPaquetesVisible(false)} />
        )}

        {/* Popover feature */}
        {featureAbierta && (
          <PopoverDetalleFeature
            nombreFeature={featureAbierta}
            onCerrar={() => setFeatureAbierta(null)}
          />
        )}

        {/* FAB chat */}
        <button
          className={`mffe-fab-chat${chatVisible ? " mffe-fab-chat--active" : ""}`}
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

      </div>

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

export default ModalPlanesFacturacion;
