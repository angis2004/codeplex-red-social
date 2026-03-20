/* ═══════════════════════════════════════════════════════════
   gestionplex.data.ts
   Datos de contenido de Gestión-Plex Comercial — separados de la UI.
   Para cambiar precios, planes o textos, edita solo este archivo.
═══════════════════════════════════════════ */

export interface Precio {
  mensual: string;
  anual: string;
}

export interface FeaturePlan {
  texto: string;
  check: boolean;
  highlight?: boolean;
}

export interface PlanComercial {
  id: string;
  nombre: string;
  precio: Precio;
  empresas: string;
  dark: boolean;
  popular: boolean;
  features: FeaturePlan[];
}

export interface FeatureInfo {
  titulo: string;
  desc: string;
}

export interface MensajeChatbot {
  tipo: string;
  texto: string;
  hora: string;
}

/* ── Planes de suscripción ── */
export const PLANES_COMERCIAL: PlanComercial[] = [
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
      { texto: "Todo lo del Básico +",             check: true  },
      { texto: "Transferencia de mercadería",      check: true  },
      { texto: "Tesorería completa",               check: true  },
      { texto: "Inventarios + Completa",           check: true  },
      { texto: "Inventarios + Reportes completos", check: true  },
      { texto: "Cuentas Corrientes",               check: false },
      { texto: "Producción",                       check: false },
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
      { texto: "Todo lo del Premium 1 +",              check: true, highlight: true },
      { texto: "Cuentas Corrientes completas",         check: true, highlight: true },
      { texto: "Transferencias de mercadería",         check: true, highlight: true },
      { texto: "Tesorería + cuentas por cobrar/pagar", check: true, highlight: true },
      { texto: "Producción",                           check: false },
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
      { texto: "Todo lo del Profesional +",    check: true },
      { texto: "Compras Avanzadas",            check: true },
      { texto: "Producción",                   check: true },
      { texto: "Cuentas Corrientes Completas", check: true },
      { texto: "Absolutamente todo incluido",  check: true },
    ],
  },
];

/* ── Chatbot ── */
export const CHATBOT_PREGUNTAS_COMERCIAL: string[] = [
  "¿Qué plan para 10 empresas?",
  "¿Qué incluye el Gold?",
  "¿Qué son Cuentas Corrientes?",
  "¿Puedo cambiar de plan?",
  "¿Hay prueba gratis?",
];

export const CHATBOT_RESPUESTAS_COMERCIAL: Record<string, string> = {
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

export const CHATBOT_BIENVENIDA_COMERCIAL: MensajeChatbot = {
  tipo: "bot",
  texto: "¡Hola! 👋 Soy el asistente de Gestión-Plex Comercial. Conozco todos los planes y puedo responder tus dudas.\n¿En qué te ayudo?",
  hora: "09:30",
};

/* ── Descripciones de features (popover al hacer click) ── */
export const FEATURES_COMERCIAL: Record<string, FeatureInfo> = {
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
