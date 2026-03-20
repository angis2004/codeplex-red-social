/* ═══════════════════════════════════════════════════════════
   transporte.data.ts
   Datos de contenido de Gestión-Plex Transporte — separados de la UI.
   Para cambiar precios, planes o textos, edita solo este archivo.
═══════════════════════════════════════════ */

export interface PrecioTransporte {
  mensual: string;
  anual: string;
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

/* ── Precios por plan y periodo ── */
export const PRECIOS_TRANSPORTE: Record<string, PrecioTransporte> = {
  gratis:     { mensual: "0",   anual: "0" },
  transporte: { mensual: "150", anual: "1,500" },
};

/* ── Lista de funcionalidades incluidas en ambos planes ── */
export const FEATURES_LISTA_TRANSPORTE: string[] = [
  "Configuración completa",
  "Guías electrónicas (Remitente + Transportista)",
  "Modulo Transportista",
  "Compras + Liquidación por chofer",
  "Ventas + POS + SUNAT",
  "Tesorería + Liquidación de viajes",
  "Soporte + Contable GRATIS",
];

/* ── Descripciones de features (popover al hacer click) ── */
export const FEATURES_TRANSPORTE: Record<string, FeatureInfo> = {
  "Configuración completa": {
    titulo: "Configuración Completa",
    desc: "Configura tu empresa con logo, datos fiscales, múltiples sedes, unidades de transporte, conductores y tarifas. Incluye importación masiva de datos y personalización de documentos.",
  },
  "Guías electrónicas (Remitente + Transportista)": {
    titulo: "Guías Electrónicas SUNAT",
    desc: "Emite guías de remisión electrónicas tanto como Remitente como Transportista, validadas en tiempo real por SUNAT. Compatible con impresoras térmicas y A4.",
  },
  "Modulo Transportista": {
    titulo: "Módulo Transportista",
    desc: "Gestiona tu flota de vehículos, asigna choferes a rutas, registra kilómetros recorridos, combustible y mantenimientos. Control completo de cada viaje.",
  },
  "Compras + Liquidación por chofer": {
    titulo: "Compras y Liquidación por Chofer",
    desc: "Registra compras de combustible, peajes y gastos de ruta por chofer. Genera liquidaciones automáticas por viaje o período, con aprobación digital.",
  },
  "Ventas + POS + SUNAT": {
    titulo: "Ventas POS + SUNAT",
    desc: "Emite facturas, boletas y notas de crédito electrónicas desde el POS validadas por SUNAT. Compatible con múltiples formas de pago y puntos de emisión.",
  },
  "Tesorería + Liquidación de viajes": {
    titulo: "Tesorería y Liquidación de Viajes",
    desc: "Controla el flujo de caja, concilia pagos de fletes, anticipa a choferes y genera reportes de rentabilidad por viaje, ruta o unidad de transporte.",
  },
  "Soporte + Contable GRATIS": {
    titulo: "Soporte + Sistema Contable GRATIS",
    desc: "Accede a soporte técnico por chat y correo incluido en tu plan. El sistema contable básico está incluido sin costo adicional para llevar tu contabilidad al día.",
  },
};

/* ── Chatbot ── */
export const CHATBOT_PREGUNTAS_TRANSPORTE: string[] = [
  "¿Qué incluye el Plan Transporte?",
  "¿Cuántas sedes puedo tener?",
  "¿Qué son las guías electrónicas?",
  "¿Puedo cambiar de plan?",
  "¿Hay prueba gratis?",
];

export const CHATBOT_RESPUESTAS_TRANSPORTE: Record<string, string> = {
  "¿Qué incluye el Plan Transporte?":
    "El Plan Transporte incluye todo lo del plan Gratis más: 3 sedes/transportistas, mayor capacidad operativa y todas las funciones activas con soporte prioritario.",
  "¿Cuántas sedes puedo tener?":
    "El plan Gratis permite 1 sede/transportista. El Plan Transporte (S/150/mes) permite hasta 3 sedes o unidades de transporte.",
  "¿Qué son las guías electrónicas?":
    "Las guías de remisión electrónicas son documentos SUNAT que amparan el traslado de bienes. Puedes emitirlas como Remitente o Transportista desde el sistema.",
  "¿Puedo cambiar de plan?":
    "¡Sí! Puedes cambiar de plan en cualquier momento desde tu panel de administración. El cambio se aplica inmediatamente.",
  "¿Hay prueba gratis?":
    "¡Sí! El plan Gratis no tiene costo y te permite probar con 1 empresa y 1 sede. Además, el primer mes del Plan Transporte es gratis.",
};

export const CHATBOT_BIENVENIDA_TRANSPORTE: MensajeChatbot = {
  tipo: "bot",
  texto: "¡Hola! 👋 Soy el asistente de Gestión-Plex Transporte. Conozco todos los planes y puedo responder tus dudas.\n¿En qué te ayudo?",
  hora: "09:30",
};
