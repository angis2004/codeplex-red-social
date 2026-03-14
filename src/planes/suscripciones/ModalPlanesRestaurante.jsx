import React, { useState, useRef, useEffect } from "react";
import "./ModalPlanesRestaurante.css";
import VisorCatalogoPDF from "../../ui/visor-catalogo/VisorCatalogoPDF";

/* ───────────────────────────────────────────
   DATOS — Precios por plan y periodo
   TODO (backend): reemplazar con GET /api/planes
─────────────────────────────────────────── */
const PRECIOS_PLANES = {
  basico: { mensual: "150", anual: "1,500" },
  gold:   { mensual: "300", anual: "3,000" },
};
 


/* ───────────────────────────────────────────
   DATOS — Features del producto con
   descripción expandible al hacer click.
   Cada key coincide exactamente con el texto
   mostrado en la lista de features.
   TODO (backend): reemplazar con GET /api/planes/:id/features
─────────────────────────────────────────── */
const FEATURES_INFO = {
  "Configuraciones completas": {
    titulo: "Configuración Completa",
    desc: "Comprobantes con logo y datos de tu empresa, impresiones A4/A45/80mm/57mm, importación de productos con varias presentaciones, importación de precios, registro de vendedores e inventarios.",
  },
  "Ventas POS + SUNAT": {
    titulo: "Ventas POS + SUNAT",
    desc: "Emite boletas, facturas y notas de crédito electrónicas validadas por SUNAT en tiempo real desde el punto de venta, compatible con impresoras térmicas y fiscales.",
  },
  "Ventas en Restaurante": {
    titulo: "Ventas en Restaurante",
    desc: "Gestiona mesas, pedidos por mesa o delivery, comanda a cocina en tiempo real, control de mozos y estado de cada mesa desde un panel visual intuitivo.",
  },
  "Tesorería": {
    titulo: "Tesorería",
    desc: "Controla el flujo de caja diario, registra ingresos y egresos, concilia pagos en efectivo, tarjeta y transferencia, y genera reportes de cierre por turno.",
  },
  "Soporte + Sistema Contable GRATIS": {
    titulo: "Soporte + Sistema Contable GRATIS",
    desc: "Accede a soporte técnico por chat y correo incluido en tu plan. Además, el sistema contable básico está incluido sin costo adicional para llevar tu contabilidad al día.",
  },
  "3-sucursales(SOLO 2)": {
    titulo: "Límite de Sucursales",
    desc: "Este plan permite gestionar hasta 2 sucursales. Si necesitas manejar 3 o más, considera actualizar al plan Básico o Gold.",
  },
  "Todo lo del Básico +": {
    titulo: "Todo lo del Plan Básico",
    desc: "Incluye todas las funcionalidades del plan Básico más beneficios exclusivos del plan Gold: mayor capacidad operativa, transferencias entre cajas y soporte prioritario.",
  },
  "Transferencia entre caja y Bancos": {
    titulo: "Transferencia entre Caja y Bancos",
    desc: "Registra y concilia automáticamente las transferencias entre tu caja física y las cuentas bancarias, con trazabilidad completa de cada movimiento.",
  },
  "Carga de constancias JPG/PDF/DOC": {
    titulo: "Carga de Constancias",
    desc: "Adjunta y almacena comprobantes de pago, constancias de depósito y documentos en formatos JPG, PDF o DOC directamente en cada transacción.",
  },
  "Mayor Capacidad Operativa": {
    titulo: "Mayor Capacidad Operativa",
    desc: "Procesa un mayor volumen de transacciones diarias, usuarios simultáneos y productos en catálogo sin limitaciones, ideal para restaurantes con alto flujo de clientes.",
  },
  "Soporte prioritario preferencial": {
    titulo: "Soporte Prioritario Preferencial",
    desc: "Atención preferencial con tiempo de respuesta garantizado, acceso a un asesor dedicado y soporte telefónico disponible en horario extendido.",
  },
};
 
/* ───────────────────────────────────────────
   DATOS — Features incluidas en cada plan.
   Separadas por plan para no repetir listas
   en el JSX y facilitar cambios desde backend.
─────────────────────────────────────────── */
const FEATURES_COMUNES = [
  "Configuraciones completas",
  "Ventas POS + SUNAT",
  "Ventas en Restaurante",
  "Tesorería",
  "Soporte + Sistema Contable GRATIS",
];
 
const FEATURES_GOLD_EXTRA = [
  "Transferencia entre caja y Bancos",
  "Carga de constancias JPG/PDF/DOC",
  "Mayor Capacidad Operativa",
  "Soporte prioritario preferencial",
];
 
/* ───────────────────────────────────────────
   DATOS — Chatbot
   Respuestas rápidas predefinidas y sus
   respuestas automáticas del bot.
   TODO (backend): conectar con endpoint AI
─────────────────────────────────────────── */
const CHATBOT_RESPUESTAS_RAPIDAS = [
  "¿Cuál plan si tengo 20 empresas?",
  "¿Qué incluye el Gold?",
  "¿Puedo cambiar de plan?",
  "¿Qué son Activos Fijos?",
  "¿Hay prueba gratis?",
];
 
const CHATBOT_RESPUESTAS_AUTO = {
  "¿Cuál plan si tengo 20 empresas?":
    "Para 20 empresas, el plan Gold es ideal ya que incluye mayor capacidad operativa y soporte prioritario. Contáctanos para un plan corporativo personalizado.",
  "¿Qué incluye el Gold?":
    "El plan Gold incluye todo lo del Básico más: Transferencia entre caja y Bancos, carga de constancias JPG/PDF/DOC, mayor capacidad operativa y soporte prioritario preferencial.",
  "¿Puedo cambiar de plan?":
    "¡Sí! Puedes cambiar de plan en cualquier momento desde tu panel de administración. El cambio se aplica de forma inmediata.",
  "¿Qué son Activos Fijos?":
    "Los activos fijos son bienes que la empresa posee y usa en sus operaciones a largo plazo (equipos, mobiliario, vehículos). El módulo te permite registrarlos y depreciarlos.",
  "¿Hay prueba gratis?":
    "¡Sí! El plan Gratis no tiene costo y te permite probar la plataforma con 1 empresa. Además, el plan Básico incluye 1 mes gratis.",
};
 
const CHATBOT_MENSAJE_INICIAL = {
  tipo: "bot",
  texto:
    "¡Hola! 👋 Soy el asistente de CodePlex. He leído el catálogo completo y puedo responder todas tus dudas sobre planes y precios.\n¿En qué te ayudo?",
  hora: "09:30",
};
 
 
/* ═══════════════════════════════════════════
   ÍCONOS — SVG inline
   Separados en componentes para reutilización
   y legibilidad del árbol JSX principal.
═══════════════════════════════════════════ */
 
/* Ícono del producto: restaurante (tenedor + cuchillo) */
function IconoProductoRestaurante({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#F97316" />
      <rect x="12" y="14" width="5" height="22" rx="2.5" fill="white" opacity="0.5" />
      <rect x="20" y="14" width="5" height="16" rx="2.5" fill="white" opacity="0.8" />
      <rect x="28" y="14" width="5" height="10" rx="2.5" fill="white" />
    </svg>
  );
}
 
/* Check verde para features incluidas */
function IconoCheckFeature({ sobreDorado = false }) {
  const colorCirculo = sobreDorado ? "rgba(255,255,255,0.2)" : "#FEF3C7";
  const colorCheck   = sobreDorado ? "#fff" : "#F97316";
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="7.5" cy="7.5" r="7.5" fill={colorCirculo} />
      <path d="M4.5 7.5L6.5 9.5L10.5 5.5" stroke={colorCheck} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
 
/* X roja para features no incluidas / limitadas */
function IconoXFeatureNoDisponible({ sobreDorado = false }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="5" cy="5" r="5" fill={sobreDorado ? "rgba(255,255,255,0.2)" : "#FEE2E2"} />
      <path d="M3.5 3.5L6.5 6.5M6.5 3.5L3.5 6.5" stroke={sobreDorado ? "#fff" : "#EF4444"} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
 
/* Ícono PDF para el adjunto del chatbot */
function IconoPdfAdjunto() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect width="36" height="36" rx="8" fill="#FEF3C7" />
      <path d="M10 8h12l6 6v18H10V8z" fill="#F59E0B" />
      <path d="M22 8l6 6h-6V8z" fill="#D97706" />
      <text x="13" y="26" fontSize="7" fill="white" fontWeight="bold">PDF</text>
    </svg>
  );
}
 
 
/* ═══════════════════════════════════════════
   POPOVER DE DETALLE DE FEATURE
   Se abre al hacer click en cualquier feature
   de cualquier plan. Muestra título y descripción
   detallada del feature seleccionado.
═══════════════════════════════════════════ */
function PopoverDetalleFeature({ nombreFeature, onCerrar }) {
  const info = FEATURES_INFO[nombreFeature];
  if (!info) return null;
 
  return (
    <div className="mpr-popover-overlay" onClick={onCerrar}>
      <div className="mpr-popover" onClick={(e) => e.stopPropagation()}>
        <button className="mpr-popover-close" onClick={onCerrar}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 2L8 8M8 2L2 8" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
        <h4 className="mpr-popover-titulo">{info.titulo}</h4>
        <p className="mpr-popover-desc">{info.desc}</p>
      </div>
    </div>
  );
}
 
 
/* ═══════════════════════════════════════════
   COMPONENTE PRINCIPAL
═══════════════════════════════════════════ */
function ModalPlanesRestaurante({ isOpen, onClose, onProcederPago }) {
 
  /* ── Estado del modal ── */
  const [periodoFacturacion, setPeriodoFacturacion] = useState("mensual"); // "mensual" | "anual"
  const [planSeleccionado,   setPlanSeleccionado]   = useState("");         // "" | "gratis" | "basico" | "gold"
  const [featureAbierta,     setFeatureAbierta]     = useState(null);       // nombre del feature en popover
  const [chatVisible,        setChatVisible]        = useState(false);
  const [visorPdf,           setVisorPdf]           = useState(null);
 
  /* ── Estado del chatbot ── */
  const [mensajesChat, setMensajesChat] = useState([CHATBOT_MENSAJE_INICIAL]);
  const [inputChat,    setInputChat]    = useState("");
  const refFinChat = useRef(null);
 
  /* Scroll automático al último mensaje del chat */
  useEffect(() => {
    if (chatVisible) refFinChat.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajesChat, chatVisible]);
 
  /* No renderizar si el modal está cerrado */
  if (!isOpen) return null;
 
  /* Cerrar modal al clickear el overlay */
  const handleClickOverlay = (e) => {
    if (e.target === e.currentTarget) onClose();
  };
 
  /* ── Precios calculados según periodo ── */
  const precioBasico = PRECIOS_PLANES.basico[periodoFacturacion];
  const precioGold   = PRECIOS_PLANES.gold[periodoFacturacion];
  const labelPeriodo = periodoFacturacion === "mensual" ? "/mes" : "/año";
 
  /* Nombre legible del plan seleccionado para el botón "Continuar" */
  const NOMBRES_PLANES = { gratis: "Gratis", basico: "Básico", gold: "Gold" };
  const nombrePlanDisplay = NOMBRES_PLANES[planSeleccionado] || "";
 
  /* ── Confirmar selección de plan → sube al padre ── */
  const handleConfirmarPlan = () => {
    const precio =
      planSeleccionado === "gratis" ? "0"
      : planSeleccionado === "basico" ? precioBasico.replace(",", "")
      : precioGold.replace(",", "");
 
    /* TODO (backend): conectar con POST /api/suscripciones */
    onProcederPago?.({
      planNombre: planSeleccionado,
      precio,
      billing: periodoFacturacion,
    });
  };
 
  /* ── Chatbot: enviar mensaje y generar respuesta automática ── */
  const handleEnviarMensajeChat = (texto) => {
    if (!texto.trim()) return;
    const hora = new Date().toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });
 
    setMensajesChat((prev) => [...prev, { tipo: "usuario", texto, hora }]);
    setInputChat("");
 
    /* TODO (backend): reemplazar setTimeout con POST /api/chat */
    setTimeout(() => {
      const respuesta =
        CHATBOT_RESPUESTAS_AUTO[texto] ||
        "Gracias por tu consulta. Un asesor te contactará pronto para brindarte más información.";
      setMensajesChat((prev) => [...prev, { tipo: "bot", texto: respuesta, hora }]);
    }, 800);
  };
 
 
  /* ═══════════════════════════════════════
     RENDER
  ═══════════════════════════════════════ */
  return (
    <div className="mpr-overlay" onClick={handleClickOverlay}>
      <div className="mpr-modal">
 
        {/* ── Botón cerrar modal ── */}
        <button className="mpr-close" onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2L12 12M12 2L2 12" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>
 
        {/* ── Body: columna planes + panel chat ── */}
        <div className="mpr-body">
 
          {/* ══════════════════════════════════════
              COLUMNA IZQUIERDA — Planes de suscripción
          ══════════════════════════════════════ */}
          <div className={`mpr-planes-wrap${chatVisible ? " mpr-planes-wrap--dimmed" : ""}`}>
 
            {/* ── Header del producto ── */}
            <div className="mpr-header">
              <IconoProductoRestaurante size={52} />
              <h2 className="mpr-titulo">Gestión-Plex Restaurantes</h2>
              <p className="mpr-subtitulo">Elige el plan perfecto para ti con comprobantes ilimitados</p>
              <div className="mpr-badges">
                <span className="mpr-badge-pill">1 mes gratis</span>
                <span className="mpr-badge-pill">IGV incluido</span>
              </div>
 
              {/* Toggle periodo de facturación */}
              <div className="mpr-toggle">
                <button
                  className={`mpr-toggle-btn${periodoFacturacion === "mensual" ? " mpr-toggle-btn--active" : ""}`}
                  onClick={() => setPeriodoFacturacion("mensual")}
                >
                  Mensual
                </button>
                <button
                  className={`mpr-toggle-btn${periodoFacturacion === "anual" ? " mpr-toggle-btn--active" : ""}`}
                  onClick={() => setPeriodoFacturacion("anual")}
                >
                  Anual
                </button>
              </div>
            </div>
 
            {/* ── Grid de tarjetas de planes ── */}
            <div className="mpr-planes">
 
              {/* ── Plan Gratis ── */}
              <div className={`mpr-plan mpr-plan--gratis${planSeleccionado === "gratis" ? " mpr-plan--selected" : ""}`}>
                <h3 className="mpr-plan-titulo mpr-plan-titulo--naranja">Gratis</h3>
 
                <div className="mpr-precio">
                  <span className="mpr-precio-moneda">s/</span>
                  <span className="mpr-precio-num">0</span>
                  <span className="mpr-precio-per">{labelPeriodo}</span>
                </div>
 
                <div className="mpr-plan-tags">
                  <span className="mpr-tag mpr-tag--outline">1 Empresa</span>
                </div>
 
                <ul className="mpr-features">
                  {FEATURES_COMUNES.map((feature) => (
                    <li
                      key={feature}
                      className="mpr-feature-clickable"
                      onClick={() => setFeatureAbierta(feature)}
                    >
                      <IconoCheckFeature />
                      <span>{feature}</span>
                    </li>
                  ))}
                  <li
                    className="mpr-feature-disabled mpr-feature-clickable"
                    onClick={() => setFeatureAbierta("3-sucursales(SOLO 2)")}
                  >
                    <IconoXFeatureNoDisponible />
                    <span>3-sucursales(SOLO 2)</span>
                  </li>
                </ul>
 
                <button
                  className={`mpr-btn-plan mpr-btn-plan--outline${planSeleccionado === "gratis" ? " mpr-btn-plan--seleccionado" : ""}`}
                  onClick={() => setPlanSeleccionado("gratis")}
                >
                  {planSeleccionado === "gratis" ? "Seleccionado" : "Elegir Plan"}
                </button>
              </div>
 
              {/* ── Plan Básico ── */}
              <div className={`mpr-plan mpr-plan--basico${planSeleccionado === "basico" ? " mpr-plan--selected" : ""}`}>
                <h3 className="mpr-plan-titulo mpr-plan-titulo--naranja">Básico</h3>
 
                <div className="mpr-precio">
                  <span className="mpr-precio-moneda">s/</span>
                  <span className="mpr-precio-num">{precioBasico}</span>
                  <span className="mpr-precio-per">{labelPeriodo}</span>
                </div>
 
                <div className="mpr-plan-tags">
                  <span className="mpr-tag mpr-tag--filled">2 Empresas</span>
                  <span className="mpr-tag mpr-tag--filled">1 mes gratis</span>
                </div>
 
                <ul className="mpr-features">
                  {FEATURES_COMUNES.map((feature) => (
                    <li
                      key={feature}
                      className="mpr-feature-clickable"
                      onClick={() => setFeatureAbierta(feature)}
                    >
                      <IconoCheckFeature />
                      <span>{feature}</span>
                    </li>
                  ))}
                  <li
                    className="mpr-feature-disabled mpr-feature-clickable"
                    onClick={() => setFeatureAbierta("3-sucursales(SOLO 2)")}
                  >
                    <IconoXFeatureNoDisponible />
                    <span>3-sucursales(SOLO 2)</span>
                  </li>
                </ul>
 
                <button
                  className={`mpr-btn-plan mpr-btn-plan--outline${planSeleccionado === "basico" ? " mpr-btn-plan--seleccionado" : ""}`}
                  onClick={() => setPlanSeleccionado("basico")}
                >
                  {planSeleccionado === "basico" ? "Seleccionado" : "Elegir Plan"}
                </button>
              </div>
 
              {/* ── Plan Gold (destacado) ── */}
              <div className={`mpr-plan mpr-plan--gold${planSeleccionado === "gold" ? " mpr-plan--selected" : ""}`}>
                <div className="mpr-popular-badge">MAS POPULAR</div>
 
                <h3 className="mpr-plan-titulo mpr-plan-titulo--white">Gold</h3>
 
                <div className="mpr-precio mpr-precio--white">
                  <span className="mpr-precio-moneda">s/</span>
                  <span className="mpr-precio-num">{precioGold}</span>
                  <span className="mpr-precio-per">{labelPeriodo}</span>
                </div>
 
                <div className="mpr-plan-tags">
                  <span className="mpr-tag mpr-tag--white-outline">3 Empresas</span>
                  <span className="mpr-tag mpr-tag--white-outline">1 mes gratis</span>
                </div>
 
                <ul className="mpr-features mpr-features--white">
                  {/* Primer item: enlace al plan básico */}
                  <li
                    className="mpr-feature-gold-title mpr-feature-clickable"
                    onClick={() => setFeatureAbierta("Todo lo del Básico +")}
                  >
                    <IconoCheckFeature sobreDorado />
                    <span><strong><u>Todo lo del Básico +</u></strong></span>
                  </li>
 
                  {/* Features exclusivos del Gold */}
                  {FEATURES_GOLD_EXTRA.map((feature) => (
                    <li
                      key={feature}
                      className="mpr-feature-clickable"
                      onClick={() => setFeatureAbierta(feature)}
                    >
                      <IconoCheckFeature sobreDorado />
                      <span><u>{feature}</u></span>
                    </li>
                  ))}
                </ul>
 
                <button
                  className={`mpr-btn-plan mpr-btn-plan--white${planSeleccionado === "gold" ? " mpr-btn-plan--seleccionado-white" : ""}`}
                  onClick={() => setPlanSeleccionado("gold")}
                >
                  {planSeleccionado === "gold" ? "Seleccionado" : "Elegir Plan"}
                </button>
              </div>
 
            </div>{/* /mpr-planes */}
 
            {/* ── Hint: abrir chatbot ── */}
            <div className="mpr-footer-hint">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span>¿Tienes dudas sobre los planes?</span>
            </div>
 
            {/* Botón confirmar — visible solo cuando hay plan seleccionado */}
            {planSeleccionado && (
              <button className="mpr-btn-continuar" onClick={handleConfirmarPlan}>
                Continuar con Plan {nombrePlanDisplay}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            )}
 
          </div>{/* /mpr-planes-wrap */}
 
          {/* Backdrop oscuro para cerrar chat en mobile */}
          {chatVisible && (
            <div className="mpr-chat-backdrop" onClick={() => setChatVisible(false)} />
          )}
 
          {/* ══════════════════════════════════════
              PANEL CHAT — Asistente virtual
              TODO (backend): conectar con endpoint AI
          ══════════════════════════════════════ */}
          {chatVisible && (
            <div className="mpr-chat">
 
              {/* Header del chat */}
              <div className="mpr-chat-header">
                <div className="mpr-chat-header-left">
                  <div className="mpr-chat-avatar">
                    <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
                      <rect width="48" height="48" rx="12" fill="white" opacity="0.2" />
                      <path d="M16 18h-4v14l4-4h16V18H16z" stroke="white" strokeWidth="2.5" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="mpr-chat-nombre">Asistente Codeplex</div>
                    <div className="mpr-chat-estado">
                      <span className="mpr-online-dot" />
                      En línea · Catálogo cargado
                    </div>
                  </div>
                </div>
                <button className="mpr-chat-close" onClick={() => setChatVisible(false)}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 2L10 10M10 2L2 10" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
 
              {/* Adjunto: catálogo PDF del producto */}
              {/* TODO (backend): reemplazar href="#" con URL real del PDF */}
              <div
                className="mpr-chat-pdf"
                style={{ cursor: "pointer" }}
                onClick={() => setVisorPdf({
                  url: "/catalogos/gestionplex-restaurante-2025.pdf",
                  nombre: "Catálogo GestiónPlex Restaurantes 2025.pdf",
                  tamanio: "PDF · Catálogo completo de planes"
                })}
              >
                <IconoPdfAdjunto />
                <div className="mpr-chat-pdf-info">
                  <span className="mpr-chat-pdf-name">Catálogo GestiónPlex Restaurantes 2025.pdf</span>
                  <span className="mpr-chat-pdf-hint">Toca para ver el catálogo completo de planes</span>
                </div>
                <button
                  className="mpr-chat-pdf-ver"
                  onClick={(e) => { e.stopPropagation(); setVisorPdf({
                    url: "/catalogos/gestionplex-restaurante-2025.pdf",
                    nombre: "Catálogo GestiónPlex Restaurantes 2025.pdf",
                    tamanio: "PDF · Catálogo completo de planes"
                  }); }}
                >
                  Ver&nbsp;
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
 
              {/* Historial de mensajes */}
              <div className="mpr-chat-messages">
                {mensajesChat.map((mensaje, index) => (
                  <div key={index} className={`mpr-msg mpr-msg--${mensaje.tipo}`}>
                    {mensaje.tipo === "bot" && (
                      <div className="mpr-msg-avatar-bot">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="mpr-msg-content">
                      <p className="mpr-msg-texto">{mensaje.texto}</p>
                      <span className="mpr-msg-hora">{mensaje.hora}</span>
                    </div>
                  </div>
                ))}
                <div ref={refFinChat} />
              </div>
 
              {/* Respuestas rápidas predefinidas */}
              <div className="mpr-quick-replies">
                {CHATBOT_RESPUESTAS_RAPIDAS.map((pregunta) => (
                  <button
                    key={pregunta}
                    className="mpr-quick-btn"
                    onClick={() => handleEnviarMensajeChat(pregunta)}
                  >
                    {pregunta}
                  </button>
                ))}
              </div>
 
              {/* Input libre del usuario */}
              <div className="mpr-chat-input-row">
                <input
                  className="mpr-chat-input"
                  placeholder="Escribe tu pregunta..."
                  value={inputChat}
                  onChange={(e) => setInputChat(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleEnviarMensajeChat(inputChat)}
                />
                <button className="mpr-chat-send" onClick={() => handleEnviarMensajeChat(inputChat)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2.2" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
 
            </div>
          )}{/* /mpr-chat */}
 
        </div>{/* /mpr-body */}
 
        {/* ── Popover detalle de feature (sobre todo el modal) ── */}
        {featureAbierta && (
          <PopoverDetalleFeature
            nombreFeature={featureAbierta}
            onCerrar={() => setFeatureAbierta(null)}
          />
        )}
 
        {/* ── FAB flotante para abrir/cerrar chatbot ── */}
        <button
          className={`mpr-fab-chat${chatVisible ? " mpr-fab-chat--active" : ""}`}
          onClick={() => setChatVisible(!chatVisible)}
          title="Asistente virtual"
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
 
      </div>{/* /mpr-modal */}

      <VisorCatalogoPDF
        isOpen={!!visorPdf}
        onClose={() => setVisorPdf(null)}
        pdfUrl={visorPdf?.url || ""}
        pdfNombre={visorPdf?.nombre || ""}
        pdfTamanio={visorPdf?.tamanio || ""}
        accentColor="#F97316"
      />

    </div>
  );
}

export default ModalPlanesRestaurante;