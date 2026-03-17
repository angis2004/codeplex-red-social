/* ═══════════════════════════════════════════════════════════
   contaplex.data.js
   Datos de contenido de Conta-Plex — separados de la UI.
   Para cambiar precios, planes o textos, edita solo este archivo.
═══════════════════════════════════════════════════════════ */

/* ── Planes independientes (7 planes) ── */
export const PLANES_IND = [
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
      { texto: "Todo lo del Premium 2 +",           check: true },
      { texto: "Estado de Flujo Efectivo",          check: true },
      { texto: "Estado de cambios en Patrimonio",   check: true },
      { texto: "Libro de Retenciones",              check: false },
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

/* ── Planes empresariales (2 planes) ── */
export const PLANES_EMP = [
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
      { texto: "App Móvil Gerencial",             check: true },
      { texto: "Resumen de Ingresos y Egresos",   check: true },
      { texto: "Saldo de bancos",                 check: true },
      { texto: "CxC y CxP - detalle y resumen",  check: true },
      { texto: "Flujo de Caja Móvil",            check: true },
    ],
  },
];

/* ── Chatbot ── */
export const CHATBOT_QUICK = [
  "¿Cuál plan si tengo 20 empresas?",
  "¿Qué incluye el Gold?",
  "¿Puedo cambiar de plan?",
  "¿Qué son Activos Fijos?",
  "¿Hay prueba gratis?",
];

export const CHATBOT_RESPUESTAS = {
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

export const CHATBOT_MSG_INICIAL = {
  tipo: "bot",
  texto: "¡Hola! 👋 Soy el asistente de Conta-Plex. He leído el catálogo completo y puedo responder todas tus dudas sobre planes y precios.\n¿En qué te ayudo?",
  hora: "09:30",
};

/* ── Info de features (popover al hacer click) ── */
export const FEATURES_INFO = {
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
