import React, { useState, useRef, useEffect } from "react";
import "./ModalPlanesContaPlex.css";
import VisorCatalogoPDF from "../../ui/visor-catalogo/VisorCatalogoPDF";

/* ───────────────────────────────────────────
   DATOS — Planes independientes (7 planes)
─────────────────────────────────────────── */
const PLANES_IND = [
  {
    id: "gratis",
    nombre: "Gratis",
    precio: { mensual: "0", anual: "0" },
    empresas: "1 Empresa",
    dark: false,
    popular: false,
    features: [
      { texto: "Configuración Básica",          check: null },
      { texto: "Procesos Contables Esenciales", check: true },
      { texto: "Libros Contables",              check: true },
      { texto: "PLE - SIRE incluido",           check: true },
    ],
  },
  {
    id: "basico",
    nombre: "Básico",
    precio: { mensual: "50", anual: "500" },
    empresas: "5 Empresas",
    dark: false,
    popular: false,
    features: [
      { texto: "Configuración Básica",          check: true },
      { texto: "Procesos Contables Esenciales", check: true },
      { texto: "Libros Contables",              check: true },
      { texto: "PLE - SIRE incluido",           check: true },
      { texto: "Reportes + seguridad completa", check: true },
    ],
  },
  {
    id: "estandar",
    nombre: "Estándar",
    precio: { mensual: "100", anual: "1,000" },
    empresas: "15 EmpresaS",
    dark: false,
    popular: false,
    features: [
      { texto: "Todo lo del Básico incluido",   check: true },
      { texto: "x3 veces mas Empresas",         check: true },
      { texto: "Procesos + diario automatico",  check: true },
      { texto: "Todos los libros y reportes",   check: true },
    ],
  },
  {
    id: "premium1",
    nombre: "Premium 1",
    precio: { mensual: "150", anual: "1,500" },
    empresas: "25 Empresas",
    dark: false,
    popular: false,
    features: [
      { texto: "Todo lo del estándar +",        check: true },
      { texto: "Activos Fijos",                 check: true },
      { texto: "Centro de Costos",              check: true },
      { texto: "Registro de Letras",            check: true },
      { texto: "Asientos por Dif. de TC",       check: true },
      { texto: "Liquidación IGV y RTA",         check: true },
      { texto: "Compensaciones",                check: false },
    ],
  },
  {
    id: "premium2",
    nombre: "Premium 2",
    precio: { mensual: "200", anual: "2,000" },
    empresas: "35 Empresas",
    dark: true,
    popular: true,
    features: [
      { texto: "Todo lo del Premium 1 +",       check: true,  highlight: true },
      { texto: "Compensaciones",                check: true,  highlight: true },
      { texto: "Hasta 35 empresas",             check: true,  highlight: true },
      { texto: "Reportes + seguridad",          check: true,  highlight: true },
      { texto: "Flujo de Efectivo",             check: false },
    ],
  },
  {
    id: "premium3",
    nombre: "Premium 3",
    precio: { mensual: "250", anual: "2,500" },
    empresas: "45 Empresas",
    dark: false,
    popular: false,
    features: [
      { texto: "Todo lo del Premium 2 +",       check: true },
      { texto: "Estado de Flujo Efectivo",      check: true },
      { texto: "Estado de cambios en Patrimonio", check: true },
      { texto: "Libro de Retenciones",          check: false },
    ],
  },
  {
    id: "gold",
    nombre: "Gold",
    precio: { mensual: "300", anual: "3,000" },
    empresas: "55 Empresas",
    dark: false,
    popular: false,
    features: [
      { texto: "Todo lo del Premium 3+",        check: true },
      { texto: "Libro de reclamaciones",        check: true },
      { texto: "Libro Activos Fijos Sunat",     check: true },
      { texto: "App Móvil Gerencial",           check: true },
    ],
  },
];

/* ───────────────────────────────────────────
   DATOS — Planes empresariales (2 planes)
─────────────────────────────────────────── */
const PLANES_EMP = [
  {
    id: "basico",
    nombre: "Básico",
    precio: { mensual: "150", anual: "1,500" },
    empresas: "5 Empresas",
    dark: false,
    popular: false,
    features: [
      { texto: "Configuraciones completas",       check: true },
      { texto: "Procesos Contables Esenciales",   check: true },
      { texto: "PLE - SIRE incluido",             check: true },
      { texto: "Reportes Contables",              check: true },
      { texto: "Libros Contables completos",      check: true },
      { texto: "App Móvil Gerencial",             check: false },
    ],
  },
  {
    id: "premium2",
    nombre: "Premium 2",
    precio: { mensual: "300", anual: "3,000" },
    empresas: "35 Empresas",
    dark: true,
    popular: true,
    features: [
      { texto: "Todo lo del Básico +",            check: true,  highlight: true },
      { texto: "App Móvil Gerencial",             check: true  },
      { texto: "Resumen de Ingresos y Egresos",   check: true  },
      { texto: "Saldo de bancos",                 check: true  },
      { texto: "CxC y CxP - detalle y resumen",  check: true  },
      { texto: "Flujo de Caja Móvil",            check: true  },
    ],
  },
];

/* ───────────────────────────────────────────
   DATOS — Chatbot
─────────────────────────────────────────── */
const CHATBOT_QUICK = [
  "¿Cuál plan si tengo 20 empresas?",
  "¿Qué incluye el Gold?",
  "¿Puedo cambiar de plan?",
  "¿Qué son Activos Fijos?",
  "¿Hay prueba gratis?",
];

const CHATBOT_RESPUESTAS = {
  "¿Cuál plan si tengo 20 empresas?":
    "Para 20 empresas te recomendamos el plan Estándar (15 empresas) o Premium 1 (25 empresas). Puedes escalar en cualquier momento.",
  "¿Qué incluye el Gold?":
    "El plan Gold incluye todo lo del Premium 3 más: Libro de reclamaciones, Libro de Activos Fijos SUNAT y App Móvil Gerencial.",
  "¿Puedo cambiar de plan?":
    "¡Sí! Puedes cambiar de plan en cualquier momento desde tu panel de administración. El cambio se aplica inmediatamente.",
  "¿Qué son Activos Fijos?":
    "Los activos fijos son bienes que la empresa posee a largo plazo (equipos, mobiliario, vehículos). El módulo te permite registrarlos y depreciarlos automáticamente.",
  "¿Hay prueba gratis?":
    "¡Sí! El plan Gratis no tiene costo y te permite probar con 1 empresa. Además, el primer mes del plan Básico es gratis.",
};

const CHATBOT_MSG_INICIAL = {
  tipo: "bot",
  texto: "¡Hola! 👋 Soy el asistente de Conta-Plex. He leído el catálogo completo y puedo responder todas tus dudas sobre planes y precios.\n¿En qué te ayudo?",
  hora: "09:30",
};


/* ───────────────────────────────────────────
   FEATURES INFO (popover)
─────────────────────────────────────────── */
const FEATURES_INFO = {
  "Configuración Básica": {
    titulo: "Configuración Básica",
    desc: "Configuración inicial de la empresa contable: datos fiscales, plan de cuentas, parámetros del sistema.",
  },
  "Configuraciones completas": {
    titulo: "Configuraciones Completas",
    desc: "Configuración completa de todas las cuentas contables, centros de costos, tipos de cambio y parámetros del sistema.",
  },
  "Procesos Contables Esenciales": {
    titulo: "Procesos Contables Esenciales",
    desc: "Registro de asientos contables, diario general, mayor general y balances básicos.",
  },
  "Libros Contables": {
    titulo: "Libros Contables",
    desc: "Generación automática de todos los libros contables exigidos por SUNAT: diario, mayor, inventarios y balances.",
  },
  "Libros Contables completos": {
    titulo: "Libros Contables Completos",
    desc: "Todos los libros contables oficiales con exportación directa a PLE/SIRE y validación automática.",
  },
  "PLE - SIRE incluido": {
    titulo: "PLE - SIRE Incluido",
    desc: "Programa de Libros Electrónicos y Sistema Integrado de Registros Electrónicos incluido sin costo adicional.",
  },
  "Reportes + seguridad completa": {
    titulo: "Reportes + Seguridad Completa",
    desc: "Reportes financieros avanzados (ESF, ERI, EEFE) con control de acceso por usuario y auditoría de cambios.",
  },
  "Reportes Contables": {
    titulo: "Reportes Contables",
    desc: "Estados financieros completos: Balance General, Estado de Resultados, Flujo de Caja y reportes personalizados.",
  },
  "Todo lo del Básico incluido": {
    titulo: "Todo lo del Básico Incluido",
    desc: "Incluye todas las funcionalidades del plan Básico más las características adicionales del plan Estándar.",
  },
  "x3 veces mas Empresas": {
    titulo: "x3 Veces más Empresas",
    desc: "Gestiona hasta 15 empresas con una sola suscripción, ideal para contadores independientes con varios clientes.",
  },
  "Procesos + diario automatico": {
    titulo: "Procesos + Diario Automático",
    desc: "Generación automática de asientos contables desde documentos de compra, venta y bancos.",
  },
  "Todos los libros y reportes": {
    titulo: "Todos los Libros y Reportes",
    desc: "Acceso completo a todos los libros contables, reportes fiscales y estados financieros.",
  },
  "Todo lo del estándar +": {
    titulo: "Todo lo del Estándar +",
    desc: "Incluye todo el plan Estándar más módulos avanzados de contabilidad financiera.",
  },
  "Activos Fijos": {
    titulo: "Activos Fijos",
    desc: "Registro, depreciación automática y control de activos fijos según normas SUNAT y NIIF.",
  },
  "Centro de Costos": {
    titulo: "Centro de Costos",
    desc: "Distribución de gastos e ingresos por centros de costos, proyectos o áreas de negocio.",
  },
  "Registro de Letras": {
    titulo: "Registro de Letras",
    desc: "Gestión completa de letras por cobrar y por pagar, protestos, renovaciones y estados de cuenta.",
  },
  "Asientos por Dif. de TC": {
    titulo: "Asientos por Diferencia de TC",
    desc: "Generación automática de asientos por diferencia de tipo de cambio al cierre del período.",
  },
  "Liquidación IGV y RTA": {
    titulo: "Liquidación IGV y RTA",
    desc: "Cálculo y declaración automática del IGV mensual y del Impuesto a la Renta anual.",
  },
  "Compensaciones": {
    titulo: "Compensaciones",
    desc: "Registro y control de compensaciones entre cuentas por cobrar y cuentas por pagar.",
  },
  "Todo lo del Premium 1 +": {
    titulo: "Todo lo del Premium 1 +",
    desc: "Incluye todas las funcionalidades del plan Premium 1 más las características del Premium 2.",
  },
  "Hasta 35 empresas": {
    titulo: "Hasta 35 Empresas",
    desc: "Capacidad ampliada para gestionar hasta 35 empresas simultáneamente.",
  },
  "Reportes + seguridad": {
    titulo: "Reportes + Seguridad",
    desc: "Reportes avanzados con niveles de seguridad por perfil de usuario.",
  },
  "Flujo de Efectivo": {
    titulo: "Flujo de Efectivo",
    desc: "Estado de Flujos de Efectivo (método directo e indirecto) según NIC 7.",
  },
  "Todo lo del Premium 2 +": {
    titulo: "Todo lo del Premium 2 +",
    desc: "Incluye todas las funcionalidades del plan Premium 2 más el Estado de Flujo de Efectivo.",
  },
  "Estado de Flujo Efectivo": {
    titulo: "Estado de Flujo de Efectivo",
    desc: "Estado de Flujos de Efectivo completo con análisis por actividades de operación, inversión y financiamiento.",
  },
  "Estado de cambios en Patrimonio": {
    titulo: "Estado de Cambios en Patrimonio",
    desc: "Estado de Cambios en el Patrimonio Neto según NIIF, con análisis de variaciones.",
  },
  "Libro de Retenciones": {
    titulo: "Libro de Retenciones",
    desc: "Registro oficial del Libro de Retenciones para agentes de retención según exigencia SUNAT.",
  },
  "Todo lo del Premium 3+": {
    titulo: "Todo lo del Premium 3+",
    desc: "Incluye todas las funcionalidades del plan Premium 3 más características exclusivas Gold.",
  },
  "Libro de reclamaciones": {
    titulo: "Libro de Reclamaciones",
    desc: "Libro digital de reclamaciones integrado al sistema para registro y seguimiento de quejas.",
  },
  "Libro Activos Fijos Sunat": {
    titulo: "Libro Activos Fijos SUNAT",
    desc: "Libro de Activos Fijos en formato SUNAT con control de depreciación y exportación a PLE.",
  },
  "App Móvil Gerencial": {
    titulo: "App Móvil Gerencial",
    desc: "Aplicación móvil para gerentes y socios: visualización de KPIs, balances y flujo de caja en tiempo real.",
  },
  "Todo lo del Básico +": {
    titulo: "Todo lo del Básico +",
    desc: "Incluye todo el plan Básico más las funcionalidades del plan Premium 2 empresarial.",
  },
  "Resumen de Ingresos y Egresos": {
    titulo: "Resumen de Ingresos y Egresos",
    desc: "Panel gerencial con resumen visual de ingresos y egresos del período.",
  },
  "Saldo de bancos": {
    titulo: "Saldo de Bancos",
    desc: "Visualización en tiempo real del saldo de todas las cuentas bancarias registradas.",
  },
  "CxC y CxP - detalle y resumen": {
    titulo: "CxC y CxP - Detalle y Resumen",
    desc: "Cuentas por cobrar y por pagar con detalle por cliente/proveedor y resumen ejecutivo.",
  },
  "Flujo de Caja Móvil": {
    titulo: "Flujo de Caja Móvil",
    desc: "Flujo de caja proyectado accesible desde la app móvil con alertas de liquidez.",
  },
};

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
function ModalPlanesContaPlex({ isOpen, onClose, onProcederPago }) {

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
    onClose();
  };

  if (!isOpen) return null;

  const handleClickOverlay = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const planes = tipoSeleccionado === "empresarial" ? PLANES_EMP : PLANES_IND;

  const handleConfirmarPlan = () => {
    const plan = planes.find((p) => p.id === planSeleccionado);
    if (!plan) return;
    onProcederPago?.({
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
                  <button className="mpc-chat-attach">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round">
                      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                    </svg>
                  </button>
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
        isOpen={!!visorPdf}
        onClose={() => setVisorPdf(null)}
        pdfUrl={visorPdf?.url || ""}
        pdfNombre={visorPdf?.nombre || ""}
        pdfTamanio={visorPdf?.tamanio || ""}
        accentColor="#0094C0"
      />

    </div>
  );
}

export default ModalPlanesContaPlex;
