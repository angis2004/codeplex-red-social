import React from "react";

function ViewMonedero() {
  return (
    <div className="view-page">
      <div className="view-header-banner">
        <div>
          <h1 className="view-title">Mi Monedero</h1>
          <p className="view-subtitle">Consulta tu saldo y movimientos de monedas</p>
        </div>
      </div>
      <div className="view-empty-state">
        <div className="view-empty-icon">&#128176;</div>
        <h3 className="view-empty-title">Tu monedero esta vacio</h3>
        <p className="view-empty-desc">Aqui veras tu saldo y el historial de movimientos.</p>
      </div>
    </div>
  );
}

export default ViewMonedero;