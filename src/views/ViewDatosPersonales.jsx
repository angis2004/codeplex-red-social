import React from "react";

function ViewDatosPersonales() {
  return (
    <div className="view-page">
      <div className="view-header-banner">
        <div>
          <h1 className="view-title">Datos Personales</h1>
          <p className="view-subtitle">Gestiona tu informacion personal y profesional</p>
        </div>
      </div>
      <div className="view-empty-state">
        <div className="view-empty-icon">&#128100;</div>
        <h3 className="view-empty-title">Tu perfil esta incompleto</h3>
        <p className="view-empty-desc">Completa tus datos personales para una mejor experiencia en el sistema.</p>
      </div>
    </div>
  );
}

export default ViewDatosPersonales;