/* ═══════════════════════════════════════════════════════════
   grifo.data.js
   Datos de contenido de Gestión-Plex Grifo — separados de la UI.
   Para cambiar precios, planes o textos, edita solo este archivo.
═══════════════════════════════════════════ */

/* ── Precios por plan y periodo ── */
export const PRECIOS_GRIFO = {
  gratis: { mensual: "0",   anual: "0" },
  grifo:  { mensual: "350", anual: "3,500" },
};

/* ── Lista de funcionalidades incluidas en ambos planes ── */
export const FEATURES_LISTA_GRIFO = [
  "Modulo de Grifo Completo",
  "Vales de crédito + Liquidación",
  "Ventas + POS + SUNAT",
  "Compras avanzadas",
  "Tesorería completa",
  "Cuentas Corrientes",
  "Producción + Procesos",
  "Reportes + Inventarios",
  "Soporte + Contable GRATIS",
];

/* ── Descripciones de features (popover al hacer click) ── */
export const FEATURES_GRIFO = {
  "Modulo de Grifo Completo": {
    titulo: "Módulo de Grifo Completo",
    desc: "Gestiona despachos de combustible por isla, surtidor y producto (gasohol, diesel, GLP). Controla turnos, aforos de tanques, lecturas de medidores y emite tickets automáticos por cada despacho.",
  },
  "Vales de crédito + Liquidación": {
    titulo: "Vales de Crédito y Liquidación",
    desc: "Emite y controla vales de crédito para clientes frecuentes y empresas. Genera liquidaciones diarias por turno, operador y surtidor con conciliación automática de pagos.",
  },
  "Ventas + POS + SUNAT": {
    titulo: "Ventas POS + SUNAT",
    desc: "Emite facturas, boletas y notas de crédito electrónicas validadas por SUNAT en tiempo real. Compatible con impresoras térmicas, surtidores electrónicos y lectores de placa.",
  },
  "Compras avanzadas": {
    titulo: "Compras Avanzadas",
    desc: "Registra órdenes de compra a proveedores de combustible, controla guías de remisión, recepciones de tanques y concilia automáticamente con las facturas de los distribuidores.",
  },
  "Tesorería completa": {
    titulo: "Tesorería Completa",
    desc: "Controla el flujo de caja diario, concilia pagos en efectivo, tarjeta, POS y transferencias. Genera cierres de caja por turno y reportes de ingresos por tipo de combustible.",
  },
  "Cuentas Corrientes": {
    titulo: "Cuentas Corrientes",
    desc: "Gestiona créditos y cobros a clientes corporativos. Lleva el saldo de cada cuenta, emite estados de cuenta mensuales y controla límites de crédito por cliente o empresa.",
  },
  "Producción + Procesos": {
    titulo: "Producción y Procesos",
    desc: "Registra mermas, trasvases y ajustes de inventario de combustible. Controla el aforo real de tanques vs. aforo teórico y genera alertas de abastecimiento automáticas.",
  },
  "Reportes + Inventarios": {
    titulo: "Reportes e Inventarios",
    desc: "Genera reportes de ventas por combustible, turno, operador y surtidor. Incluye inventario valorizado, análisis de rentabilidad y exportación a Excel/PDF.",
  },
  "Soporte + Contable GRATIS": {
    titulo: "Soporte + Sistema Contable GRATIS",
    desc: "Accede a soporte técnico por chat y correo incluido en tu plan. El sistema contable básico está incluido sin costo adicional para llevar tu contabilidad al día.",
  },
};

/* ── Chatbot ── */
export const CHATBOT_PREGUNTAS_GRIFO = [
  "¿Qué incluye el Plan Grifo?",
  "¿Qué son los vales de crédito?",
  "¿Qué es la liquidación de turno?",
  "¿Puedo cambiar de plan?",
  "¿Hay prueba gratis?",
];

export const CHATBOT_RESPUESTAS_GRIFO = {
  "¿Qué incluye el Plan Grifo?":
    "El Plan Grifo (S/350/mes) incluye todas las funciones del plan Gratis activadas al 100%, usuarios ilimitados, mayor capacidad operativa y soporte prioritario.",
  "¿Qué son los vales de crédito?":
    "Los vales de crédito permiten despachar combustible a clientes frecuentes o empresas sin pago inmediato. Se lleva un registro de deuda y se cobra al final del período acordado.",
  "¿Qué es la liquidación de turno?":
    "La liquidación de turno es el resumen de todos los despachos, pagos y diferencias al cierre de cada turno de trabajo. Se genera automáticamente por operador y surtidor.",
  "¿Puedo cambiar de plan?":
    "¡Sí! Puedes cambiar de plan en cualquier momento desde tu panel de administración. El cambio se aplica inmediatamente.",
  "¿Hay prueba gratis?":
    "¡Sí! El plan Gratis no tiene costo. Además, el primer mes del Plan Grifo es gratis para que puedas probarlo sin compromiso.",
};

export const CHATBOT_BIENVENIDA_GRIFO = {
  tipo: "bot",
  texto: "¡Hola! 👋 Soy el asistente de Gestión-Plex Grifo. Conozco todos los planes y puedo responder tus dudas.\n¿En qué te ayudo?",
  hora: "09:30",
};
