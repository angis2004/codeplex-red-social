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

  const aplicacionesFiltradas = APLICACIONES_CATALOGO.filter((app) => {
    if (
      terminoBusqueda &&
      !app.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
    ) return false;
    if (categoriaSeleccionada === "e-commerce") return false;
    if (categoriaSeleccionada === "otros")       return false;
    return true;
  });

  return {
    pestanaActiva,
    categoriaSeleccionada,
    terminoBusqueda,
    modalSuscripcionAbierto,
    aplicacionADesinstalar,
    aplicacionesFiltradas,
    cambiarPestana,
    setCategoriaSeleccionada,
    setTerminoBusqueda,
    iniciarSuscripcion,
    cerrarModalSuscripcion,
    procesarPago,
    solicitarDesinstalacion,
    cancelarDesinstalacion,
    confirmarDesinstalacion,
  };
}
