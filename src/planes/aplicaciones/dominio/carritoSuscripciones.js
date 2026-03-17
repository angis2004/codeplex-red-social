/**
 * Dominio — Carrito de Suscripciones
 *
 * Representa la intención del usuario de suscribirse a una o más
 * Aplicaciones antes de proceder al pago.
 *
 * Lenguaje ubicuo:
 *   CarritoSuscripciones → colección temporal de Aplicaciones seleccionadas
 *   ItemCarrito          → una Aplicacion agregada al carrito
 *   totalCarrito         → suma de precioDesde de todos los items
 *
 * Nota backend:
 *   Cuando se integre el backend, esta capa persiste igual.
 *   Solo cambia useCarritoSuscripciones.js para llamar a la API.
 */

/**
 * Calcula el precio total sumando el precioDesde de cada item.
 * @param {Array} items — lista de Aplicaciones en el carrito
 * @returns {number}
 */
export function calcularTotalCarrito(items) {
  return items.reduce((total, item) => {
    const precio = parseInt(item.precioDesde.replace("S/", "")) || 0;
    return total + precio;
  }, 0);
}

/**
 * Verifica si una Aplicacion ya está en el carrito.
 * @param {Array} items
 * @param {number} aplicacionId
 * @returns {boolean}
 */
export function estaEnCarrito(items, aplicacionId) {
  return items.some((item) => item.id === aplicacionId);
}
