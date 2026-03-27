import React, { useState } from "react";

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
  "Perú":    "+51",
  Colombia:  "+57",
  Ecuador:   "+593",
  Bolivia:   "+591",
  Chile:     "+56",
  Argentina: "+54",
};

/* ─── Número de paso (con estado completo) ─── */
function StepNumber({ n, completo }) {
  return (
    <div className={`w-7 h-7 rounded-full text-white text-[13px] font-bold flex items-center justify-center shrink-0 ${completo ? "bg-green-500" : "bg-violet-700"}`}>
      {completo ? "✓" : n}
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
    <div className="flex items-center justify-center min-h-[60vh] p-[40px_20px]">
      <div className="bg-white border-[1.5px] border-gray-200 rounded-[18px] p-[40px_36px_36px] max-w-[480px] w-full text-center shadow-[0_4px_24px_rgba(0,0,0,0.07)] [animation:pp-exito-in_0.35s_cubic-bezier(0.34,1.4,0.64,1)]">
        <div className="w-[72px] h-[72px] rounded-full bg-green-50 border-2 border-green-300 flex items-center justify-center mx-auto mb-5">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
            <path d="M8 19L15 26L30 11" stroke="#22C55E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="text-[22px] font-extrabold text-gray-900 m-0 mb-1.5">¡Aplicación Activada!</h2>
        <p className="text-sm text-gray-500 m-0 mb-6">Tu suscripción ha sido activada correctamente</p>

        <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden mb-6 text-left">
          <div className="flex justify-between items-center py-[11px] px-4 border-b border-gray-200 text-[13px]">
            <span className="text-gray-500 font-medium">Aplicación</span>
            <span className="font-semibold text-gray-700">GestiónPlex · Restaurante</span>
          </div>
          <div className="flex justify-between items-center py-[11px] px-4 border-b border-gray-200 text-[13px]">
            <span className="text-gray-500 font-medium">Plan</span>
            <span className="font-semibold text-gray-700">{data.planNombreDisplay}</span>
          </div>
          <div className="flex justify-between items-center py-[11px] px-4 border-b border-gray-200 text-[13px]">
            <span className="text-gray-500 font-medium">Cobro Hoy</span>
            <span className="font-semibold text-gray-700">S/0.00</span>
          </div>
          <div className="flex justify-between items-center py-[11px] px-4 border-b border-gray-200 text-[13px]">
            <span className="text-gray-500 font-medium">Primer Cobro</span>
            <span className="font-semibold text-gray-700">S/{data.precio} el {data.fechaCobroStr}</span>
          </div>
          <div className="flex justify-between items-center py-[11px] px-4 border-b border-gray-200 text-[13px]">
            <span className="text-gray-500 font-medium">Renovación</span>
            <span className="font-semibold text-gray-700">Automática {data.periodoFacturacion}</span>
          </div>
          <div className="flex justify-between items-center py-[11px] px-4 border-b border-gray-200 text-[13px]">
            <span className="text-gray-500 font-medium">Comprobantes a</span>
            <span className="font-semibold text-gray-700">Correo</span>
          </div>
          {data.ultimos4 && (
            <div className="flex justify-between items-center py-[11px] px-4 text-[13px]">
              <span className="text-gray-500 font-medium">Tarjeta</span>
              <span className="font-semibold text-gray-700">{data.marcaTarjeta} ••••{data.ultimos4}</span>
            </div>
          )}
        </div>

        <button
          className="w-full flex items-center justify-center gap-2 bg-violet-700 text-white border-0 rounded-xl py-3.5 text-[15px] font-semibold cursor-pointer transition-all hover:bg-violet-800 hover:-translate-y-px"
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
function VistaPasarelaPago({ planData, alVolver, alActivar }) {
  const [tarjeta, setTarjeta]             = useState("");
  const [vencimiento, setVencimiento]     = useState("");
  const [cvv, setCvv]                     = useState("");
  const [propietario, setPropietario]     = useState("");
  const [ruc, setRuc]                     = useState("");
  const [razonSocial, setRazonSocial]     = useState("");
  const [pais, setPais]                   = useState("Perú");
  const [direccion, setDireccion]         = useState("");
  const [correo, setCorreo]               = useState("");
  const [celular, setCelular]             = useState("");
  const [notifWhatsapp, setNotifWhatsapp] = useState(false);
  const [notifSms, setNotifSms]           = useState(false);
  const [terminosAceptados, setTerminosAceptados] = useState(false);
  const [showExito, setShowExito]         = useState(false);
  const [exitoData, setExitoData]         = useState(null);

  /* ── Datos del carrito o plan individual ── */
  const itemsCarrito       = planData?.itemsCarrito || [];
  const totalCarrito       = planData?.totalCarrito || planData?.precio || "150";
  const periodoFacturacion = planData?.periodoFacturacion || "mensual";
  const periodoLabel       = periodoFacturacion === "mensual" ? "/mes" : "/año";
  const planNombre         = planData?.planNombre || "basico";
  const planNombreDisplay  = { gratis: "Gratis", basico: "Básico", gold: "Gold" }[planNombre] || planNombre;

  /* ── Progresión de pasos ── */
  const paso1Completo   = tarjeta.length === 19 && vencimiento.length === 5 && cvv.length >= 3 && propietario.trim() !== "";
  const paso2Completo   = paso1Completo && ruc.trim() !== "" && razonSocial.trim() !== "" && correo.trim() !== "";
  const paso3Habilitado = paso2Completo;
  const paso4Habilitado = paso2Completo;

  /* Fechas */
  const hoy          = new Date();
  const primerCobro  = new Date(hoy);
  primerCobro.setMonth(primerCobro.getMonth() + 1);
  const fechaCobroStr  = formatFecha(primerCobro);
  const fechaInicioStr = formatFecha(hoy);

  const handleActivar = () => {
    const digits = tarjeta.replace(/\s/g, "");
    const data = {
      planNombre,
      planNombreDisplay,
      precio: totalCarrito,
      periodoFacturacion,
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

  const handleIrMisApps = () => {
    if (itemsCarrito.length > 0) {
      const appsActivadas = itemsCarrito.map((item, i) => ({
        ...item,
        ...exitoData,
        id:           Date.now() + i,
        appNombre:    item.nombre,
        appPublisher: item.publisher,
      }));
      alActivar?.(appsActivadas);
    } else {
      alActivar?.({
        ...exitoData,
        appNombre:    "GestiónPlex",
        appPublisher: "Restaurante",
      });
    }
  };

  if (showExito && exitoData) {
    return <PantallaExito data={exitoData} onIrMisApps={handleIrMisApps} />;
  }

  /* ── Clases reutilizables ── */
  const inputCls = "border-[1.5px] border-gray-200 rounded-lg py-[10px] px-[13px] text-sm text-gray-900 bg-white outline-none transition-colors w-full box-border focus:border-violet-700 placeholder:text-gray-400 dark:bg-[var(--background-color)] dark:border-gray-600 dark:text-[var(--text-primary)]";
  const cardCls  = "bg-white border-[1.5px] border-gray-200 rounded-[14px] px-6 py-[22px] dark:bg-[var(--background-color)] dark:border-gray-700";
  const cardBloqueadoCls = `${cardCls} opacity-[0.42] pointer-events-none select-none [filter:grayscale(0.3)]`;

  return (
    <div className="max-w-[980px] mx-auto pb-12">

      {/* ── Header ── */}
      <div className="flex items-center gap-3.5 mb-7">
        <button className="flex items-center gap-1.5 bg-transparent border-0 text-gray-500 text-sm font-medium cursor-pointer py-[7px] px-3 rounded-lg transition-colors whitespace-nowrap shrink-0 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700" onClick={alVolver}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Volver
        </button>
        <h1 className="text-[22px] font-bold text-gray-900 m-0">Información de Pago</h1>
      </div>

      {/* ── Body ── */}
      <div className="grid grid-cols-[1fr_300px] gap-6 items-start max-[860px]:grid-cols-1">

        {/* ══ COLUMNA IZQUIERDA: Formulario ══ */}
        <div className="flex flex-col gap-3.5 max-[860px]:order-1">

          {/* STEP 1 ── Datos de la Tarjeta */}
          <div className={cardCls}>
            <div className="flex items-start gap-3.5 mb-5">
              <StepNumber n={1} completo={paso1Completo} />
              <div>
                <h2 className="text-[15px] font-bold text-gray-900 m-0 mb-[3px] leading-[1.3]">Datos de la Tarjeta</h2>
                <p className="text-xs text-gray-500 m-0 leading-[1.4]">Tu Tarjeta se guarda de forma segura. El cobro es recurrente mensual por adelantado</p>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 mb-3.5">
              <label className="text-[13px] font-medium text-gray-700">Numero de la Tarjeta</label>
              <input className={inputCls} type="text" placeholder="1234 5678 9012 3456" value={tarjeta} onChange={(e) => setTarjeta(formatTarjeta(e.target.value))} maxLength={19} />
            </div>
            <div className="grid grid-cols-2 gap-3.5 mb-3.5 max-md:grid-cols-1">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-gray-700">Fecha de Vencimiento</label>
                <input className={inputCls} type="text" placeholder="MM/AA" value={vencimiento} onChange={(e) => setVencimiento(formatVenc(e.target.value))} maxLength={5} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-gray-700">CVV</label>
                <input className={inputCls} type="text" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))} maxLength={4} />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-gray-700">Nombre del Propietario</label>
              <input className={inputCls} type="text" placeholder="Como aparece en tu tarjeta" value={propietario} onChange={(e) => setPropietario(e.target.value)} />
            </div>
          </div>

          {/* Aviso renovación */}
          <div className="flex items-start gap-2.5 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[13px] text-gray-500 leading-[1.55] dark:bg-gray-800 dark:border-gray-700">
            <InfoIcon />
            <span>
              Tu suscripción se renovará automáticamente el {fechaCobroStr}. Se te cobrará S/{totalCarrito}{periodoLabel} + impuestos.
            </span>
          </div>

          {/* STEP 2 ── Datos de Facturación */}
          <div className={paso1Completo ? cardCls : cardBloqueadoCls}>
            <div className="flex items-start gap-3.5 mb-5">
              <StepNumber n={2} completo={paso2Completo} />
              <div>
                <h2 className="text-[15px] font-bold text-gray-900 m-0 mb-[3px] leading-[1.3]">Datos de Facturación</h2>
                <p className="text-xs text-gray-500 m-0 leading-[1.4]">Se usarán para emitir tu comprobante electrónico</p>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 mb-3.5">
              <label className="text-[13px] font-medium text-gray-700">RUC / DNI</label>
              <input className={inputCls} type="text" placeholder="Ej: 20123456789" value={ruc} onChange={(e) => setRuc(e.target.value.replace(/\D/g, "").slice(0, 11))} />
            </div>
            <div className="flex flex-col gap-1.5 mb-3.5">
              <label className="text-[13px] font-medium text-gray-700">Razón Social / Nombre Completo</label>
              <input className={inputCls} type="text" placeholder="Ej: Inversiones Digitales S.A.C" value={razonSocial} onChange={(e) => setRazonSocial(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5 mb-3.5">
              <label className="text-[13px] font-medium text-gray-700">País o Región</label>
              <div className="relative">
                <select className="border-[1.5px] border-gray-200 rounded-lg py-[10px] pr-9 pl-[13px] text-sm text-gray-900 bg-white outline-none transition-colors w-full box-border appearance-none cursor-pointer focus:border-violet-700 dark:bg-[var(--background-color)] dark:border-gray-600" value={pais} onChange={(e) => setPais(e.target.value)}>
                  <option>Perú</option><option>Colombia</option><option>Ecuador</option>
                  <option>Bolivia</option><option>Chile</option><option>Argentina</option>
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 mb-3.5">
              <label className="text-[13px] font-medium text-gray-700">Dirección Fiscal</label>
              <input className={inputCls} type="text" placeholder="Ej: Av. La Marina 2000, San Miguel, Lima" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5 mb-3.5">
              <label className="text-[13px] font-medium text-gray-700">Correo Electrónico <span className="text-red-500">*</span></label>
              <input className={inputCls} type="email" placeholder="correo@tuempresa.com" value={correo} onChange={(e) => setCorreo(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-gray-700">Número de Celular</label>
              <div className="flex">
                <div className="bg-gray-100 border-[1.5px] border-r-0 border-gray-200 rounded-l-lg py-[10px] px-3 text-sm font-medium text-gray-700 whitespace-nowrap shrink-0 leading-[1.25] dark:bg-gray-700 dark:border-gray-600">
                  {PREFIJOS[pais] || "+51"}
                </div>
                <input className="border-[1.5px] border-gray-200 rounded-r-lg py-[10px] px-[13px] text-sm text-gray-900 bg-white outline-none transition-colors w-full box-border focus:border-violet-700 placeholder:text-gray-400" type="text" placeholder="987 654 321" value={celular} onChange={(e) => setCelular(e.target.value.replace(/\D/g, "").slice(0, 9))} />
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-[14px_16px] mt-4 dark:bg-gray-800 dark:border-gray-700">
              <h4 className="text-[13px] font-semibold text-gray-700 m-0 mb-2.5">Canales Adicionales de Notificación</h4>
              <label className="flex items-start gap-2.5 py-[9px] cursor-pointer border-b border-gray-200 dark:border-gray-700">
                <input className="mt-0.5 w-4 h-4 shrink-0 accent-violet-700 cursor-pointer" type="checkbox" checked={notifWhatsapp} onChange={(e) => setNotifWhatsapp(e.target.checked)} />
                <div>
                  <span className="block text-[13px] font-semibold text-gray-700">WhatsApp</span>
                  <span className="block text-xs text-gray-500 mt-px">Recibe tus comprobantes por WhatsApp</span>
                </div>
              </label>
              <label className="flex items-start gap-2.5 py-[9px] cursor-pointer">
                <input className="mt-0.5 w-4 h-4 shrink-0 accent-violet-700 cursor-pointer" type="checkbox" checked={notifSms} onChange={(e) => setNotifSms(e.target.checked)} />
                <div>
                  <span className="block text-[13px] font-semibold text-gray-700">SMS / Teléfono</span>
                  <span className="block text-xs text-gray-500 mt-px">Avisos de cobro y renovación por mensaje</span>
                </div>
              </label>
            </div>
          </div>

          {/* STEP 3 ── Cuando se emiten tus Facturas */}
          <div className={paso3Habilitado ? cardCls : cardBloqueadoCls}>
            <div className="flex items-start gap-3.5 mb-5">
              <StepNumber n={3} />
              <div>
                <h2 className="text-[15px] font-bold text-gray-900 m-0 mb-[3px] leading-[1.3]">Cuando se emiten tus Facturas?</h2>
                <p className="text-xs text-gray-500 m-0 leading-[1.4]">Conoce exactamente tu calendario - todo pago es por adelantado</p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-start gap-3.5">
                <div className="w-2.5 h-2.5 rounded-full bg-violet-700 shrink-0 mt-1" />
                <div className="flex-1 pb-1">
                  <span className="block text-[13px] font-semibold text-gray-700">Hoy-Activación</span>
                  <span className="block text-xs text-gray-500 mt-0.5">Se registra tu tarjeta y empieza el periodo de prueba</span>
                </div>
                <span className="text-[13px] font-semibold text-gray-700 whitespace-nowrap pt-0.5">S/0.00 sin Cobro</span>
              </div>
              <div className="w-2.5 min-h-5 border-l-2 border-dashed border-gray-200 ml-1" />
              <div className="flex items-start gap-3.5">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-300 shrink-0 mt-1" />
                <div className="flex-1 pb-1">
                  <span className="block text-[13px] font-semibold text-gray-700">{fechaCobroStr} — Primer cobro real</span>
                  <span className="block text-xs text-gray-500 mt-0.5">Primer cobro mensual al vencer el trial de 30 días</span>
                </div>
                <span className="text-[13px] font-semibold text-gray-700 whitespace-nowrap pt-0.5">S/{totalCarrito}</span>
              </div>
              <div className="w-2.5 min-h-5 border-l-2 border-dashed border-gray-200 ml-1" />
              <div className="flex items-start gap-3.5">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-300 shrink-0 mt-1" />
                <div className="flex-1 pb-1">
                  <span className="block text-[13px] font-semibold text-gray-700">Meses siguientes</span>
                  <span className="block text-xs text-gray-500 mt-0.5">Mismo día cada mes. Cobro anticipado + aviso 3 días antes</span>
                </div>
                <span className="text-[13px] font-semibold text-gray-700 whitespace-nowrap pt-0.5">Recurrente</span>
              </div>
            </div>
          </div>

          {/* STEP 4 ── Autorización y Políticas */}
          <div className={paso4Habilitado ? cardCls : cardBloqueadoCls}>
            <div className="flex items-start gap-3.5 mb-5">
              <StepNumber n={4} />
              <div>
                <h2 className="text-[15px] font-bold text-gray-900 m-0 mb-[3px] leading-[1.3]">Autorización y Políticas</h2>
                <p className="text-xs text-gray-500 m-0 leading-[1.4]">Confirmaciones de tu suscripción</p>
              </div>
            </div>
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input className="w-4 h-4 shrink-0 mt-0.5 accent-violet-700 cursor-pointer" type="checkbox" checked={terminosAceptados} onChange={(e) => setTerminosAceptados(e.target.checked)} />
              <span className="text-[13px] text-gray-500 leading-[1.6]">
                Acepto que Codeplex cobrará en mi tarjeta el importe indicado de forma recurrente mensualmente hasta que cancele el acuerdo con los términos. Puedo cancelar en cualquier momento desde Datos de Facturación.
              </span>
            </label>
          </div>

        </div>

        {/* ══ COLUMNA DERECHA: Resumen ══ */}
        <div className="pp-resumen-col sticky top-[84px] max-h-[calc(100vh-84px)] overflow-y-auto max-[1024px]:top-[124px] max-[1024px]:max-h-[calc(100vh-124px)] max-[860px]:static max-[860px]:order-2">
          <div className="bg-white border-[1.5px] border-gray-200 rounded-[14px] p-[22px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:bg-[var(--background-color)] dark:border-gray-700">
            <h3 className="text-base font-bold text-gray-900 m-0 mb-4">Resumen de Pedido</h3>

            {/* App */}
            {itemsCarrito.length > 0 ? (
              itemsCarrito.map((item) => (
                <div key={item.id} className="flex items-center gap-3 pb-4 border-b border-gray-100 mb-4">
                  <div>
                    <div className="text-[15px] font-bold text-gray-900">{item.nombre}</div>
                    <div className="text-xs text-gray-500">Desde {item.precioDesde}/mes</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 mb-4">
                <IconoRestauranteSmall />
                <div>
                  <div className="text-[15px] font-bold text-gray-900">GestiónPlex</div>
                  <div className="text-xs text-gray-500">Restaurante</div>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between items-center text-[13px] text-gray-500">
                <span>Período de Prueba</span>
                <span className="font-semibold text-green-600">1 mes gratis</span>
              </div>
              <div className="flex justify-between items-center text-[13px] text-gray-500">
                <span>Cobro Hoy</span>
                <span className="font-semibold text-gray-700">S/0.00</span>
              </div>
            </div>

            <div className="h-px bg-gray-200 my-4" />

            <div className="flex justify-between items-end mb-[18px]">
              <div>
                <div className="text-[13px] font-semibold text-gray-700">Total {periodoFacturacion}:</div>
                <div className="text-[11px] text-gray-400 mt-[3px]">A partir del {fechaCobroStr}</div>
              </div>
              <div className="text-[28px] font-extrabold text-gray-900">S/{totalCarrito}</div>
            </div>

            <button
              className="w-full flex items-center justify-center gap-2 bg-violet-700 text-white border-0 rounded-xl py-[13px] text-sm font-semibold cursor-pointer transition-all enabled:hover:bg-violet-800 enabled:hover:-translate-y-px disabled:opacity-45 disabled:cursor-not-allowed"
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

export default VistaPasarelaPago;
