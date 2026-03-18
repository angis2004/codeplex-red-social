import { useState } from "react";
import {
  calcularTotalCarrito,
  estaEnCarrito,
} from "../dominio/carritoSuscripciones";

/**
 * Caso de uso — Gestión del Carrito de Suscripciones
 *
 * Controla las interacciones del usuario con el carrito:
 *   - agregar una Aplicacion al carrito
 *   - quitar una Aplicacion del carrito
 *   - calcular el total de la selección
 *   - verificar si una Aplicacion ya está seleccionada
 *
 *   Punto de integración con backend:
 *   Solo este hook necesita cambiar cuando llegue la API real.
 *   La UI (PanelCarrito, TarjetaAplicacion) no se toca.
 **/

export function useCarritoSuscripciones() {
  const [itemsCarrito, setItemsCarrito] = useState([]);

  /** Agrega una Aplicacion al carrito (sin duplicados) */
  const agregarAlCarrito = (aplicacion) => {
    if (!estaEnCarrito(itemsCarrito, aplicacion.id)) {
      setItemsCarrito((prev) => [...prev, aplicacion]);
    }
  };

  /** Quita una Aplicacion del carrito por id */
  const quitarDelCarrito = (aplicacionId) => {
    setItemsCarrito((prev) => prev.filter((item) => item.id !== aplicacionId));
  };

  /** Vacía el carrito después de completar el pago */
  const limpiarCarrito = () => setItemsCarrito([]);

  /** Consulta si una Aplicacion ya está seleccionada */
  const verificarEnCarrito = (aplicacionId) =>
    estaEnCarrito(itemsCarrito, aplicacionId);

  const totalCarrito = calcularTotalCarrito(itemsCarrito);

  return {
    itemsCarrito,
    totalCarrito,
    agregarAlCarrito,
    quitarDelCarrito,
    limpiarCarrito,
    verificarEnCarrito,
  };
}
