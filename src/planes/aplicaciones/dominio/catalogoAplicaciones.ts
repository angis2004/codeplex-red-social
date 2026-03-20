/**
 * Dominio — Catálogo de Aplicaciones CodePlex
 *
 * Representa las Aplicaciones disponibles para suscripción.
 * Cada Aplicacion es una entidad del dominio con sus caracteristicas,
 * precioDesde y el modal de suscripción asociado.
 *
 * Lenguaje ubicuo:
 *   Aplicacion       → producto de software que el usuario puede suscribir
 *   caracteristicas  → funcionalidades incluidas en la aplicación
 *   precioDesde      → precio mínimo del plan disponible
 *   suscripcionModal → identificador del modal de planes de esa aplicación
 */

export interface Aplicacion {
  id: number;
  nombre: string;
  publisher: string;
  categoria: string;
  icono: string;
  descripcion: string;
  caracteristicas: string[];
  precioDesde: string;
  colorTema: string;
  suscripcionModal: string;
}

export const APLICACIONES_CATALOGO: Aplicacion[] = [
  {
    id: 1,
    nombre: "Conta-Plex",
    publisher: "CodePlex",
    categoria: "CONTABILIDAD",
    icono: "contaplex",
    descripcion:
      "Sistema contable para independientes y contadores. Hasta 45 empresas, PLE-SIRE incluido y comprobantes ilimitados.",
    caracteristicas: [
      "Procesos contables esenciales",
      "Libros contables + PLE - SIRE",
      "Reportes + seguridad completa",
      "Hasta 45 empresas",
    ],
    precioDesde: "S/50",
    colorTema: "color-contaplex",
    suscripcionModal: "contaplex",
  },
  {
    id: 2,
    nombre: "GestiónPlex",
    publisher: "Comercial",
    categoria: "LOGÍSTICA",
    icono: "gestionplex-comercial",
    descripcion:
      "Sistema completo para empresas comerciales: ventas POS, tesorería y facturación electrónica SUNAT.",
    caracteristicas: [
      "Ventas POS + SUNAT",
      "Ventas en Restaurante",
      "Tesorería",
      "Soporte + Sistema Contable GRATIS",
    ],
    precioDesde: "S/100",
    colorTema: "color-comercial",
    suscripcionModal: "gestionplex",
  },
  {
    id: 3,
    nombre: "GestiónPlex",
    publisher: "Restaurante",
    categoria: "RESTAURANTE",
    icono: "gestionplex-restaurante",
    descripcion:
      "Sistema completo para restaurantes: mesas, pedidos, cocina, delivery y facturación electrónica.",
    caracteristicas: [
      "Facturación electrónica SUNAT",
      "Contabilidad multi-empresas",
      "Reportes y Balances",
      "Declaraciones tributarias",
    ],
    precioDesde: "S/150",
    colorTema: "color-restaurante",
    suscripcionModal: "restaurante",
  },
  {
    id: 4,
    nombre: "Gestión-Plex Grifo",
    publisher: "CodePlex",
    categoria: "GRIFO",
    icono: "contaplex",
    descripcion:
      "Software especializado para grifos con comprobantes ilimitados, vales de crédito y liquidación.",
    caracteristicas: [
      "Módulo de Grifo completo",
      "Vales de crédito + Liquidación",
      "Producción + Procesos",
      "Soporte + Contable GRATIS",
    ],
    precioDesde: "S/350",
    colorTema: "color-grifo",
    suscripcionModal: "grifo",
  },
  {
    id: 5,
    nombre: "Facturación Electrónica",
    publisher: "CodePlex",
    categoria: "FACTURACION",
    icono: "contaplex",
    descripcion:
      "Facturación electrónica para empresas con múltiples sucursales, hasta 2,000 comprobantes y usuarios ilimitados.",
    caracteristicas: [
      "Ventas POS + SUNAT completo",
      "Guías de remisión",
      "Web · Android · iOS · Usuarios ilimitados",
      "Sistema Contable Basic GRATIS",
    ],
    precioDesde: "S/50",
    colorTema: "color-facturacion",
    suscripcionModal: "facturacion",
  },
  {
    id: 6,
    nombre: "Gestión-Plex Transporte",
    publisher: "CodePlex",
    categoria: "TRANSPORTE",
    icono: "contaplex",
    descripcion:
      "Software para empresas de transporte con guías electrónicas, módulo transportista y liquidación por chofer.",
    caracteristicas: [
      "Guías electrónicas (Remitente + Transportista)",
      "Módulo Transportista",
      "Compras + Liquidación por chofer",
      "Soporte + Contable GRATIS",
    ],
    precioDesde: "S/150",
    colorTema: "color-transporte",
    suscripcionModal: "transporte",
  },
];
