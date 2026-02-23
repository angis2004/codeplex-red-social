import React from "react";

function ViewDatosFacturacion() {
  return (
    <div className="view-page">
      <div className="view-header-banner">
        <div>
          <h1 className="view-title">Datos de Facturacion</h1>
          <p className="view-subtitle">Configura tus datos para emision de comprobantes</p>
        </div>
      </div>
      <div className="view-empty-state">
        <div className="view-empty-icon">&#129534;</div>
        <h3 className="view-empty-title">Sin datos de facturacion</h3>
        <p className="view-empty-desc">Configura tus datos de facturacion para emitir comprobantes electronicos.</p>
      </div>
    </div>
  );
}

export default ViewDatosFacturacion;