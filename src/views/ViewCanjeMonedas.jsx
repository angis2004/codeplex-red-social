import React from "react";

function ViewCanjeMonedas() {
  return (
    <div className="view-page">
      <div className="view-header-banner">
        <div>
          <h1 className="view-title">Solicitudes de Canje de Monedas</h1>
          <p className="view-subtitle">Administra tus solicitudes de canje</p>
        </div>
      </div>
      <div className="view-empty-state">
        <div className="view-empty-icon">&#128176;</div>
        <h3 className="view-empty-title">No hay solicitudes de canje</h3>
        <p className="view-empty-desc">Las solicitudes de canje de monedas apareceran aqui.</p>
      </div>
    </div>
  );
}

export default ViewCanjeMonedas;