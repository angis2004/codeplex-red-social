import { useState } from "react";
import { calcularTotalCarrito, estaEnCarrito } from "../dominio/carritoSuscripciones";

/**
 * Caso de uso — Gestión del Carrito de Suscripciones
 *
 * Permite al usuario acumular Aplicaciones antes de proceder al pago.
 * Diseñado para escalar al backend: cuando llegue la API, solo
 * se reemplaza el useState por llamadas HTTP aquí — el JSX no cambia.
 *
 * Lenguaje ubicuo:
 *   agregarAlCarrito      → el usuario selecciona una Aplicacion
 *   quitarDelCarrito      → el usuario descarta una Aplicacion
 *   limpiarCarrito        → vaciar después de completar el pago
 *   procederAlPago        → iniciar el flujo de SelectorPlan con el primer item
 */
export function useCarritoSuscripciones({ alIniciarSuscripcion } = {}) {
  const [itemsCarrito, setItemsCarrito] = useState([]);

  const agregarAlCarrito = (aplicacion) => {
    setItemsCarrito((prev) => {
      if (estaEnCarrito(prev, aplicacion.id)) return prev;
      return [...prev, aplicacion];
    });
  };

  const quitarDelCarrito = (aplicacionId) => {
    setItemsCarrito((prev) => prev.filter((item) => item.id !== aplicacionId));
  };

  const limpiarCarrito = () => setItemsCarrito([]);

  /** Abre el SelectorPlan del primer item y lo quita del carrito */
  const procederAlPago = () => {
    if (itemsCarrito.length === 0) return;
    const primerItem = itemsCarrito[0];
    quitarDelCarrito(primerItem.id);
    alIniciarSuscripcion?.(primerItem);
  };

  const totalCarrito = calcularTotalCarrito(itemsCarrito);

  const verificarEnCarrito = (aplicacionId) =>
    estaEnCarrito(itemsCarrito, aplicacionId);

  return {
    itemsCarrito,
    totalCarrito,
    agregarAlCarrito,
    quitarDelCarrito,
    limpiarCarrito,
    procederAlPago,
    verificarEnCarrito,
  };
}
