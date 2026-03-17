import React from "react";
import "./catalogo.css";

import { useCatalogoAplicaciones }  from "../aplicacion/useCatalogoAplicaciones";
import TarjetaAplicacion            from "./TarjetaAplicacion";
import SuscripcionActivaItem        from "./SuscripcionActivaItem";
import ConfirmacionDesinstalacion   from "./ConfirmacionDesinstalacion";

import SelectorPlanRestaurante  from "../../suscripciones/SelectorPlanRestaurante";
import SelectorPlanContaPlex    from "../../suscripciones/SelectorPlanContaPlex";
import SelectorPlanGestionPlex  from "../../suscripciones/SelectorPlanGestionPlex";
import SelectorPlanTransporte   from "../../suscripciones/SelectorPlanTransporte";
import SelectorPlanGrifo        from "../../suscripciones/SelectorPlanGrifo";
import SelectorPlanFacturacion  from "../../suscripciones/SelectorPlanFacturacion";

const CATEGORIAS_FILTRO = ["todos", "e-commerce", "otros"];

/**
 * Vista — Catálogo de Aplicaciones CodePlex
 *
 * Orquesta la experiencia de exploración y gestión de Aplicaciones:
 *   - Pestaña "Mis Aplicaciones": SuscripcionesActivas del usuario
 *   - Pestaña "Adquirir Aplicaciones": catálogo completo con filtros
 *
 * Props:
 *   onProcederPago       → callback para ir a la pasarela de pago
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
}) {
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
    iniciarSuscripcion,
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
      <SelectorPlanRestaurante
        isOpen={modalSuscripcionAbierto === "restaurante"}
        onClose={cerrarModalSuscripcion}
        onProcederPago={procesarPago}
      />
      <SelectorPlanContaPlex
        isOpen={modalSuscripcionAbierto === "contaplex"}
        onClose={cerrarModalSuscripcion}
        onProcederPago={procesarPago}
      />
      <SelectorPlanGestionPlex
        isOpen={modalSuscripcionAbierto === "gestionplex"}
        onClose={cerrarModalSuscripcion}
        onProcederPago={procesarPago}
      />
      <SelectorPlanTransporte
        isOpen={modalSuscripcionAbierto === "transporte"}
        onClose={cerrarModalSuscripcion}
        onProcederPago={procesarPago}
      />
      <SelectorPlanGrifo
        isOpen={modalSuscripcionAbierto === "grifo"}
        onClose={cerrarModalSuscripcion}
        onProcederPago={procesarPago}
      />
      <SelectorPlanFacturacion
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

      {/* ── Contenido según pestaña ── */}
      {pestanaActiva === "adquirir" ? (
        <div className="catalogo-grid">
          {aplicacionesFiltradas.length > 0 ? (
            aplicacionesFiltradas.map((app) => (
              <TarjetaAplicacion
                key={app.id}
                aplicacion={app}
                alSuscribirse={iniciarSuscripcion}
                estaActiva={suscripcionesActivas.some(
                  (s) => s.appNombre === app.nombre && s.appPublisher === app.publisher
                )}
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
              alMejorarPlan={() => iniciarSuscripcion({ suscripcionModal: "restaurante" })}
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
  );
}

export default CatalogoAplicaciones;
