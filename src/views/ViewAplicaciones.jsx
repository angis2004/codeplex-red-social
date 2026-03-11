import React, { useState } from "react";
import "../styles/Aplicaciones.css";
import ModalPlanesRestaurante from "../components/aplicaciones/ModalPlanesRestaurante/ModalPlanesRestaurante";

/* ── Datos de aplicaciones ── */
const APPS = [
  {
    id: 1,
    nombre: "Conta-Plex",
    publisher: "CodePlex",
    categoria: "CONTABILIDAD",
    categoriaColor: "contabilidad",
    icono: "contaplex",
    descripcion: "Sistema contable integral. Planes separados para contadores y para Empresas",
    features: [
      "Facturación electrónica SUNAT",
      "Contabilidad multi-empresas",
      "Reportes y Balances",
      "Declaraciones tributarias",
    ],
    precioDesde: "S/50",
    accentColor: "azul",
  },
  {
    id: 2,
    nombre: "GestiónPlex",
    publisher: "Comercial",
    categoria: "LOGÍSTICA",
    categoriaColor: "logistica",
    icono: "gestionplex-comercial",
    descripcion: "Sistema de gestión comercial con facturación electrónica, inventarios, compras y ventas limitadas.",
    features: [
      "Facturación electrónica SUNAT",
      "Contabilidad multi-empresas",
      "Reportes y Balances",
      "Declaraciones tributarias",
    ],
    precioDesde: "S/100",
    accentColor: "azul",
  },
  {
    id: 3,
    nombre: "GestiónPlex",
    publisher: "Restaurante",
    categoria: "RESTAURANTE",
    categoriaColor: "restaurante",
    icono: "gestionplex-restaurante",
    descripcion: "Sistema completo para restaurantes: mesas, pedidos, cocina, delivery y facturación electrónica.",
    features: [
      "Facturación electrónica SUNAT",
      "Contabilidad multi-empresas",
      "Reportes y Balances",
      "Declaraciones tributarias",
    ],
    precioDesde: "S/150",
    accentColor: "naranja",
  },
  {
    id: 4,
    nombre: "Gestión-Plex Grifo",
    publisher: "CodePlex",
    categoria: "GRIFO",
    categoriaColor: "contabilidad",
    icono: "contaplex",
    descripcion: "Software especializado para grifos ,elige el plan perfecto para ti  con comprobantes ilimitados ",
    features: [
      "Facturación electrónica SUNAT",
      "Contabilidad multi-empresas",
      "Reportes y Balances",
      "Declaraciones tributarias",
    ],
    precioDesde: "S/350",
    accentColor: "azul",
  },
  {
    id: 5, 
    nombre: "Gestión-Plex Comercial",
    publisher: "CodePlex",
    categoria: "COMERCIAL",
    categoriaColor: "contabilidad",
    icono: "contaplex",
    descripcion: "Elige el plan perfecto para ti  con comprobantes ilimitados ",
    features: [
      "Facturación electrónica SUNAT",
      "Contabilidad multi-empresas",
      "Reportes y Balances",
      "Declaraciones tributarias",
    ],
    precioDesde: "S/150",
    accentColor: "azul",
  },
  {
    id: 6,
    nombre: "Facturación Electrónica",
    publisher: "CodePlex",
    categoria: "FACTURACION",
    categoriaColor: "contabilidad",
    icono: "contaplex",
    descripcion: "Software empresarial ,elige el plan perfecto para ti  con hasta hasta 2,000 comprobantes ",
    features: [
      "Facturación electrónica SUNAT",
      "Contabilidad multi-empresas",
      "Reportes y Balances",
      "Declaraciones tributarias",
    ], 
    precioDesde: "S/50",
    accentColor: "azul",
  },
    {
    id: 7,
    nombre: "Gestión-Plex Transporte",
    publisher: "CodePlex",
    categoria: "TRANSPORTE",
    categoriaColor: "contabilidad",
    icono: "contaplex",
    descripcion: "Software especializado para empresas de transporte ,elige el plan perfecto para ti  con comprobantes ilimitados  ",
    features: [
      "Facturación electrónica SUNAT",
      "Contabilidad multi-empresas",
      "Reportes y Balances",
      "Declaraciones tributarias",
    ], 
    precioDesde: "S/150",
    accentColor: "azul",
  },
];

/* ── Íconos SVG inline por app ── */
function AppIcon({ tipo, accentColor }) {
  const isNaranja = accentColor === "naranja";
  const bg1 = isNaranja ? "#F97316" : "#6366F1";
  const bg2 = isNaranja ? "#EA580C" : "#4F46E5";

  if (tipo === "gestionplex-comercial") {
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill={bg1} />
        {/* caja/paquete */}
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
        {/* tenedor y cuchillo */}
        <line x1="15" y1="10" x2="15" y2="30" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M13 10V17C13 18.1 13.9 19 15 19C16.1 19 17 18.1 17 17V10" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="25" y1="10" x2="25" y2="30" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M22 10C22 10 22 16 25 17V30" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  /* Conta-Plex: barras de gráfico */
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="10" fill={bg1} />
      <rect x="10" y="22" width="5" height="9" rx="1.5" fill="white" />
      <rect x="17.5" y="16" width="5" height="15" rx="1.5" fill="white" />
      <rect x="25" y="10" width="5" height="21" rx="1.5" fill="white" />
    </svg>
  );
}

/* ── Check icon ── */
function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="7" fill="#22C55E" opacity="0.15" />
      <path d="M4 7L6 9L10 5" stroke="#22C55E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Componente tarjeta ── */
function AppCard({ app, onAgregar, isInstalada }) {
  return (
    <div className={`app-card app-card--${app.accentColor}`}>
      {/* Header de la card */}
      <div className="app-card-header">
        <div className="app-card-icon">
          <AppIcon tipo={app.icono} accentColor={app.accentColor} />
        </div>
        <div className="app-card-info">
          <span className="app-card-nombre">{app.nombre}</span>
          <span className="app-card-publisher">{app.publisher}</span>
        </div>
        <span className={`app-card-badge app-card-badge--${app.categoriaColor}`}>
          {app.categoria}
        </span>
      </div>

      {/* Descripción */}
      <p className="app-card-desc">{app.descripcion}</p>

      {/* Features */}
      <ul className="app-card-features">
        {app.features.map((f) => (
          <li key={f}>
            <CheckIcon />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="app-card-footer">
        <div className="app-card-precio">
          <span className="badge-gratis">Gratis</span>
          <span className="precio-desde">Desde {app.precioDesde}/mes</span>
        </div>
        {isInstalada ? (
          <button className="btn-instalada" disabled>
            ✓ Instalada
          </button>
        ) : (
          <button className="btn-agregar" onClick={() => onAgregar && onAgregar(app)}>
            + Agregar
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Ícono restaurante pequeño para Mis Apps ── */
function IconoMisApp() {
  return (
    <svg width="38" height="38" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#F97316" />
      <line x1="17" y1="13" x2="17" y2="35" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M14 13V20C14 21.7 15.3 23 17 23C18.7 23 20 21.7 20 20V13" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="13" x2="30" y2="35" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M27 13C27 13 27 20 30 21V35" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/* ── Modal confirmación desinstalar ── */
function ModalDesinstalar({ app, onCancelar, onConfirmar }) {
  if (!app) return null;
  return (
    <div className="desinstalar-overlay" onClick={onCancelar}>
      <div className="desinstalar-modal" onClick={(e) => e.stopPropagation()}>
        {/* Ícono X rojo */}
        <div className="desinstalar-icon-wrap">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M10 10L30 30M30 10L10 30" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>

        <h2 className="desinstalar-titulo">
          ¿Desinstalar {app.appNombre || "GestiónPlex"} {app.appPublisher || "Restaurante"}?
        </h2>
        <p className="desinstalar-sub">
          Perderá acceso a todos tus datos . Est accion no se puede deshacer.
        </p>

        <div className="desinstalar-btns">
          <button className="desinstalar-btn-cancelar" onClick={onCancelar}>Cancelar</button>
          <button className="desinstalar-btn-confirmar" onClick={() => onConfirmar(app.id)}>Si desinstalar</button>
        </div>
      </div>
    </div>
  );
}

/* ── Tarjeta de app adquirida ── */
function MisAppCard({ app, onMejorarPlan, onDesinstalar }) {
  const planDisplay = { gratis: "Gratis", basico: "Básico", gold: "Gold" }[app.planNombre] || app.planNombre;

  const hoy        = new Date();
  const fechaVence = new Date(hoy);
  fechaVence.setMonth(hoy.getMonth() + 1);

  const diasRestantes = Math.max(0, Math.round((fechaVence - hoy) / (1000 * 60 * 60 * 24)));

  const fmtDate = (d) => new Date(d).toLocaleDateString("es-PE", {
    day: "2-digit", month: "short", year: "numeric",
  }).replace(/\./g, "");

  return (
    <div className="misapp-card">
      <div className="misapp-left">
        <IconoMisApp />
        <div>
          <div className="misapp-nombre">{app.appNombre || "GestiónPlex"}</div>
          <div className="misapp-pub">{app.appPublisher || "Restaurante"}</div>
        </div>
      </div>

      <div className="misapp-meta">
        <div className="misapp-meta-col">
          <span className="misapp-meta-label">PLAN</span>
          <span className="misapp-meta-val misapp-meta-val--plan">{planDisplay}</span>
        </div>
        <div className="misapp-meta-col">
          <span className="misapp-meta-label">INICIO PRUEBA</span>
          <span className="misapp-meta-val">{fmtDate(hoy)}</span>
        </div>
        <div className="misapp-meta-col">
          <span className="misapp-meta-label">VENCE PRUEBA</span>
          <span className="misapp-meta-val">{fmtDate(fechaVence)}</span>
        </div>
        <div className="misapp-meta-col">
          <span className="misapp-meta-label">DIAS RESTANTES</span>
          <span className="misapp-meta-val misapp-meta-val--dias">🕐 {diasRestantes} días</span>
        </div>
        <div className="misapp-meta-col">
          <span className="misapp-meta-label">Si no Migras</span>
          <span className="misapp-meta-val misapp-meta-val--warn">🔒 Modo limitado</span>
        </div>
      </div>

      <div className="misapp-actions">
        <button className="misapp-btn-mejorar" onClick={onMejorarPlan}>Mejorar Plan</button>
        <button className="misapp-btn-desinstalar" onClick={onDesinstalar}>Desinstalar</button>
      </div>
    </div>
  );
}

/* ── Vista principal ── */
function ViewAplicaciones({ onProcederPago, misApps = [], tabInicial = "adquirir", onTabChange, onDesinstalarApp }) {
  const [tabActivo, setTabActivo]           = useState(tabInicial);
  const [filtro, setFiltro]                 = useState("todos");
  const [busqueda, setBusqueda]             = useState("");
  const [modalRestaurante, setModalRestaurante] = useState(false);
  const [appADesinstalar, setAppADesinstalar]   = useState(null);

  const cambiarTab = (t) => {
    setTabActivo(t);
    onTabChange?.(t);
  };

  const handleAgregar = (app) => {
    if (app.icono === "gestionplex-restaurante") {
      setModalRestaurante(true);
    }
  };

  const handleConfirmarDesinstalar = (id) => {
    onDesinstalarApp?.(id);
    setAppADesinstalar(null);
  };

  const filtros = ["todos", "e-commerce", "otros"];

  const appsFiltradas = APPS.filter((app) => {
    if (busqueda && !app.nombre.toLowerCase().includes(busqueda.toLowerCase())) return false;
    if (filtro === "e-commerce") return false;
    if (filtro === "otros") return false;
    return true;
  });

  return (
    <div className="view-aplicaciones">
      {/* Título + badge activos */}
      <div className="aplicaciones-header aplicaciones-header--row">
        <div>
          <h1 className="aplicaciones-title">Aplicaciones</h1>
          <p className="aplicaciones-subtitle">Gestiona tus módulos activos y explora nuevas soluciones</p>
        </div>
        {misApps.length > 0 && (
          <span className="apps-activos-badge">{misApps.length} activo{misApps.length > 1 ? "s" : ""}</span>
        )}
      </div>

      {/* Tabs */}
      <div className="aplicaciones-tabs">
        <button
          className={`tab-btn${tabActivo === "mis" ? " tab-btn--active" : ""}`}
          onClick={() => cambiarTab("mis")}
        >
          Mis Aplicaciones
        </button>
        <button
          className={`tab-btn${tabActivo === "adquirir" ? " tab-btn--active" : ""}`}
          onClick={() => cambiarTab("adquirir")}
        >
          Adquirir Aplicaciones
        </button>
      </div>

      {/* Buscador */}
      <div className="aplicaciones-search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Buscar Aplicaciones"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Filtros + Ordenar */}
      <div className="aplicaciones-filtros">
        <div className="filtros-izq">
          {filtros.map((f) => (
            <button
              key={f}
              className={`filtro-btn${filtro === f ? " filtro-btn--active" : ""}`}
              onClick={() => setFiltro(f)}
            >
              {f === "todos" ? "Todos" : f === "e-commerce" ? "E-commerce" : "Otros"}
            </button>
          ))}
        </div>
        <div className="filtros-der">
          <select className="select-ordenar">
            <option>Mas Populares</option>
            <option>Menor Precio</option>
            <option>Mayor Precio</option>
            <option>Más Recientes</option>
          </select>
        </div>
      </div>

      {/* Modal planes — Adquirir y Mejorar Plan */}
      <ModalPlanesRestaurante
        isOpen={modalRestaurante}
        onClose={() => setModalRestaurante(false)}
        onProcederPago={(data) => {
          setModalRestaurante(false);
          onProcederPago?.(data);
        }}
      />

      {/* Modal confirmación desinstalar */}
      <ModalDesinstalar
        app={appADesinstalar}
        onCancelar={() => setAppADesinstalar(null)}
        onConfirmar={handleConfirmarDesinstalar}
      />

      {tabActivo === "adquirir" ? (
        <div className="apps-grid">
          {appsFiltradas.length > 0 ? (
            appsFiltradas.map((app) => (
              <AppCard
                key={app.id}
                app={app}
                onAgregar={handleAgregar}
                isInstalada={misApps.some(
                  (a) => a.appNombre === app.nombre && a.appPublisher === app.publisher
                )}
              />
            ))
          ) : (
            <p className="apps-empty">No se encontraron aplicaciones.</p>
          )}
        </div>
      ) : misApps.length > 0 ? (
        <div className="misapps-list">
          {misApps.map((app) => (
            <MisAppCard
              key={app.id}
              app={app}
              onMejorarPlan={() => setModalRestaurante(true)}
              onDesinstalar={() => setAppADesinstalar(app)}
            />
          ))}
        </div>
      ) : (
        <div className="apps-empty-state">
          <div className="apps-empty-icon">📦</div>
          <h3>No tienes aplicaciones activas</h3>
          <p>Explora el catálogo en la pestaña "Adquirir Aplicaciones"</p>
          <button className="tab-btn tab-btn--active" onClick={() => cambiarTab("adquirir")}>
            Ver catálogo
          </button>
        </div>
      )}
    </div>
  );
}

export default ViewAplicaciones;
