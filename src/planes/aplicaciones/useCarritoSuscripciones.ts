import { useState } from "react";
import {
  calcularTotalCarrito,
  estaEnCarrito,
  ItemCarrito,
} from "./carrito.model";

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
 *   La UI (PanelCarrito, TarjetaCatalogo) no se toca.
 **/

export interface UseCarritoSuscripcionesReturn {
  itemsCarrito: ItemCarrito[];
  totalCarrito: number;
  agregarAlCarrito: (aplicacion: ItemCarrito) => void;
  quitarDelCarrito: (aplicacionId: number) => void;
  limpiarCarrito: () => void;
  verificarEnCarrito: (aplicacionId: number) => boolean;
}

export function useCarritoSuscripciones(): UseCarritoSuscripcionesReturn {
  const [itemsCarrito, setItemsCarrito] = useState<ItemCarrito[]>([]);

  /** Agrega una Aplicacion al carrito (sin duplicados) */
  const agregarAlCarrito = (aplicacion: ItemCarrito): void => {
    if (!estaEnCarrito(itemsCarrito, aplicacion.id)) {
      setItemsCarrito((prev: ItemCarrito[]) => [...prev, aplicacion]);
    }
  };

  /** Quita una Aplicacion del carrito por id */
  const quitarDelCarrito = (aplicacionId: number): void => {
    setItemsCarrito((prev: ItemCarrito[]) => prev.filter((item: ItemCarrito) => item.id !== aplicacionId));
  };

  /** Vacía el carrito después de completar el pago */
  const limpiarCarrito = (): void => setItemsCarrito([]);

  /** Consulta si una Aplicacion ya está seleccionada */
  const verificarEnCarrito = (aplicacionId: number): boolean =>
    estaEnCarrito(itemsCarrito, aplicacionId);

  const totalCarrito: number = calcularTotalCarrito(itemsCarrito);

  return {
    itemsCarrito,
    totalCarrito,
    agregarAlCarrito,
    quitarDelCarrito,
    limpiarCarrito,
    verificarEnCarrito,
  };
}
