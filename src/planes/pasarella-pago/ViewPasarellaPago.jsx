import React, { useState } from "react";
import "./PasarellaPago.css";

/* ─── Ícono app restaurante ─── */
function IconoRestauranteSmall({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#F97316" />
      <line x1="17" y1="13" x2="17" y2="35" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M14 13V20C14 21.7 15.3 23 17 23C18.7 23 20 21.7 20 20V13" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="13" x2="30" y2="35" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M27 13C27 13 27 20 30 21V35" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Mapa de prefijos telefónicos por país ─── */
const PREFIJOS = {
  Peru:      "+51",
  Colombia:  "+57",
  Ecuador:   "+593",
  Bolivia:   "+591",
  Chile:     "+56",
  Argentina: "+54",
};

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
function formatTarjeta(v) {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
}
function formatVenc(v) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length >= 3 ? d.slice(0, 2) + "/" + d.slice(2) : d;
}
function getMarcaTarjeta(num) {
  const n = num.replace(/\s/g, "");
  if (n.startsWith("4")) return "Visa";
  if (n.startsWith("5")) return "Mastercard";
  if (n.startsWith("3")) return "Amex";
  return "Tarjeta";
}
function formatFecha(date) {
  return date.toLocaleDateString("es-PE", {
    day: "2-digit", month: "short", year: "numeric",
  }).replace(/\./g, "");
}

/* ─── Pantalla de Éxito ─── */
function PantallaExito({ data, onIrMisApps }) {
  return (
    <div className="pp-exito-wrap">
      <div className="pp-exito-card">
        {/* Check animado */}
        <div className="pp-exito-check-circle">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
            <path d="M8 19L15 26L30 11" stroke="#22C55E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h2 className="pp-exito-titulo">¡Aplicación Activada!</h2>
        <p className="pp-exito-sub">Tu suscripción ha sido activada correctamente</p>

        {/* Tabla resumen */}
        <div className="pp-exito-tabla">
          <div className="pp-exito-fila">
            <span className="pp-exito-key">Aplicación</span>
            <span className="pp-exito-val">GestiónPlex · Restaurante</span>
          </div>
          <div className="pp-exito-fila">
            <span className="pp-exito-key">Plan</span>
            <span className="pp-exito-val">{data.planNombreDisplay}</span>
          </div>
          <div className="pp-exito-fila">
            <span className="pp-exito-key">Cobro Hoy</span>
            <span className="pp-exito-val">S/0.00</span>
          </div>
          <div className="pp-exito-fila">
            <span className="pp-exito-key">Primer Cobro</span>
            <span className="pp-exito-val">S/{data.precio} el {data.fechaCobroStr}</span>
          </div>
          <div className="pp-exito-fila">
            <span className="pp-exito-key">Renovación</span>
            <span className="pp-exito-val">Automática {data.billing}</span>
          </div>
          <div className="pp-exito-fila">
            <span className="pp-exito-key">Comprobantes a</span>
            <span className="pp-exito-val">{data.correo ? "Correo" : "Correo"}</span>
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
function ViewPasarellaPago({ planData, onVolver, onActivar }) {
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
  const [terminosAceptados, setTerminosAceptados] = useState(false);
  const [showExito, setShowExito]     = useState(false);
  const [exitoData, setExitoData]     = useState(null);

  const planNombre   = planData?.planNombre || "basico";
  const precio       = planData?.precio     || "150";
  const billing      = planData?.billing    || "mensual";
  const periodoLabel = billing === "mensual" ? "/mes" : "/año";

  const planNombreDisplay = { gratis: "Gratis", basico: "Básico", gold: "Gold" }[planNombre] || planNombre;

  /* Fechas */
  const hoy          = new Date();
  const primerCobro  = new Date(hoy);
  primerCobro.setMonth(primerCobro.getMonth() + 1);
  const fechaCobroStr  = formatFecha(primerCobro);
  const fechaInicioStr = formatFecha(hoy);

  /* Activar: construir datos y mostrar pantalla de éxito */
  const handleActivar = () => {
    const digits = tarjeta.replace(/\s/g, "");
    const data = {
      planNombre,
      planNombreDisplay,
      precio,
      billing,
      fechaCobroStr,
      fechaInicioStr,
      fechaVencimiento: primerCobro.toISOString(),
      correo,
      ultimos4: digits.length >= 4 ? digits.slice(-4) : "",
      marcaTarjeta: getMarcaTarjeta(tarjeta),
    };
    setExitoData(data);
    setShowExito(true);
  };

  /* Ir a Mis Aplicaciones → pasa los datos al padre */
  const handleIrMisApps = () => {
    onActivar?.({
      ...exitoData,
      appNombre:    "GestiónPlex",
      appPublisher: "Restaurante",
    });
  };

  /* ── Pantalla de éxito ── */
  if (showExito && exitoData) {
    return <PantallaExito data={exitoData} onIrMisApps={handleIrMisApps} />;
  }

  /* ── Formulario ── */
  return (
    <div className="pp-container">

      {/* ── Header ── */}
      <div className="pp-header">
        <button className="pp-volver-btn" onClick={onVolver}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Volver
        </button>
        <h1 className="pp-titulo">Información de Pago</h1>
      </div>

      {/* ── Body ── */}
      <div className="pp-body">

        {/* ══ COLUMNA IZQUIERDA: Formulario ══ */}
        <div className="pp-form-col">

          {/* STEP 1 ── Datos de la Tarjeta */}
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
              <input
                type="text"
                placeholder="123 456 789 011"
                value={tarjeta}
                onChange={(e) => setTarjeta(formatTarjeta(e.target.value))}
                maxLength={19}
              />
            </div>

            <div className="pp-field-row">
              <div className="pp-field">
                <label>Fecha de Vencimiento</label>
                <input
                  type="text"
                  placeholder="MM/AA"
                  value={vencimiento}
                  onChange={(e) => setVencimiento(formatVenc(e.target.value))}
                  maxLength={5}
                />
              </div>
              <div className="pp-field">
                <label>CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  maxLength={4}
                />
              </div>
            </div>

            <div className="pp-field" style={{ marginBottom: 0 }}>
              <label>Nombre del Propietario</label>
              <input
                type="text"
                placeholder="Gabriel Chumpitazi"
                value={propietario}
                onChange={(e) => setPropietario(e.target.value)}
              />
            </div>
          </div>

          {/* Aviso renovación */}
          <div className="pp-renovacion-aviso">
            <InfoIcon />
            <span>
              Tu suscripción se renovará automáticamente el {fechaCobroStr}. Se te cobrará S/{precio}{periodoLabel} + impuestos.
            </span>
          </div>

          {/* STEP 2 ── Datos de Facturación */}
          <div className="pp-section">
            <div className="pp-section-header">
              <StepNumber n={2} />
              <div>
                <h2 className="pp-section-titulo">Datos de Facturación</h2>
                <p className="pp-section-sub">Emisión del comprobante electrónico</p>
              </div>
            </div>

            <div className="pp-field-row">
              <div className="pp-field">
                <label>RUC / DNI</label>
                <input
                  type="text"
                  placeholder="123456789"
                  value={ruc}
                  onChange={(e) => setRuc(e.target.value.replace(/\D/g, "").slice(0, 11))}
                />
              </div>
              <div className="pp-field">
                <label>Razón Social / Nombre</label>
                <input
                  type="text"
                  placeholder="Mi Empresa S.A.C"
                  value={razonSocial}
                  onChange={(e) => setRazonSocial(e.target.value)}
                />
              </div>
            </div>

            <div className="pp-field">
              <label>País o Región</label>
              <div className="pp-select-wrap">
                <select value={pais} onChange={(e) => setPais(e.target.value)}>
                  <option>Peru</option>
                  <option>Colombia</option>
                  <option>Ecuador</option>
                  <option>Bolivia</option>
                  <option>Chile</option>
                  <option>Argentina</option>
                </select>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>

            <div className="pp-field">
              <label>Dirección Fiscal</label>
              <input
                type="text"
                placeholder="Av. Javier Prado"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
            </div>

            <div className="pp-field-row">
              <div className="pp-field">
                <label>Correo Electrónico <span className="pp-required">*</span></label>
                <input
                  type="email"
                  placeholder="empresa@ejemplo.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>
              <div className="pp-field">
                <label>Numero de Celular</label>
                <div className="pp-celular-row">
                  <div className="pp-prefijo">{PREFIJOS[pais] || "+51"}</div>
                  <input
                    type="text"
                    placeholder="999 999 999"
                    value={celular}
                    onChange={(e) => setCelular(e.target.value.replace(/\D/g, "").slice(0, 9))}
                  />
                </div>
              </div>
            </div>

            {/* Canales adicionales */}
            <div className="pp-canales">
              <h4 className="pp-canales-titulo">Canales Adicionales de Notificación</h4>
              <label className="pp-canal-item">
                <input type="checkbox" checked={notifWhatsapp} onChange={(e) => setNotifWhatsapp(e.target.checked)} />
                <div>
                  <span className="pp-canal-nombre">WhatsApp</span>
                  <span className="pp-canal-desc">Emisión del comprobante electrónico</span>
                </div>
              </label>
              <label className="pp-canal-item">
                <input type="checkbox" checked={notifSms} onChange={(e) => setNotifSms(e.target.checked)} />
                <div>
                  <span className="pp-canal-nombre">Sms/Telefono</span>
                  <span className="pp-canal-desc">Aviso por mensaje de Texto</span>
                </div>
              </label>
            </div>
          </div>

          {/* STEP 3 ── Cuando se emiten tus Facturas */}
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
                <span className="pp-timeline-valor">s/{precio}</span>
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

          {/* STEP 4 ── Autorización y Políticas */}
          <div className="pp-section">
            <div className="pp-section-header">
              <StepNumber n={4} />
              <div>
                <h2 className="pp-section-titulo">Autorización y Políticas</h2>
                <p className="pp-section-sub">Confirmaciones de tu suscripción</p>
              </div>
            </div>
            <label className="pp-terminos-label">
              <input
                type="checkbox"
                checked={terminosAceptados}
                onChange={(e) => setTerminosAceptados(e.target.checked)}
              />
              <span>
                Acepto que Codeplex cobrará en mi tarjeta el importe indicado de forma recurrente mensualmente hasta que cancele el acuerdo con los términos. Puedo cancelar en cualquier momento desde Datos de Facturación.
              </span>
            </label>
          </div>

        </div>

        {/* ══ COLUMNA DERECHA: Resumen ══ */}
        <div className="pp-resumen-col">
          <div className="pp-resumen-card">
            <h3 className="pp-resumen-titulo">Resumen de Pedido</h3>

            <div className="pp-resumen-app">
              <IconoRestauranteSmall />
              <div>
                <div className="pp-resumen-app-nombre">GestiónPlex</div>
                <div className="pp-resumen-app-pub">Restaurante</div>
              </div>
            </div>

            <div className="pp-resumen-rows">
              <div className="pp-resumen-row">
                <span>Plan Seleccionado</span>
                <span className="pp-resumen-plan">{planNombreDisplay}</span>
              </div>
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
                <div className="pp-resumen-total-label">Total {billing}:</div>
                <div className="pp-resumen-fecha">A partir del {fechaCobroStr}</div>
              </div>
              <div className="pp-resumen-total-precio">S/{precio}</div>
            </div>

            <button
              className="pp-activar-btn"
              disabled={!terminosAceptados}
              onClick={handleActivar}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              Activar Periodo de Prueba
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ViewPasarellaPago;
