import React from "react";
import "./catalogo.css";

import { useCatalogoAplicaciones }   from "../aplicacion/useCatalogoAplicaciones";
import TarjetaAplicacion             from "./TarjetaAplicacion";
import SuscripcionActivaItem         from "./SuscripcionActivaItem";
import ConfirmacionDesinstalacion    from "./ConfirmacionDesinstalacion";

import ModalPlanesRestaurante  from "../../suscripciones/ModalPlanesRestaurante";
import ModalPlanesContaPlex    from "../../suscripciones/ModalPlanesContaPlex";
import ModalPlanesGestionPlex  from "../../suscripciones/ModalPlanesGestionPlex";
import ModalPlanesTransporte   from "../../suscripciones/ModalPlanesTransporte";
import ModalPlanesGrifo        from "../../suscripciones/ModalPlanesGrifo";
import ModalPlanesFacturacion  from "../../suscripciones/ModalPlanesFacturacion";

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
 *   onProcederPago       → callback({ itemsCarrito, totalCarrito, billing })
 *   suscripcionesActivas → lista de SuscripcionesActivas del usuario
 *   pestanaInicial       → "mis" | "adquirir"
 *   onCambiarPestana     → callback al cambiar de pestaña
 *   onDesinstalar        → callback(id) al confirmar desinstalación
 */
function CatalogoAplicaciones({
  onProcederPago,
  suscripcionesActivas = [],
  pestanaInicial = "adquirir",
  onCambiarPestana,
  onDesinstalar,
  // Props del carrito (levantado a App)
  itemsCarrito = [],
  totalCarrito = 0,
  agregarAlCarrito,
  quitarDelCarrito,
  verificarEnCarrito,
  onVerCarrito,
}) {
  /* ── Caso de uso: catálogo (filtros, búsqueda, pestañas) ── */
  const {
    pestanaActiva,
    categoriaSeleccionada,
    terminoBusqueda,
    modalSuscripcionAbierto,
    aplicacionADesinstalar,
    aplicacionesFiltradas,
    cambiarPestana,
    setCategoriaSeleccionada,
    setTerminoBusqueda,
    cerrarModalSuscripcion,
    procesarPago,
    solicitarDesinstalacion,
    cancelarDesinstalacion,
    confirmarDesinstalacion,
  } = useCatalogoAplicaciones({
    suscripcionesActivas,
    alProcederPago:   onProcederPago,
    alCambiarPestana: onCambiarPestana,
    alDesinstalar:    onDesinstalar,
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
          <select className="selector-orden">
            <option>Mas Populares</option>
            <option>Menor Precio</option>
            <option>Mayor Precio</option>
            <option>Más Recientes</option>
          </select>
        </div>
      </div>

      {/* ── Modales de Suscripción ── */}
      <ModalPlanesRestaurante
        isOpen={modalSuscripcionAbierto === "restaurante"}
        onClose={cerrarModalSuscripcion}
        onProcederPago={procesarPago}
      />
      <ModalPlanesContaPlex
        isOpen={modalSuscripcionAbierto === "contaplex"}
        onClose={cerrarModalSuscripcion}
        onProcederPago={procesarPago}
      />
      <ModalPlanesGestionPlex
        isOpen={modalSuscripcionAbierto === "gestionplex"}
        onClose={cerrarModalSuscripcion}
        onProcederPago={procesarPago}
      />
      <ModalPlanesTransporte
        isOpen={modalSuscripcionAbierto === "transporte"}
        onClose={cerrarModalSuscripcion}
        onProcederPago={procesarPago}
      />
      <ModalPlanesGrifo
        isOpen={modalSuscripcionAbierto === "grifo"}
        onClose={cerrarModalSuscripcion}
        onProcederPago={procesarPago}
      />
      <ModalPlanesFacturacion
        isOpen={modalSuscripcionAbierto === "facturacion"}
        onClose={cerrarModalSuscripcion}
        onProcederPago={procesarPago}
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
                  alAgregarAlCarrito={agregarAlCarrito}
                  alQuitarDelCarrito={quitarDelCarrito}
                  estaActiva={suscripcionesActivas.some(
                    (s) => s.appNombre === app.nombre && s.appPublisher === app.publisher
                  )}
                  estaEnCarrito={verificarEnCarrito ? verificarEnCarrito(app.id) : false}
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
