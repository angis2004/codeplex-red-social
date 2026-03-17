import React from "react";

/**
 * Presentación — Ícono visual de una Aplicacion del catálogo.
 * Renderiza el SVG correspondiente al tipo de aplicación.
 */
function IconoAplicacion({ tipo, colorTema }) {
  const coloresPorTema = {
    "color-contaplex":   "#0094C0",
    "color-comercial":   "#0D9488",
    "color-restaurante": "#F97316",
    "color-grifo":       "#B91C1C",
    "color-facturacion": "#1E40AF",
    "color-transporte":  "#1E40AF",
  };

  const bg1 = coloresPorTema[colorTema] ?? "#6366F1";

  if (tipo === "gestionplex-comercial") {
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill={bg1} />
        <path d="M20 10L30 15V25L20 30L10 25V15L20 10Z" stroke="white" strokeWidth="2" fill="none" />
        <path d="M10 15L20 20L30 15" stroke="white" strokeWidth="2" />
        <path d="M20 20V30" stroke="white" strokeWidth="2" />
      </svg>
    );
  }

  if (tipo === "gestionplex-restaurante") {
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill={bg1} />
        <line x1="15" y1="10" x2="15" y2="30" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M13 10V17C13 18.1 13.9 19 15 19C16.1 19 17 18.1 17 17V10" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="25" y1="10" x2="25" y2="30" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M22 10C22 10 22 16 25 17V30" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  /* Conta-Plex y resto: barras de gráfico */
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="10" fill={bg1} />
      <rect x="10" y="22" width="5" height="9" rx="1.5" fill="white" />
      <rect x="17.5" y="16" width="5" height="15" rx="1.5" fill="white" />
      <rect x="25" y="10" width="5" height="21" rx="1.5" fill="white" />
    </svg>
  );
}

export default IconoAplicacion;
