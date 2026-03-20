import React from "react";
import "./catalogo.css";
import { useSesion } from "../../../identidad/aplicacion/SesionContext";

import { useCatalogoAplicaciones }   from "../aplicacion/useCatalogoAplicaciones";
import TarjetaAplicacion             from "./TarjetaAplicacion";
import SuscripcionActivaItem         from "./SuscripcionActivaItem";
import ConfirmacionDesinstalacion    from "./ConfirmacionDesinstalacion";

import ModalPlanesRestaurante  from "../../suscripciones/SelectorPlanRestaurante";
import ModalPlanesContaPlex    from "../../suscripciones/SelectorPlanContaPlex";
import ModalPlanesGestionPlex  from "../../suscripciones/SelectorPlanGestionPlex";
import ModalPlanesTransporte   from "../../suscripciones/SelectorPlanTransporte";
import ModalPlanesGrifo        from "../../suscripciones/SelectorPlanGrifo";
import ModalPlanesFacturacion  from "../../suscripciones/SelectorPlanFacturacion";

const CATEGORIAS_FILTRO = ["todos", "e-commerce", "otros"];

/**
 * Vista — Catálogo de Aplicaciones CodePlex
 *
 * Layout de dos columnas:
 *   Izquierda → grilla de TarjetaAplicacion (catálogo / mis suscripciones)
 *   Derecha   → PanelCarrito (sticky, siempre visible)
 *
 * Flujo de adquisición:
 *   1. Usuario hace clic en "+ Agregar" → app entra al PanelCarrito
 *   2. Usuario hace clic en "Proceder al pago" → navega a PasarelaPago
 *
 * Props:
 *   alProcederPago       → callback({ itemsCarrito, totalCarrito, periodoFacturacion })
 *   suscripcionesActivas → lista de SuscripcionesActivas del usuario
 *   pestanaInicial       → "mis" | "adquirir"
 *   alCambiarPestana     → callback al cambiar de pestaña
 *   alDesinstalar        → callback(id) al confirmar desinstalación
 */
function CatalogoAplicaciones({
  alProcederPago,
  suscripcionesActivas = [],
  pestanaInicial = "adquirir",
  alCambiarPestana,
  alDesinstalar,
  // Props del carrito (levantado a App)
  itemsCarrito = [],
  totalCarrito = 0,
  agregarAlCarrito,
  quitarDelCarrito,
  verificarEnCarrito,
  alVerCarrito,
}) {
  const { modoExploracion, comenzarAutenticacion } = useSesion();
  /* ── Caso de uso: catálogo (filtros, búsqueda, pestañas) ── */
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
  } = useCatalogoAplicaciones({
    suscripcionesActivas,
    alProcederPago,
    alCambiarPestana,
    alDesinstalar,
    alAgregarAlCarrito:  agregarAlCarrito,
    pestanaInicial,
  });

  return (
    <div className="catalogo-aplicaciones">

      {/* ── Encabezado ── */}
      <div className="catalogo-aplicaciones__encabezado">
        <div>
          <h1 className="catalogo-aplicaciones__titulo">Aplicaciones</h1>
          <p className="catalogo-aplicaciones__subtitulo">
            Gestiona tus módulos activos y explora nuevas soluciones
          </p>
        </div>
        {suscripcionesActivas.length > 0 && (
          <span className="badge-suscripciones-activas">
            {suscripcionesActivas.length} activo{suscripcionesActivas.length > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* ── Pestañas ── */}
      <div className="catalogo-pestanas">
        <button
          className={`pestana-btn${pestanaActiva === "mis" ? " pestana-btn--activa" : ""}`}
          onClick={() => cambiarPestana("mis")}
        >
          Mis Aplicaciones
        </button>
        <button
          className={`pestana-btn${pestanaActiva === "adquirir" ? " pestana-btn--activa" : ""}`}
          onClick={() => cambiarPestana("adquirir")}
        >
          Adquirir Aplicaciones
        </button>
      </div>

      {/* ── Buscador ── */}
      <div className="catalogo-buscador">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Buscar Aplicaciones"
          value={terminoBusqueda}
          onChange={(e) => setTerminoBusqueda(e.target.value)}
          className="buscador-input"
        />
      </div>

      {/* ── Filtros ── */}
      <div className="catalogo-filtros">
        <div className="filtros-izquierda">
          {CATEGORIAS_FILTRO.map((cat) => (
            <button
              key={cat}
              className={`filtro-btn${categoriaSeleccionada === cat ? " filtro-btn--activo" : ""}`}
              onClick={() => setCategoriaSeleccionada(cat)}
            >
              {cat === "todos" ? "Todos" : cat === "e-commerce" ? "E-commerce" : "Otros"}
            </button>
          ))}
        </div>
        <div className="filtros-derecha">
          <select
            className="selector-orden"
            value={ordenSeleccionado}
            onChange={(e) => setOrdenSeleccionado(e.target.value)}
          >
            <option value="populares">Más Populares</option>
            <option value="menor">Menor Precio</option>
            <option value="mayor">Mayor Precio</option>
          </select>
        </div>
      </div>

      {/* ── Modales de Suscripción ── */}
      <ModalPlanesRestaurante
        estaAbierto={modalSuscripcionAbierto ==="restaurante"}
        alCerrar={cerrarModalSuscripcion}
        alProcederPago={procesarPago}
      />
      <ModalPlanesContaPlex
        estaAbierto={modalSuscripcionAbierto ==="contaplex"}
        alCerrar={cerrarModalSuscripcion}
        alProcederPago={procesarPago}
      />
      <ModalPlanesGestionPlex
        estaAbierto={modalSuscripcionAbierto ==="gestionplex"}
        alCerrar={cerrarModalSuscripcion}
        alProcederPago={procesarPago}
      />
      <ModalPlanesTransporte
        estaAbierto={modalSuscripcionAbierto ==="transporte"}
        alCerrar={cerrarModalSuscripcion}
        alProcederPago={procesarPago}
      />
      <ModalPlanesGrifo
        estaAbierto={modalSuscripcionAbierto ==="grifo"}
        alCerrar={cerrarModalSuscripcion}
        alProcederPago={procesarPago}
      />
      <ModalPlanesFacturacion
        estaAbierto={modalSuscripcionAbierto ==="facturacion"}
        alCerrar={cerrarModalSuscripcion}
        alProcederPago={procesarPago}
      />

      {/* ── Confirmación de Desinstalación ── */}
      <ConfirmacionDesinstalacion
        aplicacion={aplicacionADesinstalar}
        alCancelar={cancelarDesinstalacion}
        alConfirmar={confirmarDesinstalacion}
      />

      {/* CONTENIDO — una sola columna, sin panel lateral */}
      <div className="catalogo-contenido">
        {pestanaActiva === "adquirir" ? (
          <div className="catalogo-grid">
            {aplicacionesFiltradas.length > 0 ? (
              aplicacionesFiltradas.map((app) => (
                <TarjetaAplicacion
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
              <p className="catalogo-sin-resultados">No se encontraron aplicaciones.</p>
            )}
          </div>
        ) : suscripcionesActivas.length > 0 ? (
          <div className="suscripciones-activas-lista">
            {suscripcionesActivas.map((s) => (
              <SuscripcionActivaItem
                key={s.id}
                suscripcion={s}
                alMejorarPlan={() => {}}
                alSolicitarDesinstalacion={() => solicitarDesinstalacion(s)}
                modoExploracion={modoExploracion}
              />
            ))}
          </div>
        ) : (
          <div className="catalogo-vacio">
            <div className="catalogo-vacio__icono">📦</div>
            <h3>No tienes aplicaciones activas</h3>
            <p>Explora el catálogo en la pestaña "Adquirir Aplicaciones"</p>
            <button
              className="pestana-btn pestana-btn--activa"
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

export default CatalogoAplicaciones;
