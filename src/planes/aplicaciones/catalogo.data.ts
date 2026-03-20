/**
 * DOMINIO: Planes > Aplicaciones
 * Contexto Acotado: Catálogo de Aplicaciones disponibles para adquirir.
 *
 * Este archivo contiene los datos del catálogo de aplicaciones (APPS)
 * y los metadatos de identidad de cada aplicación (APP_META).
 *
 * Lenguaje Ubicuo:
 *  - Aplicacion     : producto de software que el usuario puede instalar/suscribir
 *  - CatalogoApp    : colección de todas las aplicaciones disponibles
 *  - MetaApp        : datos de identidad visual de la aplicación (nombre, ícono, tema)
 *  - ColorTema      : token de color asociado a cada aplicación para branding consistente
 *  - PrecioDesde    : precio mínimo mensual de acceso a la aplicación
 *  - Feature        : característica destacada de la aplicación
 */

export interface Aplicacion {
  id: number;
  nombre: string;
  publisher: string;
  categoria: string;
  categoriaColor: string;
  icono: string;
  descripcion: string;
  features: string[];
  precioDesde: string;
  colorTema: string;
}

export interface MetaApp {
  appNombre: string;
  appPublisher: string;
  icono: string;
  colorTema: string;
}

export const CATALOGO_APPS: Aplicacion[] = [
  {
    id: 1,
    nombre: "Conta-Plex",
    publisher: "CodePlex",
    categoria: "CONTABILIDAD",
    categoriaColor: "etiqueta",
    icono: "contaplex",
    descripcion: "Sistema contable para independientes y contadores. Hasta 45 empresas, PLE-SIRE incluido y comprobantes ilimitados.",
    features: [
      "Procesos contables esenciales",
      "Libros contables + PLE - SIRE",
      "Reportes + seguridad completa",
      "Hasta 45 empresas",
    ],
    precioDesde: "S/50",
    colorTema: "color-contaplex",
  },
  {
    id: 2,
    nombre: "GestiónPlex",
    publisher: "Comercial",
    categoria: "LOGÍSTICA",
    categoriaColor: "etiqueta",
    icono: "gestionplex-comercial",
    descripcion: "Sistema completo para restaurantes: mesas, pedidos, cocina, delivery y facturación electrónica.",
    features: [
      "Ventas POS + SUNAT",
      "Ventas en Restaurante",
      "Tesorería",
      "Soporte + Sistema Contable GRATIS",
    ],
    precioDesde: "S/100",
    colorTema: "color-comercial",
  },
  {
    id: 3,
    nombre: "GestiónPlex",
    publisher: "Restaurante",
    categoria: "RESTAURANTE",
    categoriaColor: "etiqueta",
    icono: "gestionplex-restaurante",
    descripcion: "Sistema completo para restaurantes: mesas, pedidos, cocina, delivery y facturación electrónica.",
    features: [
      "Facturación electrónica SUNAT",
      "Contabilidad multi-empresas",
      "Reportes y Balances",
      "Declaraciones tributarias",
    ],
    precioDesde: "S/150",
    colorTema: "color-restaurante",
  },
  {
    id: 4,
    nombre: "Gestión-Plex Grifo",
    publisher: "CodePlex",
    categoria: "GRIFO",
    categoriaColor: "etiqueta",
    icono: "contaplex",
    descripcion: "Software especializado para grifos con comprobantes ilimitados, vales de crédito y liquidación.",
    features: [
      "Módulo de Grifo completo",
      "Vales de crédito + Liquidación",
      "Producción + Procesos",
      "Soporte + Contable GRATIS",
    ],
    precioDesde: "S/350",
    colorTema: "color-grifo",
  },
  {
    id: 5,
    nombre: "Facturación Electrónica",
    publisher: "CodePlex",
    categoria: "FACTURACION",
    categoriaColor: "etiqueta",
    icono: "contaplex",
    descripcion: "Facturación electrónica para empresas con múltiples sucursales, hasta 2,000 comprobantes y usuarios ilimitados.",
    features: [
      "Ventas POS + SUNAT completo",
      "Guías de remisión",
      "Web · Android · iOS · Usuarios ilimitados",
      "Sistema Contable Basic GRATIS",
    ],
    precioDesde: "S/50",
    colorTema: "color-facturacion",
  },
  {
    id: 6,
    nombre: "Gestión-Plex Transporte",
    publisher: "CodePlex",
    categoria: "TRANSPORTE",
    categoriaColor: "etiqueta",
    icono: "contaplex",
    descripcion: "Software para empresas de transporte con guías electrónicas, módulo transportista y liquidación por chofer.",
    features: [
      "Guías electrónicas (Remitente + Transportista)",
      "Módulo Transportista",
      "Compras + Liquidación por chofer",
      "Soporte + Contable GRATIS",
    ],
    precioDesde: "S/150",
    colorTema: "color-transporte",
  },
];

/**
 * MetaApp por clave de modal.
 * Relaciona la clave interna con los datos de identidad visual de la aplicación
 * que se muestran en el modal de selección de plan.
 */
export const META_APP: Record<string, MetaApp> = {
  restaurante:  { appNombre: "GestiónPlex",            appPublisher: "Restaurante", icono: "gestionplex-restaurante", colorTema: "color-restaurante" },
  contaplex:    { appNombre: "Conta-Plex",              appPublisher: "CodePlex",    icono: "contaplex",               colorTema: "color-contaplex"   },
  gestionplex:  { appNombre: "GestiónPlex",             appPublisher: "Comercial",   icono: "gestionplex-comercial",   colorTema: "color-comercial"   },
  transporte:   { appNombre: "Gestión-Plex Transporte", appPublisher: "CodePlex",    icono: "contaplex",               colorTema: "color-transporte"  },
  grifo:        { appNombre: "Gestión-Plex Grifo",      appPublisher: "CodePlex",    icono: "contaplex",               colorTema: "color-grifo"       },
  facturacion:  { appNombre: "Facturación Electrónica", appPublisher: "CodePlex",    icono: "contaplex",               colorTema: "color-facturacion" },
};

/**
 * Mapa de colores por ColorTema.
 * Centraliza los valores hex para que AppIcon y otros componentes
 * no los tengan duplicados.
 */
export const COLORES_TEMA: Record<string, string> = {
  "color-contaplex":   "#0094C0",
  "color-comercial":   "#0D9488",
  "color-restaurante": "#F97316",
  "color-grifo":       "#B91C1C",
  "color-facturacion": "#1E40AF",
  "color-transporte":  "#1E40AF",
};
