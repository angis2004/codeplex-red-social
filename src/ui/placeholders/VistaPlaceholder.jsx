import React from "react";

/* ── Mapeo completo de vista → etiqueta legible ── */
const LABELS = {
  /* ContaPlex */
  "cp-home":            "Home",
  "cp-mantenedores":    "Mantenedores",
  "cp-procesos":        "Procesos",
  "cp-libros":          "Libros",
  "cp-reportes":        "Reportes",
  "cp-configuraciones": "Configuraciones",
  "cp-mis-facturas":    "Mis Facturas",
  "cp-planes":          "Planes",

  /* Gestión-Plex Comercial */
  "gc-home":            "Home",
  "gc-mantenedores":    "Mantenedores",
  "gc-compras":         "Compras",
  "gc-ventas":          "Ventas",
  "gc-tesoreria":       "Tesorería",
  "gc-reportes":        "Reportes",
  "gc-configuraciones": "Configuraciones",
  "gc-produccion":      "Producción",
  "gc-transportes":     "Transportes",
  "gc-otros-reportes":  "Otros Reportes",
  "gc-transferencias":  "Transferencias",
  "gc-mis-facturas":    "Mis Facturas",
  "gc-planes":          "Planes",

  /* Gestión-Plex Grifo */
  "gr-home":            "Home",
  "gr-configuraciones": "Configuraciones",
  "gr-procesos":        "Procesos",
  "gr-reportes":        "Reportes",
  "gr-mis-facturas":    "Mis Facturas",
  "gr-planes":          "Planes",

  /* Gestión-Plex Restaurante */
  "res-home":              "Home",
  "res-productos":         "Productos",
  "res-lista-precios":     "Lista de Precios",
  "res-pedidos":           "Pedidos",
  "res-lista-pedidos":     "Lista de Pedidos",
  "res-ventas":            "Ventas",
  "res-envio-facturas":    "Envío de Facturas",
  "res-clientes":          "Clientes",
  "res-correlativos":      "Correlativos",
  "res-empresas":          "Empresas",
  "res-parametros":        "Parámetros",
  "res-salones":           "Salones",
  "res-control-usuarios":  "Control de Usuarios",
  "res-caja-chica":        "Caja Chica",
  "res-creacion-cajas":    "Creación de Cajas",
  "res-cocina":            "Cocina",
  "res-mis-facturas":      "Mis Facturas",
  "res-planes":            "Planes",

  /* Facturación Electrónica */
  "fe-home":              "Home",
  "fe-productos":         "Productos",
  "fe-lista-precios":     "Lista de Precios",
  "fe-pos":               "POS",
  "fe-ventas":            "Ventas",
  "fe-envio-facturas":    "Envío de Facturas",
  "fe-clientes":          "Clientes",
  "fe-correlativos":      "Correlativos",
  "fe-guias":             "Guías",
  "fe-empresas":          "Empresas",
  "fe-parametros":        "Parámetros",
  "fe-control-usuarios":  "Control de Usuarios",
  "fe-mis-facturas":      "Mis Facturas",
  "fe-planes":            "Planes",

  /* Gestión-Plex Transporte */
  "tr-home":         "Home",
  "tr-mis-facturas": "Mis Facturas",
  "tr-mantenedores": "Mantenedores",
  "tr-procesos":     "Procesos",
  "tr-reportes":     "Reportes",
  "tr-planes":       "Planes",
};

function VistaPlaceholder({ vista }) {
  const label = LABELS[vista] ?? vista;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-[40px_24px] text-center">
      <div className="text-[var(--text-gray)] opacity-50">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-[var(--text-primary)] m-0 uppercase tracking-[0.04em]">Contenido de {label}</h2>
      <p className="text-[0.9rem] text-[var(--text-secondary)] m-0">
        Esta sección estará disponible próximamente.
      </p>
    </div>
  );
}

export default VistaPlaceholder;
