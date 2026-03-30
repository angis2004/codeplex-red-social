import React from "react";
import { useSesion } from "../../identidad/sesion/SesionContext";

import { useTiendaAplicaciones }     from "./useTiendaAplicaciones";
import TarjetaCatalogo               from "./TarjetaCatalogo";
import TarjetaSuscripcion            from "./TarjetaSuscripcion";
import ConfirmacionDesinstalacion    from "./ConfirmacionDesinstalacion";

import ModalPlanesRestaurante  from "../suscripciones/SelectorPlanRestaurante";
import ModalPlanesContaPlex    from "../suscripciones/SelectorPlanContaPlex";
import ModalPlanesGestionPlex  from "../suscripciones/SelectorPlanGestionPlex";
import ModalPlanesTransporte   from "../suscripciones/SelectorPlanTransporte";
import ModalPlanesGrifo        from "../suscripciones/SelectorPlanGrifo";
import ModalPlanesFacturacion  from "../suscripciones/SelectorPlanFacturacion";

const CATEGORIAS_FILTRO = ["todos", "e-commerce", "otros"];

/* ── Mapa appNombre+appPublisher → clave de modal de planes ── */
const APP_MODAL_MAP = [
  { nombre: "Conta-Plex",              publisher: null,          modal: "contaplex"   },
  { nombre: "GestiónPlex",             publisher: "Restaurante", modal: "restaurante" },
  { nombre: "GestiónPlex",             publisher: "Comercial",   modal: "gestionplex" },
  { nombre: "Gestión-Plex Grifo",      publisher: null,          modal: "grifo"       },
  { nombre: "Gestión-Plex Transporte", publisher: null,          modal: "transporte"  },
  { nombre: "Facturación Electrónica", publisher: null,          modal: "facturacion" },
];

function getModalKey(appNombre = "", appPublisher = "") {
  const match = APP_MODAL_MAP.find(
    (m) => m.nombre === appNombre && (!m.publisher || m.publisher === appPublisher)
  );
  return match?.modal ?? null;
}

/**
 * Vista — Tienda de Aplicaciones CodePlex
 *
 * Props:
 *   alProcederPago       → callback({ itemsCarrito, totalCarrito, periodoFacturacion })
 *   suscripcionesActivas → lista de SuscripcionesActivas del usuario
 *   pestanaInicial       → "mis" | "adquirir"
 *   alCambiarPestana     → callback al cambiar de pestaña
 *   alDesinstalar        → callback(id) al confirmar desinstalación
 */
function TiendaAplicaciones({
  alProcederPago,
  suscripcionesActivas = [],
  pestanaInicial = "adquirir",
  alCambiarPestana,
  alDesinstalar,
  itemsCarrito = [],
  totalCarrito = 0,
  agregarAlCarrito,
  quitarDelCarrito,
  verificarEnCarrito,
  alVerCarrito,
}) {
  const { modoExploracion, comenzarAutenticacion } = useSesion();

  const {
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
  } = useTiendaAplicaciones({
    suscripcionesActivas,
    alProcederPago,
    alCambiarPestana,
    alDesinstalar,
    alAgregarAlCarrito: agregarAlCarrito,
    pestanaInicial,
  });

  return (
    <div className="pb-12">

      {/* ── Encabezado ── */}
      <div className="flex items-start justify-between gap-3 mb-6">
        <div>
          <h1 className="text-[28px] font-bold text-[var(--text-primary)] m-0 mb-[6px]">Aplicaciones</h1>
          <p className="text-[14px] text-[var(--text-secondary)] m-0">
            Gestiona tus módulos activos y explora nuevas soluciones
          </p>
        </div>
        {suscripcionesActivas.length > 0 && (
          <span className="bg-[var(--accent)] text-white text-[12px] font-bold px-3 py-1 rounded-full whitespace-nowrap shrink-0 mt-1">
            {suscripcionesActivas.length} activo{suscripcionesActivas.length > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* ── Pestañas ── */}
      <div className="inline-flex bg-[var(--border-light)] rounded-[10px] p-1 mb-5 gap-1">
        <button
          className={`px-[22px] py-[9px] rounded-lg border-none text-[14px] font-medium cursor-pointer whitespace-nowrap transition-all duration-200 ${
            pestanaActiva === "mis"
              ? "bg-[var(--accent)] text-white shadow-[0_2px_8px_var(--accent-shadow)]"
              : "bg-transparent text-[var(--text-secondary)]"
          }`}
          onClick={() => cambiarPestana("mis")}
        >
          Mis Aplicaciones
        </button>
        <button
          className={`px-[22px] py-[9px] rounded-lg border-none text-[14px] font-medium cursor-pointer whitespace-nowrap transition-all duration-200 ${
            pestanaActiva === "adquirir"
              ? "bg-[var(--accent)] text-white shadow-[0_2px_8px_var(--accent-shadow)]"
              : "bg-transparent text-[var(--text-secondary)]"
          }`}
          onClick={() => cambiarPestana("adquirir")}
        >
          Adquirir Aplicaciones
        </button>
      </div>

      {/* ── Buscador ── */}
      <div className="flex items-center gap-[10px] border border-[var(--border-color)] rounded-[10px] px-4 py-[10px] bg-[var(--surface-color)] mb-5 transition-colors duration-200 focus-within:border-[var(--accent)]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Buscar Aplicaciones"
          value={terminoBusqueda}
          onChange={(e) => setTerminoBusqueda(e.target.value)}
          className="border-none outline-none flex-1 text-[14px] bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-gray)]"
        />
      </div>

      {/* ── Filtros ── */}
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <div className="flex gap-2">
          {CATEGORIAS_FILTRO.map((cat) => (
            <button
              key={cat}
              className={`px-[18px] py-2 rounded-lg border text-[14px] font-medium cursor-pointer transition-all duration-200 ${
                categoriaSeleccionada === cat
                  ? "bg-[var(--accent)] border-[var(--accent)] text-white"
                  : "bg-[var(--surface-color)] border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              }`}
              onClick={() => setCategoriaSeleccionada(cat)}
            >
              {cat === "todos" ? "Todos" : cat === "e-commerce" ? "E-commerce" : "Otros"}
            </button>
          ))}
        </div>
        <select
          className="py-[9px] pr-9 pl-[14px] rounded-[8px] border-[1.5px] border-[var(--border-color)] bg-[var(--surface-color)] text-[var(--text-primary)] text-[14px] font-medium cursor-pointer [appearance:none] [-webkit-appearance:none] bg-no-repeat [background-position:right_12px_center] outline-none focus:border-[var(--accent)]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2.5' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C%2Fsvg%3E")` }}
          value={ordenSeleccionado}
          onChange={(e) => setOrdenSeleccionado(e.target.value)}
        >
          <option value="populares">Más Populares</option>
          <option value="menor">Menor Precio</option>
          <option value="mayor">Mayor Precio</option>
        </select>
      </div>

      {/* ── Modales de Suscripción ── */}
      <ModalPlanesRestaurante  estaAbierto={modalSuscripcionAbierto === "restaurante"} alCerrar={cerrarModalSuscripcion} alProcederPago={procesarPago} />
      <ModalPlanesContaPlex    estaAbierto={modalSuscripcionAbierto === "contaplex"}   alCerrar={cerrarModalSuscripcion} alProcederPago={procesarPago} />
      <ModalPlanesGestionPlex  estaAbierto={modalSuscripcionAbierto === "gestionplex"} alCerrar={cerrarModalSuscripcion} alProcederPago={procesarPago} />
      <ModalPlanesTransporte   estaAbierto={modalSuscripcionAbierto === "transporte"}  alCerrar={cerrarModalSuscripcion} alProcederPago={procesarPago} />
      <ModalPlanesGrifo        estaAbierto={modalSuscripcionAbierto === "grifo"}       alCerrar={cerrarModalSuscripcion} alProcederPago={procesarPago} />
      <ModalPlanesFacturacion  estaAbierto={modalSuscripcionAbierto === "facturacion"} alCerrar={cerrarModalSuscripcion} alProcederPago={procesarPago} />

      {/* ── Confirmación de Desinstalación ── */}
      <ConfirmacionDesinstalacion
        aplicacion={aplicacionADesinstalar}
        alCancelar={cancelarDesinstalacion}
        alConfirmar={confirmarDesinstalacion}
      />

      {/* ── Contenido ── */}
      <div className="w-full">
        {pestanaActiva === "adquirir" ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {aplicacionesFiltradas.length > 0 ? (
              aplicacionesFiltradas.map((app) => (
                <TarjetaCatalogo
                  key={app.id}
                  aplicacion={app}
                  alIniciarAdquisicion={modoExploracion ? comenzarAutenticacion : iniciarSuscripcion}
                  alQuitarDelCarrito={modoExploracion ? comenzarAutenticacion : quitarDelCarrito}
                  estaActiva={suscripcionesActivas.some(
                    (s) => s.appNombre === app.nombre && s.appPublisher === app.publisher
                  )}
                  estaEnCarrito={verificarEnCarrito ? verificarEnCarrito(app.id) : false}
                  modoExploracion={modoExploracion}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-[var(--text-secondary)] py-[60px] text-[15px]">
                No se encontraron aplicaciones.
              </p>
            )}
          </div>
        ) : suscripcionesActivas.length > 0 ? (
          <div className="flex flex-col gap-[14px]">
            {suscripcionesActivas.map((s) => (
              <TarjetaSuscripcion
                key={s.id}
                suscripcion={s}
                alMejorarPlan={() => {
                  const modalKey =
                    s.suscripcionModal ||
                    getModalKey(s.appNombre || s.nombre, s.appPublisher || s.publisher);
                  if (modalKey) iniciarSuscripcion({ ...s, suscripcionModal: modalKey });
                }}
                alSolicitarDesinstalacion={() => solicitarDesinstalacion(s)}
                modoExploracion={modoExploracion}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-[80px] px-5 text-[var(--text-secondary)]">
            <div className="text-[56px] mb-4">📦</div>
            <h3 className="text-[18px] font-bold text-[var(--text-primary)] m-0 mb-2">
              No tienes aplicaciones activas
            </h3>
            <p className="text-[14px] m-0 mb-6">
              Explora el catálogo en la pestaña "Adquirir Aplicaciones"
            </p>
            <button
              className="px-[22px] py-[9px] rounded-lg border-none text-[14px] font-medium cursor-pointer bg-[var(--accent)] text-white shadow-[0_2px_8px_var(--accent-shadow)]"
              onClick={() => cambiarPestana("adquirir")}
            >
              Ver catálogo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TiendaAplicaciones;
