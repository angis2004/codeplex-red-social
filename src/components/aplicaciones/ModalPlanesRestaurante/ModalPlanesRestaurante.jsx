import React, { useState, useRef, useEffect } from "react";
import "./ModalPlanesRestaurante.css";

/* ─── Icono restaurante (tenedor/cuchillo en naranja) ─── */
function IconoRestaurante({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#F97316" />
      <rect x="12" y="14" width="5" height="22" rx="2.5" fill="white" opacity="0.5" />
      <rect x="20" y="14" width="5" height="16" rx="2.5" fill="white" opacity="0.8" />
      <rect x="28" y="14" width="5" height="10" rx="2.5" fill="white" />
    </svg>
  );
}

/* ─── Check icon naranja ─── */
function CheckNaranja({ white }) {
  const color = white ? "#fff" : "#F97316";
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="7.5" cy="7.5" r="7.5" fill={white ? "rgba(255,255,255,0.2)" : "#FEF3C7"} />
      <path d="M4.5 7.5L6.5 9.5L10.5 5.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── X icon ─── */
function XIcon({ white }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="5" cy="5" r="5" fill={white ? "rgba(255,255,255,0.2)" : "#FEE2E2"} />
      <path d="M3.5 3.5L6.5 6.5M6.5 3.5L3.5 6.5" stroke={white ? "#fff" : "#EF4444"} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/* ─── PDF icon ─── */
function PdfIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect width="36" height="36" rx="8" fill="#FEF3C7" />
      <path d="M10 8h12l6 6v18H10V8z" fill="#F59E0B" />
      <path d="M22 8l6 6h-6V8z" fill="#D97706" />
      <text x="13" y="26" fontSize="7" fill="white" fontWeight="bold">PDF</text>
    </svg>
  );
}

/* ─── Info de cada feature (el usuario puede editar el texto) ─── */
const FEATURE_INFO = {
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

/* ─── Mensajes rápidos del chatbot ─── */
const QUICK_REPLIES = [
  "¿Cuál plan si tengo 20 empresas?",
  "¿Qué incluye el Gold?",
  "¿Puedo cambiar de plan?",
  "¿Qué son Activos Fijos?",
  "¿Hay prueba gratis?",
];

/* ─── Respuestas automáticas del bot ─── */
const BOT_RESPONSES = {
  "¿Cuál plan si tengo 20 empresas?": "Para 20 empresas, el plan Gold es ideal ya que incluye mayor capacidad operativa y soporte prioritario. Contáctanos para un plan corporativo personalizado.",
  "¿Qué incluye el Gold?": "El plan Gold incluye todo lo del Básico más: Transferencia entre caja y Bancos, carga de constancias JPG/PDF/DOC, mayor capacidad operativa y soporte prioritario preferencial.",
  "¿Puedo cambiar de plan?": "¡Sí! Puedes cambiar de plan en cualquier momento desde tu panel de administración. El cambio se aplica de forma inmediata.",
  "¿Qué son Activos Fijos?": "Los activos fijos son bienes que la empresa posee y usa en sus operaciones a largo plazo (equipos, mobiliario, vehículos). El módulo te permite registrarlos y depreciarlos.",
  "¿Hay prueba gratis?": "¡Sí! El plan Gratis no tiene costo y te permite probar la plataforma con 1 empresa. Además, el plan Básico incluye 1 mes gratis.",
};

/* ═══════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
═══════════════════════════════════════════════════════ */
/* ─── Popover de feature ─── */
function FeaturePopover({ feature, onClose }) {
  const info = FEATURE_INFO[feature];
  if (!info) return null;
  return (
    <div className="mpr-popover-overlay" onClick={onClose}>
      <div className="mpr-popover" onClick={(e) => e.stopPropagation()}>
        <button className="mpr-popover-close" onClick={onClose}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 2L8 8M8 2L2 8" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
        <h4 className="mpr-popover-titulo">{info.titulo}</h4>
        <p className="mpr-popover-desc">{info.desc}</p>
      </div>
    </div>
  );
}

function ModalPlanesRestaurante({ isOpen, onClose, onProcederPago }) {
  const [billing, setBilling] = useState("mensual");
  const [planSel, setPlanSel] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [mensajes, setMensajes] = useState([
    {
      tipo: "bot",
      texto: "¡Hola! 👋 Soy el asistente de CodePlex. He leído el catálogo completo y puedo responder todas tus dudas sobre planes y precios.\n¿En qué te ayudo?",
      hora: "09:30",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (showChat) chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, showChat]);

  if (!isOpen) return null;

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const enviarMensaje = (texto) => {
    if (!texto.trim()) return;
    const hora = new Date().toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });
    setMensajes((prev) => [...prev, { tipo: "usuario", texto, hora }]);
    setInputVal("");
    setTimeout(() => {
      const resp = BOT_RESPONSES[texto] || "Gracias por tu consulta. Un asesor te contactará pronto para brindarte más información.";
      setMensajes((prev) => [...prev, { tipo: "bot", texto: resp, hora }]);
    }, 800);
  };

  const precioBasico = billing === "mensual" ? "150" : "1,500";
  const precioGold   = billing === "mensual" ? "300" : "3,000";
  const periodoLabel = billing === "mensual" ? "/mes" : "/año";

  const planNombreDisplay = { gratis: "Gratis", basico: "Básico", gold: "Gold" }[planSel] || "";

  const handleContinuar = () => {
    const precio = planSel === "gratis" ? "0" : planSel === "basico" ? precioBasico.replace(",", "") : precioGold.replace(",", "");
    onProcederPago?.({ planNombre: planSel, precio, billing });
  };

  return (
    <div className="mpr-overlay" onClick={handleBackdrop}>
      <div className="mpr-modal">

        {/* ── Botón cerrar ── */}
        <button className="mpr-close" onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2L12 12M12 2L2 12" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>

        {/* ── CONTENIDO PRINCIPAL (planes + chatbot) ── */}
        <div className="mpr-body">

          {/* ── COLUMNA IZQUIERDA: Planes ── */}
          <div className={`mpr-planes-wrap${showChat ? " mpr-planes-wrap--dimmed" : ""}`}>

            {/* Header */}
            <div className="mpr-header">
              <IconoRestaurante size={52} />
              <h2 className="mpr-titulo">Gestión-Plex Restaurantes</h2>
              <p className="mpr-subtitulo">Elige el plan perfecto para ti  con comprobantes ilimitados</p>
              <div className="mpr-badges">
                <span className="mpr-badge-pill">1 mes gratis</span>
                <span className="mpr-badge-pill">IGV incluido</span>
              </div>
              {/* Toggle mensual/anual */}
              <div className="mpr-toggle">
                <button
                  className={`mpr-toggle-btn${billing === "mensual" ? " mpr-toggle-btn--active" : ""}`}
                  onClick={() => setBilling("mensual")}
                >Mensual</button>
                <button
                  className={`mpr-toggle-btn${billing === "anual" ? " mpr-toggle-btn--active" : ""}`}
                  onClick={() => setBilling("anual")}
                >Anual</button>
              </div>
            </div>

            {/* Tarjetas de planes */}
            <div className="mpr-planes">

              {/* ── Plan Gratis ── */}
              <div className={`mpr-plan mpr-plan--gratis${planSel === "gratis" ? " mpr-plan--selected" : ""}`}>
                <h3 className="mpr-plan-titulo mpr-plan-titulo--naranja">Gratis</h3>
                <div className="mpr-precio">
                  <span className="mpr-precio-moneda">s/</span>
                  <span className="mpr-precio-num">0</span>
                  <span className="mpr-precio-per">{periodoLabel}</span>
                </div>
                <div className="mpr-plan-tags">
                  <span className="mpr-tag mpr-tag--outline">1 Empresa</span>
                </div>
                <ul className="mpr-features">
                  {["Configuraciones completas","Ventas POS + SUNAT","Ventas en Restaurante","Tesorería","Soporte + Sistema Contable GRATIS"].map(f => (
                    <li key={f} className="mpr-feature-clickable" onClick={() => setActiveTooltip(f)}>
                      <CheckNaranja /><span>{f}</span>
                    </li>
                  ))}
                  <li className="mpr-feature-disabled mpr-feature-clickable" onClick={() => setActiveTooltip("3-sucursales(SOLO 2)")}>
                    <XIcon />
                    <span>3-sucursales(SOLO 2)</span>
                  </li>
                </ul>
                <button
                  className={`mpr-btn-plan mpr-btn-plan--outline${planSel === "gratis" ? " mpr-btn-plan--seleccionado" : ""}`}
                  onClick={() => setPlanSel("gratis")}
                >
                  {planSel === "gratis" ? "Seleccionado" : "Elegir Plan"}
                </button>
              </div>

              {/* ── Plan Básico ── */}
              <div className={`mpr-plan mpr-plan--basico${planSel === "basico" ? " mpr-plan--selected mpr-plan--basico-selected" : ""}`}>
                <h3 className="mpr-plan-titulo mpr-plan-titulo--naranja">Básico</h3>
                <div className="mpr-precio">
                  <span className="mpr-precio-moneda">s/</span>
                  <span className="mpr-precio-num">{precioBasico}</span>
                  <span className="mpr-precio-per">{periodoLabel}</span>
                </div>
                <div className="mpr-plan-tags">
                  <span className="mpr-tag mpr-tag--filled">2 Empresas</span>
                  <span className="mpr-tag mpr-tag--filled">1 mes gratis</span>
                </div>
                <ul className="mpr-features">
                  {["Configuraciones completas","Ventas POS + SUNAT","Ventas en Restaurante","Tesorería","Soporte + Sistema Contable GRATIS"].map(f => (
                    <li key={f} className="mpr-feature-clickable" onClick={() => setActiveTooltip(f)}>
                      <CheckNaranja /><span>{f}</span>
                    </li>
                  ))}
                  <li className="mpr-feature-disabled mpr-feature-clickable" onClick={() => setActiveTooltip("3-sucursales(SOLO 2)")}>
                    <XIcon />
                    <span>3-sucursales(SOLO 2)</span>
                  </li>
                </ul>
                <button
                  className={`mpr-btn-plan ${planSel === "basico" ? "mpr-btn-plan--filled mpr-btn-plan--seleccionado" : "mpr-btn-plan--outline"}`}
                  onClick={() => setPlanSel("basico")}
                >
                  {planSel === "basico" ? "Seleccionado" : "Elegir Plan"}
                </button>
              </div>

              {/* ── Plan Gold ── */}
              <div className={`mpr-plan mpr-plan--gold${planSel === "gold" ? " mpr-plan--selected" : ""}`}>
                <div className="mpr-popular-badge">MAS POPULAR</div>
                <h3 className="mpr-plan-titulo mpr-plan-titulo--white">Gold</h3>
                <div className="mpr-precio mpr-precio--white">
                  <span className="mpr-precio-moneda">s/</span>
                  <span className="mpr-precio-num">{precioGold}</span>
                  <span className="mpr-precio-per">{periodoLabel}</span>
                </div>
                <div className="mpr-plan-tags">
                  <span className="mpr-tag mpr-tag--white-outline">3 Empresas</span>
                  <span className="mpr-tag mpr-tag--white-outline">1 mes gratis</span>
                </div>
                <ul className="mpr-features mpr-features--white">
                  <li className="mpr-feature-gold-title mpr-feature-clickable" onClick={() => setActiveTooltip("Todo lo del Básico +")}>
                    <CheckNaranja white />
                    <span><strong><u>Todo lo del Básico +</u></strong></span>
                  </li>
                  {["Transferencia entre caja y Bancos","Carga de constancias JPG/PDF/DOC","Mayor Capacidad Operativa","Soporte prioritario preferencial"].map(f => (
                    <li key={f} className="mpr-feature-clickable" onClick={() => setActiveTooltip(f)}>
                      <CheckNaranja white /><span><u>{f}</u></span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`mpr-btn-plan mpr-btn-plan--white${planSel === "gold" ? " mpr-btn-plan--seleccionado-white" : ""}`}
                  onClick={() => setPlanSel("gold")}
                >
                  {planSel === "gold" ? "Seleccionado" : "Elegir Plan"}
                </button>
              </div>

            </div>

            {/* Footer hint */}
            <div className="mpr-footer-hint">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span>¿Tienes dudas sobre los planes?</span>
            </div>

            {/* Botón continuar — aparece al seleccionar un plan */}
            {planSel && (
              <button className="mpr-btn-continuar" onClick={handleContinuar}>
                Continuar con Plan {planNombreDisplay}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            )}
          </div>

          {/* ── BACKDROP mobile para el chat (fixed, cubre el modal) ── */}
          {showChat && (
            <div className="mpr-chat-backdrop" onClick={() => setShowChat(false)} />
          )}

          {/* ── CHAT PANEL ── */}
          {showChat && (
            <div className="mpr-chat">
              {/* Header del chat */}
              <div className="mpr-chat-header">
                <div className="mpr-chat-header-left">
                  <div className="mpr-chat-avatar">
                    <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
                      <rect width="48" height="48" rx="12" fill="white" opacity="0.2"/>
                      <path d="M16 18h-4v14l4-4h16V18H16z" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
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
                <button className="mpr-chat-close" onClick={() => setShowChat(false)}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 2L10 10M10 2L2 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Adjunto PDF */}
              <div className="mpr-chat-pdf">
                <PdfIcon />
                <div className="mpr-chat-pdf-info">
                  <span className="mpr-chat-pdf-name">Catalogo Gestion-Plex Restaurantes 2025.pdf</span>
                  <span className="mpr-chat-pdf-hint">Toca para ver el catálogo completo de planes</span>
                </div>
                <button className="mpr-chat-pdf-ver">
                  Ver&nbsp;
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>

              {/* Mensajes */}
              <div className="mpr-chat-messages">
                {mensajes.map((m, i) => (
                  <div key={i} className={`mpr-msg mpr-msg--${m.tipo}`}>
                    {m.tipo === "bot" && (
                      <div className="mpr-msg-avatar-bot">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                      </div>
                    )}
                    <div className="mpr-msg-content">
                      <p className="mpr-msg-texto">{m.texto}</p>
                      <span className="mpr-msg-hora">{m.hora}</span>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Quick replies */}
              <div className="mpr-quick-replies">
                {QUICK_REPLIES.map((q) => (
                  <button key={q} className="mpr-quick-btn" onClick={() => enviarMensaje(q)}>
                    {q}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="mpr-chat-input-row">
                <input
                  className="mpr-chat-input"
                  placeholder="Escribe tu pregunta..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && enviarMensaje(inputVal)}
                />
                <button className="mpr-chat-send" onClick={() => enviarMensaje(inputVal)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2.2" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Popover de feature ── */}
        {activeTooltip && (
          <FeaturePopover
            feature={activeTooltip}
            onClose={() => setActiveTooltip(null)}
          />
        )}

        {/* ── FAB chat flotante ── */}
        <button
          className={`mpr-fab-chat${showChat ? " mpr-fab-chat--active" : ""}`}
          onClick={() => setShowChat(!showChat)}
          title="Asistente virtual"
        >
          {showChat ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="white"/>
            </svg>
          )}
        </button>

      </div>
    </div>
  );
}

export default ModalPlanesRestaurante;
