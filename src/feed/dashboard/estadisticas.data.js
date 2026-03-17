/**
 * DOMINIO: Feed > Dashboard
 * Contexto Acotado: Estadísticas de actividad del usuario en la red social.
 *
 * Lenguaje Ubicuo:
 *  - EstadisticaActividad : métrica que resume la participación del usuario en el feed
 *  - Post                 : publicación creada por el usuario
 *  - Video                : publicación en formato video
 *  - Compartido           : contenido que el usuario re-publicó en su feed
 */

/** @type {EstadisticaActividad[]} */
export const ESTADISTICAS_ACTIVIDAD = [
  { titulo: "Tus post",    icono: "tusPost",     iconoTamano: 18, valor: 10 },
  { titulo: "Tus Videos",  icono: "videos",      iconoTamano: 20, valor: 10 },
  { titulo: "Compartidos", icono: "compartidos", iconoTamano: 18, valor: 10 },
];
