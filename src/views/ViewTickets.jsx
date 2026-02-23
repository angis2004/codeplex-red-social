import React from "react";

function ViewTickets() {
  return (
    <div className="view-page">
      <div className="view-header-banner">
        <div>
          <h1 className="view-title">Tickets de Soporte</h1>
          <p className="view-subtitle">Gestiona tus solicitudes de soporte tecnico</p>
        </div>
      </div>
      <div className="view-empty-state">
        <div className="view-empty-icon">&#127915;</div>
        <h3 className="view-empty-title">No tienes tickets abiertos</h3>
        <p className="view-empty-desc">Crea un ticket si necesitas ayuda del equipo de soporte.</p>
      </div>
    </div>
  );
}

export default ViewTickets;