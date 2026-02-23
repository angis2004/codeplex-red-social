import React from "react";

function ViewMonetizacion() {
  return (
    <div className="view-page">
      <div className="view-header-banner">
        <div>
          <h1 className="view-title">Plan de Monetizacion</h1>
          <p className="view-subtitle">Consulta y gestiona tu plan de monetizacion</p>
        </div>
      </div>
      <div className="view-empty-state">
        <div className="view-empty-icon">&#128200;</div>
        <h3 className="view-empty-title">Sin plan activo</h3>
        <p className="view-empty-desc">Activa un plan de monetizacion para empezar a generar ingresos.</p>
      </div>
    </div>
  );
}

export default ViewMonetizacion;