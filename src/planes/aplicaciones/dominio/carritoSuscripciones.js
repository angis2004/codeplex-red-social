/**
 * Dominio — Carrito de Suscripciones
 *
 * Lógica de negocio pura del carrito. Sin estado, sin React.
 * Lista para conectarse a una API real sin modificar la UI.
 *
 * Lenguaje ubicuo:
 *   itemsCarrito   → Aplicaciones seleccionadas pendientes de suscribir
 *   totalCarrito   → Suma de precios base de los items
 */

/** Suma el precio base de cada Aplicacion en el carrito */
export function calcularTotalCarrito(items) {
  return items.reduce((total, item) => {
    const precio = parseFloat(item.precioDesde?.replace(/[^\d.]/g, "")) || 0;
    return total + precio;
  }, 0);
}

/** Retorna true si una Aplicacion ya está en el carrito */
export function estaEnCarrito(items, aplicacionId) {
  return items.some((item) => item.id === aplicacionId);
}
