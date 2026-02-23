import React from "react";

function ViewBuzon() {
  return (
    <div className="view-page">
      <div className="view-header-banner">
        <div>
          <h1 className="view-title">Buzon</h1>
          <p className="view-subtitle">Revisa todos tus mensajes y notificaciones</p>
        </div>
      </div>
      <div className="view-empty-state">
        <div className="view-empty-icon">&#128236;</div>
        <h3 className="view-empty-title">No tienes mensajes nuevos</h3>
        <p className="view-empty-desc">Los mensajes que recibas aparecen aqui.</p>
      </div>
    </div>
  );
}

export default ViewBuzon;