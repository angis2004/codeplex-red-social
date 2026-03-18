import { useState } from "react";
import { APLICACIONES_CATALOGO } from "../dominio/catalogoAplicaciones";

/**
 * Caso de uso — Gestión del Catálogo de Aplicaciones
 *
 * Orquesta las interacciones del usuario con el catálogo:
 *   - explorar y filtrar Aplicaciones disponibles
 *   - iniciar una Suscripcion a una Aplicacion
 *   - ver y gestionar Suscripciones Activas
 *   - solicitar la desinstalación de una Suscripcion Activa
 *
 * Lenguaje ubicuo:
 *   pestanaActiva          → pestaña visible: "mis" | "adquirir"
 *   categoriaSeleccionada  → filtro de categoría aplicado al catálogo
 *   terminoBusqueda        → texto libre para buscar en el catálogo
 *   modalSuscripcionAbierto → qué modal de planes está visible, o null
 *   aplicacionADesinstalar → la SuscripcionActiva pendiente de confirmar desinstalación
 *   aplicacionesFiltradas  → resultado del catálogo tras aplicar filtros
 */
export function useCatalogoAplicaciones({
  suscripcionesActivas = [],
  alProcederPago,
  alCambiarPestana,
  alDesinstalar,
  alAgregarAlCarrito,
  pestanaInicial = "adquirir",
}) {
  const [pestanaActiva, setPestanaActiva]                     = useState(pestanaInicial);
  const [categoriaSeleccionada, setCategoriaSeleccionada]     = useState("todos");
  const [terminoBusqueda, setTerminoBusqueda]                 = useState("");
  const [modalSuscripcionAbierto, setModalSuscripcionAbierto] = useState(null);
  const [aplicacionADesinstalar, setAplicacionADesinstalar]   = useState(null);
  const [aplicacionSeleccionada, setAplicacionSeleccionada]   = useState(null);
  const [ordenSeleccionado, setOrdenSeleccionado]             = useState("populares");

  /* Orden de popularidad explícito: ids en el orden deseado */
  const ORDEN_POPULARIDAD = [1, 2, 5, 3, 6, 4];

  const cambiarPestana = (pestana) => {
    setPestanaActiva(pestana);
    alCambiarPestana?.(pestana);
  };

  /** Abre el modal de planes correspondiente a la Aplicacion seleccionada */
  const iniciarSuscripcion = (aplicacion) => {
    setAplicacionSeleccionada(aplicacion);
    setModalSuscripcionAbierto(aplicacion.suscripcionModal);
  };

  const cerrarModalSuscripcion = () => {
    setModalSuscripcionAbierto(null);
    setAplicacionSeleccionada(null);
  };

  /**
   * El usuario eligió un plan en el modal.
   * → Agrega la app al carrito CON el plan seleccionado.
   * → NO navega a pasarela todavía (eso lo hace el botón del carrito).
   */
  const procesarPago = (planData) => {
    if (aplicacionSeleccionada) {
      const planDisplay = { gratis: "Gratis", basico: "Básico", estandar: "Estándar", gold: "Gold" }[planData.planNombre] || planData.planNombre;
      alAgregarAlCarrito?.({
        ...aplicacionSeleccionada,
        planSeleccionado:  planData.planNombre,
        planDisplay,
        precioDesde: `S/${planData.precio}`,
      });
    }
    cerrarModalSuscripcion();
  };

  /** Marca una SuscripcionActiva para confirmar su desinstalación */
  const solicitarDesinstalacion  = (suscripcion) => setAplicacionADesinstalar(suscripcion);
  const cancelarDesinstalacion   = ()             => setAplicacionADesinstalar(null);

  const confirmarDesinstalacion = (id) => {
    alDesinstalar?.(id);
    setAplicacionADesinstalar(null);
  };

  const parsePrecio = (precioStr) => parseInt(precioStr.replace(/\D/g, ""), 10) || 0;

  const aplicacionesFiltradas = (() => {
    const filtradas = APLICACIONES_CATALOGO.filter((app) => {
      if (terminoBusqueda && !app.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())) return false;
      if (categoriaSeleccionada === "e-commerce") return false;
      if (categoriaSeleccionada === "otros")       return false;
      return true;
    });

    if (ordenSeleccionado === "mayor") {
      return [...filtradas].sort((a, b) => {
        const diff = parsePrecio(b.precioDesde) - parsePrecio(a.precioDesde);
        if (diff !== 0) return diff;
        return ORDEN_POPULARIDAD.indexOf(a.id) - ORDEN_POPULARIDAD.indexOf(b.id);
      });
    }
    if (ordenSeleccionado === "menor") {
      return [...filtradas].sort((a, b) => {
        const diff = parsePrecio(a.precioDesde) - parsePrecio(b.precioDesde);
        if (diff !== 0) return diff;
        return ORDEN_POPULARIDAD.indexOf(a.id) - ORDEN_POPULARIDAD.indexOf(b.id);
      });
    }
    /* populares → orden fijo definido en ORDEN_POPULARIDAD */
    return [...filtradas].sort(
      (a, b) => ORDEN_POPULARIDAD.indexOf(a.id) - ORDEN_POPULARIDAD.indexOf(b.id)
    );
  })();

  return {
    pestanaActiva,
    categoriaSeleccionada,
    terminoBusqueda,
    ordenSeleccionado,
    modalSuscripcionAbierto,
    aplicacionADesinstalar,
    aplicacionesFiltradas,
    cambiarPestana,
    setCategoriaSeleccionada,
    setTerminoBusqueda,
    setOrdenSeleccionado,
    iniciarSuscripcion,
    cerrarModalSuscripcion,
    procesarPago,
    solicitarDesinstalacion,
    cancelarDesinstalacion,
    confirmarDesinstalacion,
  };
}
