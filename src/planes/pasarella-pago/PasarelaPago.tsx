import React, { useState } from "react";
import "./PasarellaPago.css";

/* ─── Mapa de colores por colorTema ─── */
const COLORES_TEMA = {
  "color-contaplex":   "#0094C0",
  "color-comercial":   "#0D9488",
  "color-restaurante": "#F97316",
  "color-grifo":       "#B91C1C",
  "color-facturacion": "#1E40AF",
  "color-transporte":  "#1E40AF",
};

/* ─── Ícono dinámico por app ─── */
function CartItemIcon({ icono, colorTema, size = 40 }) {
  const bg = COLORES_TEMA[colorTema] ?? "#6366F1";
  if (icono === "gestionplex-comercial") {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill={bg} />
        <path d="M20 10L30 15V25L20 30L10 25V15L20 10Z" stroke="white" strokeWidth="2" fill="none" />
        <path d="M10 15L20 20L30 15" stroke="white" strokeWidth="2" />
        <path d="M20 20V30" stroke="white" strokeWidth="2" />
      </svg>
    );
  }
  if (icono === "gestionplex-restaurante") {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill={bg} />
        <line x1="15" y1="10" x2="15" y2="30" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M13 10V17C13 18.1 13.9 19 15 19C16.1 19 17 18.1 17 17V10" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="25" y1="10" x2="25" y2="30" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M22 10C22 10 22 16 25 17V30" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="10" fill={bg} />
      <rect x="10" y="22" width="5" height="9" rx="1.5" fill="white" />
      <rect x="17.5" y="16" width="5" height="15" rx="1.5" fill="white" />
      <rect x="25" y="10" width="5" height="21" rx="1.5" fill="white" />
    </svg>
  );
}

/* ─── Mapa de prefijos telefónicos ─── */
const PREFIJOS = { Peru: "+51", Colombia: "+57", Ecuador: "+593", Bolivia: "+591", Chile: "+56", Argentina: "+54" };

/* ─── Número de paso ─── */
function StepNumber({ n }) {
  return <div className="pp-step-num">{n}</div>;
}

/* ─── Info icon ─── */
function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

/* ─── Helpers ─── */
function formatTarjeta(v) { return v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 "); }
function formatVenc(v) { const d = v.replace(/\D/g, "").slice(0, 4); return d.length >= 3 ? d.slice(0, 2) + "/" + d.slice(2) : d; }
function getMarcaTarjeta(num) { const n = num.replace(/\s/g, ""); if (n.startsWith("4")) return "Visa"; if (n.startsWith("5")) return "Mastercard"; if (n.startsWith("3")) return "Amex"; return "Tarjeta"; }
function formatFecha(date) { return date.toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" }).replace(/\./g, ""); }

const VIP_PRECIO = 500;
const VIP_PRECIO_ANTES = 1000;

const VIP_BENEFICIOS = [
  { n: "01", titulo: "Servidor",           desc: "AMD EPYC GENOA 9354 · 32C/64T · 3.25/3.75 GHz" },
  { n: "02", titulo: "Memoria",            desc: "DDR5 256 GB ECC 4800 MHz" },
  { n: "03", titulo: "Transferencia",      desc: "Hasta 10 GB/s" },
  { n: "04", titulo: "Base de Datos",      desc: "SQL Server Enterprise · Backup automático y redundante" },
  { n: "05", titulo: "Dominio",            desc: "Personalizado" },
  { n: "06", titulo: "Código de Sistema",  desc: "Personalizado" },
  { n: "07", titulo: "Máxima Velocidad",   desc: "Sin mensajes de tiempo de conexión agotado" },
  { n: "08", titulo: "Comprobantes",       desc: "Ilimitados · Actualizaciones SUNAT y SIRE" },
];

/* ─── Pantalla de Éxito ─── */
function PantallaExito({ data, onIrMisApps }) {
  return (
    <div className="pp-exito-wrap">
      <div className="pp-exito-card">
        <div className="pp-exito-check-circle">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
            <path d="M8 19L15 26L30 11" stroke="#22C55E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="pp-exito-titulo">¡Suscripción Activada!</h2>
        <p className="pp-exito-sub">Tu{data.apps.length > 1 ? "s" : ""} aplicación{data.apps.length > 1 ? "es han" : " ha"} sido activada{data.apps.length > 1 ? "s" : ""} correctamente</p>

        <div className="pp-exito-apps-list">
          {data.apps.map((app, i) => (
            <div key={i} className="pp-exito-app-row">
              <CartItemIcon icono={app.icono} colorTema={app.colorTema} size={32} />
              <div>
                <div className="pp-exito-app-nombre">{app.appNombre} · {app.appPublisher}</div>
                <div className="pp-exito-app-plan">Plan {app.planNombreDisplay} — S/{app.precio}/mes</div>
              </div>
            </div>
          ))}
          {data.vipIncluido && (
            <div className="pp-exito-app-row pp-exito-app-row--vip">
              <div className="pp-exito-vip-icon">⭐</div>
              <div>
                <div className="pp-exito-app-nombre">Super VIP</div>
                <div className="pp-exito-app-plan">Servicio adicional — S/{VIP_PRECIO}/mes</div>
              </div>
            </div>
          )}
        </div>

        <div className="pp-exito-tabla">
          <div className="pp-exito-fila">
            <span className="pp-exito-key">Cobro Hoy</span>
            <span className="pp-exito-val">S/0.00</span>
          </div>
          <div className="pp-exito-fila">
            <span className="pp-exito-key">Primer Cobro</span>
            <span className="pp-exito-val">S/{data.totalMensual} el {data.fechaCobroStr}</span>
          </div>
          <div className="pp-exito-fila">
            <span className="pp-exito-key">Renovación</span>
            <span className="pp-exito-val">Automática mensual</span>
          </div>
          {data.ultimos4 && (
            <div className="pp-exito-fila">
              <span className="pp-exito-key">Tarjeta</span>
              <span className="pp-exito-val">{data.marcaTarjeta} ••••{data.ultimos4}</span>
            </div>
          )}
        </div>

        <button className="pp-exito-btn" onClick={onIrMisApps}>
          Ir a Mis Aplicaciones
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════ */
function PasarelaPago({ itemsCarrito = [], alQuitarDelCarrito, alVolver, alActivar }) {
  const [tarjeta, setTarjeta]         = useState("");
  const [vencimiento, setVencimiento] = useState("");
  const [cvv, setCvv]                 = useState("");
  const [propietario, setPropietario] = useState("");
  const [ruc, setRuc]                 = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [pais, setPais]               = useState("Peru");
  const [direccion, setDireccion]     = useState("");
  const [correo, setCorreo]           = useState("");
  const [celular, setCelular]         = useState("");
  const [notifWhatsapp, setNotifWhatsapp] = useState(false);
  const [notifSms, setNotifSms]       = useState(false);
  const [vipSeleccionado, setVipSeleccionado] = useState(false);
  const [terminosAceptados, setTerminosAceptados] = useState(false);
  const [showExito, setShowExito]     = useState(false);
  const [exitoData, setExitoData]     = useState(null);

  /* Fechas */
  const hoy         = new Date();
  const primerCobro = new Date(hoy);
  primerCobro.setMonth(primerCobro.getMonth() + 1);
  const fechaCobroStr = formatFecha(primerCobro);

  /* Totales */
  const subtotalApps = itemsCarrito.reduce((sum, i) => sum + parseFloat(i.precio || 0), 0);
  const totalMensual = subtotalApps + (vipSeleccionado ? VIP_PRECIO : 0);

  /* Nombre de plan legible */
  const planNombreDisplay = (plan) => ({ gratis: "Gratis", basico: "Básico", gold: "Gold" }[plan] || plan);

  /* Activar */
  const handleActivar = () => {
    const digits = tarjeta.replace(/\s/g, "");
    const data = {
      apps: itemsCarrito.map((item) => ({ ...item, planNombreDisplay: planNombreDisplay(item.planNombre) })),
      vipIncluido: vipSeleccionado,
      totalMensual,
      fechaCobroStr,
      correo,
      ultimos4: digits.length >= 4 ? digits.slice(-4) : "",
      marcaTarjeta: getMarcaTarjeta(tarjeta),
    };
    setExitoData(data);
    setShowExito(true);
  };

  const handleIrMisApps = () => {
    alActivar?.(
      exitoData.apps.map((app) => ({
        ...app,
        planNombreDisplay: planNombreDisplay(app.planNombre),
      }))
    );
  };

  /* Carrito vacío */
  if (itemsCarrito.length === 0 && !showExito) {
    return (
      <div className="pp-container">
        <div className="pp-header">
          <button className="pp-volver-btn" onClick={alVolver}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Volver
          </button>
          <h1 className="pp-titulo">Información de Pago</h1>
        </div>
        <div className="pp-carrito-vacio">
          <div className="pp-carrito-vacio-icon">🛒</div>
          <h3>Tu carrito está vacío</h3>
          <p>Agrega aplicaciones desde el catálogo para continuar.</p>
          <button className="pp-volver-catalogo-btn" onClick={alVolver}>Ver catálogo</button>
        </div>
      </div>
    );
  }

  if (showExito && exitoData) {
    return <PantallaExito data={exitoData} onIrMisApps={handleIrMisApps} />;
  }

  return (
    <div className="pp-container">

      {/* ── Header ── */}
      <div className="pp-header">
        <button className="pp-volver-btn" onClick={alVolver}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Volver
        </button>
        <h1 className="pp-titulo">Información de Pago</h1>
      </div>

      {/* ── Body ── */}
      <div className="pp-body">

        {/* ══ COLUMNA IZQUIERDA ══ */}
        <div className="pp-form-col">

          {/* STEP 1 — Datos de la Tarjeta */}
          <div className="pp-section">
            <div className="pp-section-header">
              <StepNumber n={1} />
              <div>
                <h2 className="pp-section-titulo">Datos de la Tarjeta</h2>
                <p className="pp-section-sub">Tu Tarjeta se guarda de forma segura. El cobro es recurrente mensual por adelantado</p>
              </div>
            </div>
            <div className="pp-field">
              <label>Numero de la Tarjeta</label>
              <input type="text" placeholder="1234 5678 9012 3456" value={tarjeta} onChange={(e) => setTarjeta(formatTarjeta(e.target.value))} maxLength={19} />
            </div>
            <div className="pp-field-row">
              <div className="pp-field">
                <label>Fecha de Vencimiento</label>
                <input type="text" placeholder="MM/AA" value={vencimiento} onChange={(e) => setVencimiento(formatVenc(e.target.value))} maxLength={5} />
              </div>
              <div className="pp-field">
                <label>CVV</label>
                <input type="text" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))} maxLength={4} />
              </div>
            </div>
            <div className="pp-field" style={{ marginBottom: 0 }}>
              <label>Nombre del Propietario</label>
              <input type="text" placeholder="Como aparece en tu tarjeta" value={propietario} onChange={(e) => setPropietario(e.target.value)} />
            </div>
          </div>

          {/* Aviso renovación */}
          <div className="pp-renovacion-aviso">
            <InfoIcon />
            <span>
              Tu suscripción se renovará automáticamente el {fechaCobroStr}. Se te cobrará S/{totalMensual.toLocaleString()}/mes + impuestos.
            </span>
          </div>

          {/* STEP 2 — Datos de Facturación */}
          <div className="pp-section">
            <div className="pp-section-header">
              <StepNumber n={2} />
              <div>
                <h2 className="pp-section-titulo">Datos de Facturación</h2>
                <p className="pp-section-sub">Se usarán para emitir tu comprobante electrónico</p>
              </div>
            </div>
            <div className="pp-field">
              <label>RUC / DNI</label>
              <input type="text" placeholder="Ej: 20123456789" value={ruc} onChange={(e) => setRuc(e.target.value.replace(/\D/g, "").slice(0, 11))} />
            </div>
            <div className="pp-field">
              <label>Razón Social / Nombre Completo</label>
              <input type="text" placeholder="Ej: Inversiones Digitales S.A.C" value={razonSocial} onChange={(e) => setRazonSocial(e.target.value)} />
            </div>
            <div className="pp-field">
              <label>País o Región</label>
              <div className="pp-select-wrap">
                <select value={pais} onChange={(e) => setPais(e.target.value)}>
                  <option>Peru</option><option>Colombia</option><option>Ecuador</option>
                  <option>Bolivia</option><option>Chile</option><option>Argentina</option>
                </select>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
              </div>
            </div>
            <div className="pp-field">
              <label>Dirección Fiscal</label>
              <input type="text" placeholder="Ej: Av. La Marina 2000, San Miguel, Lima" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
            </div>
            <div className="pp-field">
              <label>Correo Electrónico <span className="pp-required">*</span></label>
              <input type="email" placeholder="correo@tuempresa.com" value={correo} onChange={(e) => setCorreo(e.target.value)} />
            </div>
            <div className="pp-field" style={{ marginBottom: 0 }}>
              <label>Número de Celular</label>
              <div className="pp-celular-row">
                <div className="pp-prefijo">{PREFIJOS[pais] || "+51"}</div>
                <input type="text" placeholder="987 654 321" value={celular} onChange={(e) => setCelular(e.target.value.replace(/\D/g, "").slice(0, 9))} />
              </div>
            </div>
            <div className="pp-canales" style={{ marginTop: 16 }}>
              <h4 className="pp-canales-titulo">Canales Adicionales de Notificación</h4>
              <label className="pp-canal-item">
                <input type="checkbox" checked={notifWhatsapp} onChange={(e) => setNotifWhatsapp(e.target.checked)} />
                <div><span className="pp-canal-nombre">WhatsApp</span><span className="pp-canal-desc">Recibe tus comprobantes por WhatsApp</span></div>
              </label>
              <label className="pp-canal-item">
                <input type="checkbox" checked={notifSms} onChange={(e) => setNotifSms(e.target.checked)} />
                <div><span className="pp-canal-nombre">SMS / Teléfono</span><span className="pp-canal-desc">Avisos de cobro y renovación por mensaje</span></div>
              </label>
            </div>
          </div>

          {/* SUPER VIP — Upsell */}
          <div className={`pp-vip-card${vipSeleccionado ? " pp-vip-card--selected" : ""}`}>
            <div className="pp-vip-header">
              <div className="pp-vip-badge">SERVICIO ADICIONAL</div>
              <div className="pp-vip-titulo-wrap">
                <span className="pp-vip-estrella">⭐</span>
                <h2 className="pp-vip-titulo">Super VIP</h2>
                <span className="pp-vip-sub-tag">+ Almacenamiento</span>
              </div>
              <p className="pp-vip-desc">Soporte Preferencial · Infraestructura dedicada</p>
            </div>

            <div className="pp-vip-beneficios">
              {VIP_BENEFICIOS.map((b) => (
                <div key={b.n} className="pp-vip-item">
                  <span className="pp-vip-num">{b.n}</span>
                  <div>
                    <span className="pp-vip-item-titulo">{b.titulo}:</span>
                    <span className="pp-vip-item-desc"> {b.desc}</span>
                  </div>
                </div>
              ))}
              <div className="pp-vip-extra">
                Actualizaciones: SUNAT y SIRE · Tráfico independiente de información
              </div>
            </div>

            <label className={`pp-vip-checkbox-row${vipSeleccionado ? " pp-vip-checkbox-row--checked" : ""}`}>
              <input
                type="checkbox"
                checked={vipSeleccionado}
                onChange={(e) => setVipSeleccionado(e.target.checked)}
              />
              <div className="pp-vip-checkbox-info">
                <div className="pp-vip-checkbox-titulo">Agregar Super VIP a mi plan</div>
                <div className="pp-vip-precio-wrap">
                  <span className="pp-vip-precio-antes">Antes S/{VIP_PRECIO_ANTES.toLocaleString()}</span>
                  <span className="pp-vip-precio-ahora">S/{VIP_PRECIO}/mes</span>
                  <span className="pp-vip-descuento-pill pp-vip-descuento-pill--yellow">50% OFF</span>
                  <span className="pp-vip-descuento-pill pp-vip-descuento-pill--red">Cupos limitados</span>
                </div>
              </div>
            </label>
          </div>

          {/* STEP 3 — Cuando se emiten tus Facturas */}
          <div className="pp-section">
            <div className="pp-section-header">
              <StepNumber n={3} />
              <div>
                <h2 className="pp-section-titulo">Cuando se emiten tus Facturas?</h2>
                <p className="pp-section-sub">Conoce exactamente tu calendario - todo pago es por adelantado</p>
              </div>
            </div>
            <div className="pp-timeline">
              <div className="pp-timeline-item">
                <div className="pp-timeline-dot pp-timeline-dot--active" />
                <div className="pp-timeline-content">
                  <span className="pp-timeline-label">Hoy-Activación</span>
                  <span className="pp-timeline-desc">Se registra tu tarjeta y empieza el periodo de prueba</span>
                </div>
                <span className="pp-timeline-valor">S/0.00 sin Cobro</span>
              </div>
              <div className="pp-timeline-connector" />
              <div className="pp-timeline-item">
                <div className="pp-timeline-dot" />
                <div className="pp-timeline-content">
                  <span className="pp-timeline-label">{fechaCobroStr} — Primer cobro real</span>
                  <span className="pp-timeline-desc">Primer cobro mensual al vencer el trial de 30 días</span>
                </div>
                <span className="pp-timeline-valor">S/{totalMensual.toLocaleString()}</span>
              </div>
              <div className="pp-timeline-connector" />
              <div className="pp-timeline-item">
                <div className="pp-timeline-dot" />
                <div className="pp-timeline-content">
                  <span className="pp-timeline-label">Meses siguientes</span>
                  <span className="pp-timeline-desc">Mismo día cada mes. Cobro anticipado + aviso 3 días antes</span>
                </div>
                <span className="pp-timeline-valor">Recurrente</span>
              </div>
            </div>
          </div>

          {/* STEP 4 — Autorización y Políticas */}
          <div className="pp-section">
            <div className="pp-section-header">
              <StepNumber n={4} />
              <div>
                <h2 className="pp-section-titulo">Autorización y Políticas</h2>
                <p className="pp-section-sub">Confirmaciones de tu suscripción</p>
              </div>
            </div>
            <label className="pp-terminos-label">
              <input type="checkbox" checked={terminosAceptados} onChange={(e) => setTerminosAceptados(e.target.checked)} />
              <span>
                Acepto que Codeplex cobrará en mi tarjeta el importe indicado de forma recurrente mensualmente hasta que cancele el acuerdo con los términos. Puedo cancelar en cualquier momento desde Datos de Facturación.
              </span>
            </label>
          </div>

        </div>

        {/* ══ COLUMNA DERECHA: Resumen ══ */}
        <div className="pp-resumen-col">
          <div className="pp-resumen-card">
            <div className="pp-resumen-titulo-row">
              <h3 className="pp-resumen-titulo">Resumen de Pedido</h3>
              {itemsCarrito.length > 0 && (
                <span className="pp-resumen-count-badge">
                  {itemsCarrito.length} aplicacion{itemsCarrito.length !== 1 ? "es" : ""}
                </span>
              )}
            </div>

            {/* Items del carrito */}
            <div className="pp-resumen-items">
              {itemsCarrito.map((item) => (
                <div key={item.cartId} className="pp-resumen-item">
                  <CartItemIcon icono={item.icono} colorTema={item.colorTema} size={36} />
                  <div className="pp-resumen-item-info">
                    <div className="pp-resumen-item-row1">
                      <span className="pp-resumen-item-nombre">{item.appNombre}</span>
                      <div className="pp-resumen-item-derecha">
                        <span className="pp-resumen-item-precio">S/{item.precio}</span>
                        <button
                          className="pp-resumen-item-x"
                          onClick={() => alQuitarDelCarrito?.(item.cartId)}
                          title="Quitar del carrito"
                        >×</button>
                      </div>
                    </div>
                    <div className="pp-resumen-item-plan">
                      Plan {planNombreDisplay(item.planNombre)} · {item.periodoFacturacion || "mensual"}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ADD-ON VIP si está seleccionado */}
            {vipSeleccionado && (
              <div className="pp-resumen-addon">
                <div className="pp-resumen-addon-label">ADD-ON INCLUIDO:</div>
                <div className="pp-resumen-addon-row">
                  <span>⭐ Super VIP</span>
                  <span className="pp-resumen-addon-precio">+S/{VIP_PRECIO}</span>
                </div>
              </div>
            )}

            <div className="pp-resumen-rows">
              <div className="pp-resumen-row">
                <span>Período de Prueba</span>
                <span className="pp-resumen-gratis">1 mes gratis</span>
              </div>
              <div className="pp-resumen-row">
                <span>Cobro Hoy</span>
                <span className="pp-resumen-hoy">S/0.00</span>
              </div>
            </div>

            <div className="pp-resumen-divider" />

            <div className="pp-resumen-total-row">
              <div>
                <div className="pp-resumen-total-label">Total mensual:</div>
                <div className="pp-resumen-fecha">A partir del {fechaCobroStr}</div>
              </div>
              <div className="pp-resumen-total-precio">S/{totalMensual.toLocaleString()}</div>
            </div>

            <button
              className="pp-activar-btn"
              disabled={!terminosAceptados || itemsCarrito.length === 0}
              onClick={handleActivar}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              Activar Periodo de Prueba
            </button>

            <div className="pp-resumen-seguro">
              🔒 Pago seguro · Tu tarjeta no se cobra hoy
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default PasarelaPago;
