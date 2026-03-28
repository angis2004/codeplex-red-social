import React, { useState } from "react";

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
  return (
    <div className="w-7 h-7 rounded-full bg-brand text-white text-[13px] font-bold flex items-center justify-center shrink-0">
      {n}
    </div>
  );
}

/* ─── Info icon ─── */
function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" className="shrink-0 mt-[1px]">
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
    <div className="flex items-center justify-center min-h-[60vh] p-[40px_20px]">
      <div className="bg-surface border-[1.5px] border-line rounded-[18px] p-[40px_36px_36px] max-w-[480px] w-full text-center shadow-[0_4px_24px_rgba(0,0,0,0.07)] [animation:pp-exito-in_0.35s_cubic-bezier(0.34,1.4,0.64,1)]">
        <div className="w-[72px] h-[72px] rounded-full bg-green-50 border-2 border-green-300 flex items-center justify-center mx-auto mb-5">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
            <path d="M8 19L15 26L30 11" stroke="#22C55E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="text-[22px] font-extrabold text-fg m-0 mb-1.5">¡Suscripción Activada!</h2>
        <p className="text-sm text-muted m-0 mb-6">
          Tu{data.apps.length > 1 ? "s" : ""} aplicación{data.apps.length > 1 ? "es han" : " ha"} sido activada{data.apps.length > 1 ? "s" : ""} correctamente
        </p>

        <div className="flex flex-col gap-2 mb-5">
          {data.apps.map((app, i) => (
            <div key={i} className="flex items-center gap-2.5 bg-base border border-line rounded-xl p-[10px_12px] text-left">
              <CartItemIcon icono={app.icono} colorTema={app.colorTema} size={32} />
              <div>
                <div className="text-[13px] font-semibold text-fg">{app.appNombre} · {app.appPublisher}</div>
                <div className="text-xs text-muted mt-0.5">Plan {app.planNombreDisplay} — S/{app.precio}/mes</div>
              </div>
            </div>
          ))}
          {data.vipIncluido && (
            <div className="flex items-center gap-2.5 bg-gradient-to-br from-sky-500 to-teal-600 rounded-xl p-[10px_12px] text-left text-white">
              <div className="text-[22px] w-8 h-8 flex items-center justify-center shrink-0">⭐</div>
              <div>
                <div className="text-[13px] font-semibold">Super VIP</div>
                <div className="text-xs mt-0.5">Servicio adicional — S/{VIP_PRECIO}/mes</div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-base border border-line rounded-xl overflow-hidden mb-6 text-left">
          <div className="flex justify-between items-center py-[11px] px-4 border-b border-line text-[13px]">
            <span className="text-muted font-medium">Cobro Hoy</span>
            <span className="font-semibold text-fg">S/0.00</span>
          </div>
          <div className="flex justify-between items-center py-[11px] px-4 border-b border-line text-[13px]">
            <span className="text-muted font-medium">Primer Cobro</span>
            <span className="font-semibold text-fg">S/{data.totalMensual} el {data.fechaCobroStr}</span>
          </div>
          <div className="flex justify-between items-center py-[11px] px-4 border-b border-line text-[13px]">
            <span className="text-muted font-medium">Renovación</span>
            <span className="font-semibold text-fg">Automática mensual</span>
          </div>
          {data.ultimos4 && (
            <div className="flex justify-between items-center py-[11px] px-4 text-[13px]">
              <span className="text-muted font-medium">Tarjeta</span>
              <span className="font-semibold text-fg">{data.marcaTarjeta} ••••{data.ultimos4}</span>
            </div>
          )}
        </div>

        <button
          className="w-full flex items-center justify-center gap-2 bg-brand text-white border-0 rounded-xl py-3.5 text-[15px] font-semibold cursor-pointer transition-all hover:bg-brand-alt hover:-translate-y-px"
          onClick={onIrMisApps}
        >
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
  const [tarjeta, setTarjeta]             = useState("");
  const [vencimiento, setVencimiento]     = useState("");
  const [cvv, setCvv]                     = useState("");
  const [propietario, setPropietario]     = useState("");
  const [ruc, setRuc]                     = useState("");
  const [razonSocial, setRazonSocial]     = useState("");
  const [pais, setPais]                   = useState("Peru");
  const [direccion, setDireccion]         = useState("");
  const [correo, setCorreo]               = useState("");
  const [celular, setCelular]             = useState("");
  const [notifWhatsapp, setNotifWhatsapp] = useState(false);
  const [notifSms, setNotifSms]           = useState(false);
  const [vipSeleccionado, setVipSeleccionado] = useState(false);
  const [terminosAceptados, setTerminosAceptados] = useState(false);
  const [showExito, setShowExito]         = useState(false);
  const [exitoData, setExitoData]         = useState(null);

  /* Fechas */
  const hoy         = new Date();
  const primerCobro = new Date(hoy);
  primerCobro.setMonth(primerCobro.getMonth() + 1);
  const fechaCobroStr = formatFecha(primerCobro);

  /* Totales */
  const subtotalApps = itemsCarrito.reduce((sum, i) => sum + parseFloat(i.precio || 0), 0);
  const totalMensual = subtotalApps + (vipSeleccionado ? VIP_PRECIO : 0);

  const planNombreDisplay = (plan) => ({ gratis: "Gratis", basico: "Básico", gold: "Gold" }[plan] || plan);

  const handleActivar = () => {
    const digits = tarjeta.replace(/\s/g, "");
    setExitoData({
      apps: itemsCarrito.map((item) => ({ ...item, planNombreDisplay: planNombreDisplay(item.planNombre) })),
      vipIncluido: vipSeleccionado,
      totalMensual,
      fechaCobroStr,
      correo,
      ultimos4: digits.length >= 4 ? digits.slice(-4) : "",
      marcaTarjeta: getMarcaTarjeta(tarjeta),
    });
    setShowExito(true);
  };

  const handleIrMisApps = () => {
    alActivar?.(exitoData.apps.map((app) => ({ ...app, planNombreDisplay: planNombreDisplay(app.planNombre) })));
  };

  /* ── Clases reutilizables ── */
  const inputCls = "border-[1.5px] border-line rounded-lg py-[10px] px-[13px] text-sm text-fg bg-surface outline-none transition-colors w-full box-border focus:border-brand placeholder:text-subtle";
  const cardCls  = "bg-surface border-[1.5px] border-line rounded-[14px] px-6 py-[22px]";
  const labelCls = "text-[13px] font-medium text-fg";

  /* ── Carrito vacío ── */
  if (itemsCarrito.length === 0 && !showExito) {
    return (
      <div className="max-w-[980px] mx-auto pb-12">
        <div className="flex items-center gap-3.5 mb-7">
          <button className="flex items-center gap-1.5 bg-transparent border-0 text-muted text-sm font-medium cursor-pointer py-[7px] px-3 rounded-lg transition-colors whitespace-nowrap shrink-0 hover:bg-base hover:text-fg" onClick={alVolver}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Volver
          </button>
          <h1 className="text-[22px] font-bold text-fg m-0">Información de Pago</h1>
        </div>
        <div className="text-center py-20 px-5">
          <div className="text-[60px] mb-4">🛒</div>
          <h3 className="text-xl font-bold text-fg m-0 mb-2">Tu carrito está vacío</h3>
          <p className="text-sm text-muted m-0 mb-6">Agrega aplicaciones desde el catálogo para continuar.</p>
          <button className="bg-brand text-white border-0 rounded-xl py-3 px-7 text-sm font-semibold cursor-pointer transition-colors hover:bg-brand-alt" onClick={alVolver}>Ver catálogo</button>
        </div>
      </div>
    );
  }

  if (showExito && exitoData) {
    return <PantallaExito data={exitoData} onIrMisApps={handleIrMisApps} />;
  }

  return (
    <div className="max-w-[980px] mx-auto pb-12">

      {/* ── Header ── */}
      <div className="flex items-center gap-3.5 mb-7">
        <button className="flex items-center gap-1.5 bg-transparent border-0 text-muted text-sm font-medium cursor-pointer py-[7px] px-3 rounded-lg transition-colors whitespace-nowrap shrink-0 hover:bg-base hover:text-fg" onClick={alVolver}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Volver
        </button>
        <h1 className="text-[22px] font-bold text-fg m-0">Información de Pago</h1>
      </div>

      {/* ── Body ── */}
      <div className="grid grid-cols-[1fr_300px] gap-6 items-start max-[860px]:grid-cols-1">

        {/* ══ COLUMNA IZQUIERDA ══ */}
        <div className="flex flex-col gap-3.5 max-[860px]:order-1">

          {/* STEP 1 — Datos de la Tarjeta */}
          <div className={cardCls}>
            <div className="flex items-start gap-3.5 mb-5">
              <StepNumber n={1} />
              <div>
                <h2 className="text-[15px] font-bold text-fg m-0 mb-[3px] leading-[1.3]">Datos de la Tarjeta</h2>
                <p className="text-xs text-muted m-0 leading-[1.4]">Tu Tarjeta se guarda de forma segura. El cobro es recurrente mensual por adelantado</p>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 mb-3.5">
              <label className={labelCls}>Numero de la Tarjeta</label>
              <input className={inputCls} type="text" placeholder="1234 5678 9012 3456" value={tarjeta} onChange={(e) => setTarjeta(formatTarjeta(e.target.value))} maxLength={19} />
            </div>
            <div className="grid grid-cols-2 gap-3.5 mb-3.5 max-md:grid-cols-1">
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Fecha de Vencimiento</label>
                <input className={inputCls} type="text" placeholder="MM/AA" value={vencimiento} onChange={(e) => setVencimiento(formatVenc(e.target.value))} maxLength={5} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>CVV</label>
                <input className={inputCls} type="text" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))} maxLength={4} />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Nombre del Propietario</label>
              <input className={inputCls} type="text" placeholder="Como aparece en tu tarjeta" value={propietario} onChange={(e) => setPropietario(e.target.value)} />
            </div>
          </div>

          {/* Aviso renovación */}
          <div className="flex items-start gap-2.5 bg-base border border-line rounded-xl px-4 py-3 text-[13px] text-muted leading-[1.55]">
            <InfoIcon />
            <span>
              Tu suscripción se renovará automáticamente el {fechaCobroStr}. Se te cobrará S/{totalMensual.toLocaleString()}/mes + impuestos.
            </span>
          </div>

          {/* STEP 2 — Datos de Facturación */}
          <div className={cardCls}>
            <div className="flex items-start gap-3.5 mb-5">
              <StepNumber n={2} />
              <div>
                <h2 className="text-[15px] font-bold text-fg m-0 mb-[3px] leading-[1.3]">Datos de Facturación</h2>
                <p className="text-xs text-muted m-0 leading-[1.4]">Se usarán para emitir tu comprobante electrónico</p>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 mb-3.5">
              <label className={labelCls}>RUC / DNI</label>
              <input className={inputCls} type="text" placeholder="Ej: 20123456789" value={ruc} onChange={(e) => setRuc(e.target.value.replace(/\D/g, "").slice(0, 11))} />
            </div>
            <div className="flex flex-col gap-1.5 mb-3.5">
              <label className={labelCls}>Razón Social / Nombre Completo</label>
              <input className={inputCls} type="text" placeholder="Ej: Inversiones Digitales S.A.C" value={razonSocial} onChange={(e) => setRazonSocial(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5 mb-3.5">
              <label className={labelCls}>País o Región</label>
              <div className="relative">
                <select className="border-[1.5px] border-line rounded-lg py-[10px] pr-9 pl-[13px] text-sm text-fg bg-surface outline-none transition-colors w-full box-border appearance-none cursor-pointer focus:border-brand" value={pais} onChange={(e) => setPais(e.target.value)}>
                  <option>Peru</option><option>Colombia</option><option>Ecuador</option>
                  <option>Bolivia</option><option>Chile</option><option>Argentina</option>
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 mb-3.5">
              <label className={labelCls}>Dirección Fiscal</label>
              <input className={inputCls} type="text" placeholder="Ej: Av. La Marina 2000, San Miguel, Lima" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5 mb-3.5">
              <label className={labelCls}>Correo Electrónico <span className="text-red-500">*</span></label>
              <input className={inputCls} type="email" placeholder="correo@tuempresa.com" value={correo} onChange={(e) => setCorreo(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Número de Celular</label>
              <div className="flex">
                <div className="bg-base border-[1.5px] border-r-0 border-line rounded-l-lg py-[10px] px-3 text-sm font-medium text-fg whitespace-nowrap shrink-0 leading-[1.25]">
                  {PREFIJOS[pais] || "+51"}
                </div>
                <input className="border-[1.5px] border-line rounded-r-lg py-[10px] px-[13px] text-sm text-fg bg-surface outline-none transition-colors w-full box-border focus:border-brand placeholder:text-subtle" type="text" placeholder="987 654 321" value={celular} onChange={(e) => setCelular(e.target.value.replace(/\D/g, "").slice(0, 9))} />
              </div>
            </div>
            <div className="bg-base border border-line rounded-xl p-[14px_16px] mt-4">
              <h4 className="text-[13px] font-semibold text-fg m-0 mb-2.5">Canales Adicionales de Notificación</h4>
              <label className="flex items-start gap-2.5 py-[9px] cursor-pointer border-b border-line">
                <input className="mt-0.5 w-4 h-4 shrink-0 accent-brand cursor-pointer" type="checkbox" checked={notifWhatsapp} onChange={(e) => setNotifWhatsapp(e.target.checked)} />
                <div>
                  <span className="block text-[13px] font-semibold text-fg">WhatsApp</span>
                  <span className="block text-xs text-muted mt-px">Recibe tus comprobantes por WhatsApp</span>
                </div>
              </label>
              <label className="flex items-start gap-2.5 py-[9px] cursor-pointer">
                <input className="mt-0.5 w-4 h-4 shrink-0 accent-brand cursor-pointer" type="checkbox" checked={notifSms} onChange={(e) => setNotifSms(e.target.checked)} />
                <div>
                  <span className="block text-[13px] font-semibold text-fg">SMS / Teléfono</span>
                  <span className="block text-xs text-muted mt-px">Avisos de cobro y renovación por mensaje</span>
                </div>
              </label>
            </div>
          </div>

          {/* SUPER VIP — Upsell */}
          <div className={`bg-[#0f172a] border-2 rounded-[14px] p-[22px] text-white transition-all ${vipSeleccionado ? "border-violet-700 shadow-[0_0_0_1px_#7C3AED,0_4px_24px_rgba(124,58,237,0.25)] -translate-y-px" : "border-[#1e293b]"}`}>
            <div className="mb-[18px]">
              <div className="inline-block bg-white/20 text-white text-[10px] font-bold tracking-[1px] py-[3px] px-2.5 rounded-full mb-2.5">SERVICIO ADICIONAL</div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[22px]">⭐</span>
                <h2 className="text-[28px] font-black text-white m-0 tracking-[-0.5px]">Super VIP</h2>
                <span className="text-[11px] text-slate-400 bg-[#1e293b] border border-[#334155] rounded-full py-0.5 px-2.5 font-medium whitespace-nowrap">+ Almacenamiento</span>
              </div>
              <p className="text-[13px] text-white/85 m-0">Soporte Preferencial · Infraestructura dedicada</p>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-[18px] max-[600px]:grid-cols-1">
              {VIP_BENEFICIOS.map((b) => (
                <div key={b.n} className="flex gap-2 items-start rounded-lg p-[8px_10px]">
                  <span className="text-[11px] font-extrabold text-slate-400 shrink-0 pt-px">{b.n}</span>
                  <div>
                    <span className="text-xs font-bold text-fg">{b.titulo}:</span>
                    <span className="text-[11px] text-cyan-500"> {b.desc}</span>
                  </div>
                </div>
              ))}
              <div className="col-span-2 text-center text-xs font-semibold text-slate-400 bg-[#1e293b] border border-[#334155] rounded-lg p-[8px_12px] max-[600px]:col-span-1">
                Actualizaciones: SUNAT y SIRE · Tráfico independiente de información
              </div>
            </div>

            <label className={`flex items-start gap-3 border-2 rounded-xl p-[14px] cursor-pointer transition-all ${vipSeleccionado ? "bg-brand/[0.12] border-brand" : "bg-[#1e293b] border-[#334155] hover:bg-[#243347] hover:border-brand"}`}>
              <input className="w-[18px] h-[18px] shrink-0 mt-0.5 accent-violet-700 cursor-pointer" type="checkbox" checked={vipSeleccionado} onChange={(e) => setVipSeleccionado(e.target.checked)} />
              <div>
                <div className="text-sm font-bold text-white mb-1">Agregar Super VIP a mi plan</div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-white/60 line-through">Antes S/{VIP_PRECIO_ANTES.toLocaleString()}</span>
                  <span className="text-lg font-extrabold text-white">S/{VIP_PRECIO}/mes</span>
                  <span className="text-[11px] font-bold py-0.5 px-[9px] rounded-full whitespace-nowrap bg-[#FDE047] text-[#713f12]">50% OFF</span>
                  <span className="text-[11px] font-bold py-0.5 px-[9px] rounded-full whitespace-nowrap bg-red-500 text-white">Cupos limitados</span>
                </div>
              </div>
            </label>
          </div>

          {/* STEP 3 — Cuando se emiten tus Facturas */}
          <div className={cardCls}>
            <div className="flex items-start gap-3.5 mb-5">
              <StepNumber n={3} />
              <div>
                <h2 className="text-[15px] font-bold text-fg m-0 mb-[3px] leading-[1.3]">Cuando se emiten tus Facturas?</h2>
                <p className="text-xs text-muted m-0 leading-[1.4]">Conoce exactamente tu calendario - todo pago es por adelantado</p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-start gap-3.5">
                <div className="w-2.5 h-2.5 rounded-full bg-brand shrink-0 mt-1" />
                <div className="flex-1 pb-1">
                  <span className="block text-[13px] font-semibold text-fg">Hoy-Activación</span>
                  <span className="block text-xs text-muted mt-0.5">Se registra tu tarjeta y empieza el periodo de prueba</span>
                </div>
                <span className="text-[13px] font-semibold text-fg whitespace-nowrap pt-0.5">S/0.00 sin Cobro</span>
              </div>
              <div className="w-2.5 min-h-5 border-l-2 border-dashed border-line ml-1" />
              <div className="flex items-start gap-3.5">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-300 shrink-0 mt-1" />
                <div className="flex-1 pb-1">
                  <span className="block text-[13px] font-semibold text-fg">{fechaCobroStr} — Primer cobro real</span>
                  <span className="block text-xs text-muted mt-0.5">Primer cobro mensual al vencer el trial de 30 días</span>
                </div>
                <span className="text-[13px] font-semibold text-fg whitespace-nowrap pt-0.5">S/{totalMensual.toLocaleString()}</span>
              </div>
              <div className="w-2.5 min-h-5 border-l-2 border-dashed border-line ml-1" />
              <div className="flex items-start gap-3.5">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-300 shrink-0 mt-1" />
                <div className="flex-1 pb-1">
                  <span className="block text-[13px] font-semibold text-fg">Meses siguientes</span>
                  <span className="block text-xs text-muted mt-0.5">Mismo día cada mes. Cobro anticipado + aviso 3 días antes</span>
                </div>
                <span className="text-[13px] font-semibold text-fg whitespace-nowrap pt-0.5">Recurrente</span>
              </div>
            </div>
          </div>

          {/* STEP 4 — Autorización y Políticas */}
          <div className={cardCls}>
            <div className="flex items-start gap-3.5 mb-5">
              <StepNumber n={4} />
              <div>
                <h2 className="text-[15px] font-bold text-fg m-0 mb-[3px] leading-[1.3]">Autorización y Políticas</h2>
                <p className="text-xs text-muted m-0 leading-[1.4]">Confirmaciones de tu suscripción</p>
              </div>
            </div>
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input className="w-4 h-4 shrink-0 mt-0.5 accent-brand cursor-pointer" type="checkbox" checked={terminosAceptados} onChange={(e) => setTerminosAceptados(e.target.checked)} />
              <span className="text-[13px] text-muted leading-[1.6]">
                Acepto que Codeplex cobrará en mi tarjeta el importe indicado de forma recurrente mensualmente hasta que cancele el acuerdo con los términos. Puedo cancelar en cualquier momento desde Datos de Facturación.
              </span>
            </label>
          </div>

        </div>

        {/* ══ COLUMNA DERECHA: Resumen ══ */}
        <div className="pp-resumen-col sticky top-[84px] max-h-[calc(100vh-84px)] overflow-y-auto max-[1024px]:top-[124px] max-[1024px]:max-h-[calc(100vh-124px)] max-[860px]:static max-[860px]:order-2">
          <div className="bg-surface border-[1.5px] border-line rounded-[14px] p-[22px] shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-between gap-2 mb-4">
              <h3 className="text-base font-bold text-fg m-0">Resumen de Pedido</h3>
              {itemsCarrito.length > 0 && (
                <span className="text-[11px] font-bold bg-brand/10 text-brand py-[3px] px-2.5 rounded-full whitespace-nowrap">
                  {itemsCarrito.length} aplicacion{itemsCarrito.length !== 1 ? "es" : ""}
                </span>
              )}
            </div>

            {/* Items del carrito */}
            <div className="flex flex-col gap-2 mb-2">
              {itemsCarrito.map((item) => (
                <div key={item.cartId} className="flex items-center gap-2.5 p-[10px_12px] bg-base border border-line rounded-xl">
                  <CartItemIcon icono={item.icono} colorTema={item.colorTema} size={36} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[13px] font-semibold text-fg whitespace-nowrap overflow-hidden text-ellipsis">{item.appNombre}</span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[13px] font-bold text-fg">S/{item.precio}</span>
                        <button className="bg-transparent border-0 text-subtle text-base cursor-pointer px-0.5 leading-none transition-colors rounded hover:text-red-500 hover:bg-red-100" onClick={() => alQuitarDelCarrito?.(item.cartId)} title="Quitar del carrito">×</button>
                      </div>
                    </div>
                    <div className="text-[11px] text-violet-700 font-medium mt-0.5">
                      Plan {planNombreDisplay(item.planNombre)} · {item.periodoFacturacion || "mensual"}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ADD-ON VIP si está seleccionado */}
            {vipSeleccionado && (
              <div className="bg-brand/5 border border-brand/20 rounded-xl px-3 py-2.5 mb-3.5">
                <div className="text-[10px] font-bold tracking-[0.5px] text-brand uppercase mb-1.5">ADD-ON INCLUIDO:</div>
                <div className="flex items-center justify-between text-[13px] font-semibold text-fg">
                  <span>⭐ Super VIP</span>
                  <span className="font-bold text-teal-600">+S/{VIP_PRECIO}</span>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between items-center text-[13px] text-muted">
                <span>Período de Prueba</span>
                <span className="font-semibold text-green-600">1 mes gratis</span>
              </div>
              <div className="flex justify-between items-center text-[13px] text-muted">
                <span>Cobro Hoy</span>
                <span className="font-semibold text-fg">S/0.00</span>
              </div>
            </div>

            <div className="h-px bg-line my-4" />

            <div className="flex justify-between items-end mb-[18px]">
              <div>
                <div className="text-[13px] font-semibold text-fg">Total mensual:</div>
                <div className="text-[11px] text-subtle mt-[3px]">A partir del {fechaCobroStr}</div>
              </div>
              <div className="text-[28px] font-extrabold text-fg">S/{totalMensual.toLocaleString()}</div>
            </div>

            <button
              className="w-full flex items-center justify-center gap-2 bg-brand text-white border-0 rounded-xl py-[13px] text-sm font-semibold cursor-pointer transition-all enabled:hover:bg-brand-alt enabled:hover:-translate-y-px disabled:opacity-45 disabled:cursor-not-allowed"
              disabled={!terminosAceptados || itemsCarrito.length === 0}
              onClick={handleActivar}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              Activar Periodo de Prueba
            </button>

            <div className="text-center text-[11px] text-subtle mt-2.5 leading-[1.5]">
              🔒 Pago seguro · Tu tarjeta no se cobra hoy
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default PasarelaPago;
