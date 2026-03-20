/* ═══════════════════════════════════════════════════════════
   facturacion.data.ts
   Datos de contenido de Facturación Electrónica — separados de la UI.
   Para cambiar precios, planes o textos, edita solo este archivo.
═══════════════════════════════════════════ */

export interface PrecioFacturacion {
  mensual: string;
  anual: string;
}

export interface PaqueteComprobantes {
  rango: string;
  tarifa: string;
  total: string;
}

export interface FeatureInfoFacturacion {
  titulo: string;
  desc: string;
}

export interface PlanFacturacion {
  key: string;
  nombre: string;
  dark: boolean;
  badge: string | null;
  sede: string;
  features: string[];
}

export interface MensajeChatbot {
  tipo: string;
  texto: string;
  hora: string;
}

/* ── Precios por plan y periodo ── */
export const PRECIOS_FACTURACION: Record<string, PrecioFacturacion> = {
  gratis:  { mensual: "0",   anual: "0" },
  basico:  { mensual: "50",  anual: "500" },
  premium: { mensual: "150", anual: "1,500" },
  gold:    { mensual: "200", anual: "2,000" },
};

/* ── Paquetes de comprobantes adicionales ── */
export const PAQUETES_COMPROBANTES: PaqueteComprobantes[] = [
  { rango: "1 - 1,000 comprobantes",       tarifa: "S/0.030 c/u", total: "S/30.00" },
  { rango: "1,000 - 5,000 comprobantes",   tarifa: "S/0.030 c/u", total: "S/30.00" },
  { rango: "5,000 - 10,000 comprobantes",  tarifa: "S/0.030 c/u", total: "S/30.00" },
  { rango: "10,001 - 50,000 comprobantes", tarifa: "S/0.030 c/u", total: "S/30.00" },
];

/* ── Descripciones de features (popover al hacer click) ── */
export const FEATURES_FACTURACION: Record<string, FeatureInfoFacturacion> = {
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

/* ── Planes de suscripción ── */
export const PLANES_FACTURACION: PlanFacturacion[] = [
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

/* ── Chatbot ── */
export const CHATBOT_PREGUNTAS_FACTURACION: string[] = [
  "¿Qué incluye el Plan Premium?",
  "¿Qué son los comprobantes adicionales?",
  "¿Puedo tener varias sucursales?",
  "¿Puedo cambiar de plan?",
  "¿Hay prueba gratis?",
];

export const CHATBOT_RESPUESTAS_FACTURACION: Record<string, string> = {
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

export const CHATBOT_BIENVENIDA_FACTURACION: MensajeChatbot = {
  tipo: "bot",
  texto: "¡Hola! 👋 Soy el asistente de Facturación Electrónica. Puedo ayudarte a elegir el plan ideal para tu empresa.\n¿En qué te ayudo?",
  hora: "09:30",
};
