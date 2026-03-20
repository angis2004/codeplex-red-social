import { useState } from "react";
import { APLICACIONES_CATALOGO, Aplicacion } from "../dominio/catalogoAplicaciones";

export interface SuscripcionActiva {
  id: number;
  nombre: string;
  [key: string]: unknown;
}

export interface PlanData {
  planNombre: string;
  precio: number | string;
}

export interface AplicacionConPlan extends Aplicacion {
  planSeleccionado?: string;
  planDisplay?: string;
}

interface UseCatalogoAplicacionesParams {
  suscripcionesActivas?: SuscripcionActiva[];
  alProcederPago?: (data: PlanData) => void;
  alCambiarPestana?: (pestana: string) => void;
  alDesinstalar?: (id: number) => void;
  alAgregarAlCarrito?: (aplicacion: AplicacionConPlan) => void;
  pestanaInicial?: string;
}

export interface UseCatalogoAplicacionesReturn {
  pestanaActiva: string;
  categoriaSeleccionada: string;
  terminoBusqueda: string;
  ordenSeleccionado: string;
  modalSuscripcionAbierto: string | null;
  aplicacionADesinstalar: SuscripcionActiva | null;
  aplicacionesFiltradas: Aplicacion[];
  cambiarPestana: (pestana: string) => void;
  setCategoriaSeleccionada: React.Dispatch<React.SetStateAction<string>>;
  setTerminoBusqueda: React.Dispatch<React.SetStateAction<string>>;
  setOrdenSeleccionado: React.Dispatch<React.SetStateAction<string>>;
  iniciarSuscripcion: (aplicacion: Aplicacion) => void;
  cerrarModalSuscripcion: () => void;
  procesarPago: (planData: PlanData) => void;
  solicitarDesinstalacion: (suscripcion: SuscripcionActiva) => void;
  cancelarDesinstalacion: () => void;
  confirmarDesinstalacion: (id: number) => void;
}

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
}: UseCatalogoAplicacionesParams): UseCatalogoAplicacionesReturn {
  const [pestanaActiva, setPestanaActiva]                     = useState<string>(pestanaInicial);
  const [categoriaSeleccionada, setCategoriaSeleccionada]     = useState<string>("todos");
  const [terminoBusqueda, setTerminoBusqueda]                 = useState<string>("");
  const [modalSuscripcionAbierto, setModalSuscripcionAbierto] = useState<string | null>(null);
  const [aplicacionADesinstalar, setAplicacionADesinstalar]   = useState<SuscripcionActiva | null>(null);
  const [aplicacionSeleccionada, setAplicacionSeleccionada]   = useState<Aplicacion | null>(null);
  const [ordenSeleccionado, setOrdenSeleccionado]             = useState<string>("populares");

  /* Orden de popularidad explícito: ids en el orden deseado */
  const ORDEN_POPULARIDAD: number[] = [1, 2, 5, 3, 6, 4];

  const cambiarPestana = (pestana: string): void => {
    setPestanaActiva(pestana);
    alCambiarPestana?.(pestana);
  };

  /** Abre el modal de planes correspondiente a la Aplicacion seleccionada */
  const iniciarSuscripcion = (aplicacion: Aplicacion): void => {
    setAplicacionSeleccionada(aplicacion);
    setModalSuscripcionAbierto(aplicacion.suscripcionModal);
  };

  const cerrarModalSuscripcion = (): void => {
    setModalSuscripcionAbierto(null);
    setAplicacionSeleccionada(null);
  };

  /**
   * El usuario eligió un plan en el modal.
   * → Agrega la app al carrito CON el plan seleccionado.
   * → NO navega a pasarela todavía (eso lo hace el botón del carrito).
   */
  const procesarPago = (planData: PlanData): void => {
    if (aplicacionSeleccionada) {
      const planDisplayMap: Record<string, string> = { gratis: "Gratis", basico: "Básico", estandar: "Estándar", gold: "Gold" };
      const planDisplay: string = planDisplayMap[planData.planNombre] || planData.planNombre;
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
  const solicitarDesinstalacion  = (suscripcion: SuscripcionActiva): void => setAplicacionADesinstalar(suscripcion);
  const cancelarDesinstalacion   = (): void                               => setAplicacionADesinstalar(null);

  const confirmarDesinstalacion = (id: number): void => {
    alDesinstalar?.(id);
    setAplicacionADesinstalar(null);
  };

  const parsePrecio = (precioStr: string): number => parseInt(precioStr.replace(/\D/g, ""), 10) || 0;

  const aplicacionesFiltradas: Aplicacion[] = (() => {
    const filtradas: Aplicacion[] = APLICACIONES_CATALOGO.filter((app: Aplicacion) => {
      if (terminoBusqueda && !app.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())) return false;
      if (categoriaSeleccionada === "e-commerce") return false;
      if (categoriaSeleccionada === "otros")       return false;
      return true;
    });

    if (ordenSeleccionado === "mayor") {
      return [...filtradas].sort((a: Aplicacion, b: Aplicacion) => {
        const diff: number = parsePrecio(b.precioDesde) - parsePrecio(a.precioDesde);
        if (diff !== 0) return diff;
        return ORDEN_POPULARIDAD.indexOf(a.id) - ORDEN_POPULARIDAD.indexOf(b.id);
      });
    }
    if (ordenSeleccionado === "menor") {
      return [...filtradas].sort((a: Aplicacion, b: Aplicacion) => {
        const diff: number = parsePrecio(a.precioDesde) - parsePrecio(b.precioDesde);
        if (diff !== 0) return diff;
        return ORDEN_POPULARIDAD.indexOf(a.id) - ORDEN_POPULARIDAD.indexOf(b.id);
      });
    }
    /* populares → orden fijo definido en ORDEN_POPULARIDAD */
    return [...filtradas].sort(
      (a: Aplicacion, b: Aplicacion) => ORDEN_POPULARIDAD.indexOf(a.id) - ORDEN_POPULARIDAD.indexOf(b.id)
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
