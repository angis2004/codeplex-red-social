/* ═══════════════════════════════════════════════════════════
   restaurante.data.ts
   Datos de contenido de Gestión-Plex Restaurantes — separados de la UI.
   Para cambiar precios, planes o textos, edita solo este archivo.
═══════════════════════════════════════════ */

export interface PrecioRestaurante {
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
export const PRECIOS_RESTAURANTE: Record<string, PrecioRestaurante> = {
  basico: { mensual: "150", anual: "1,500" },
  gold:   { mensual: "300", anual: "3,000" },
};

/* ── Descripciones de features (popover al hacer click) ── */
export const FEATURES_RESTAURANTE: Record<string, FeatureInfo> = {
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

/* ── Features compartidas por los planes Gratis y Básico ── */
export const FEATURES_COMUNES_RESTAURANTE: string[] = [
  "Configuraciones completas",
  "Ventas POS + SUNAT",
  "Ventas en Restaurante",
  "Tesorería",
  "Soporte + Sistema Contable GRATIS",
];

/* ── Features exclusivas del plan Gold ── */
export const FEATURES_GOLD_RESTAURANTE: string[] = [
  "Transferencia entre caja y Bancos",
  "Carga de constancias JPG/PDF/DOC",
  "Mayor Capacidad Operativa",
  "Soporte prioritario preferencial",
];

/* ── Chatbot ── */
export const CHATBOT_PREGUNTAS_RESTAURANTE: string[] = [
  "¿Cuál plan si tengo 20 empresas?",
  "¿Qué incluye el Gold?",
  "¿Puedo cambiar de plan?",
  "¿Qué son Activos Fijos?",
  "¿Hay prueba gratis?",
];

export const CHATBOT_RESPUESTAS_RESTAURANTE: Record<string, string> = {
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

export const CHATBOT_BIENVENIDA_RESTAURANTE: MensajeChatbot = {
  tipo: "bot",
  texto: "¡Hola! 👋 Soy el asistente de CodePlex. He leído el catálogo completo y puedo responder todas tus dudas sobre planes y precios.\n¿En qué te ayudo?",
  hora: "09:30",
};
