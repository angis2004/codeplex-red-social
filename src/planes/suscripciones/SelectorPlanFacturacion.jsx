import React, { useState, useRef, useEffect } from "react";
import VisorCatalogoPDF from "../../compartido/visor-catalogo/VisorCatalogoPDF";
import {
  PRECIOS_FACTURACION,
  PAQUETES_COMPROBANTES,
  FEATURES_FACTURACION,
  PLANES_FACTURACION,
  CHATBOT_PREGUNTAS_FACTURACION,
  CHATBOT_RESPUESTAS_FACTURACION,
  CHATBOT_BIENVENIDA_FACTURACION,
} from "./facturacion.data";


/* ═══════════════════════════════════════════
   ÍCONOS
═══════════════════════════════════════════ */
function IconoFacturacion({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#0D9488" />
      <rect x="9"  y="28" width="6"  height="12" rx="2" fill="white" />
      <rect x="21" y="18" width="6"  height="22" rx="2" fill="#99F6E4" />
      <rect x="33" y="10" width="6"  height="30" rx="2" fill="white" />
      <path d="M12 20 L24 12 L36 5" stroke="#99F6E4" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 2" />
    </svg>
  );
}

function IconoCheck({ dark = false }) {
  const bg    = dark ? "rgba(255,255,255,0.2)" : "#CCFBF1";
  const color = dark ? "#fff" : "#0D9488";
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="7.5" cy="7.5" r="7.5" fill={bg} />
      <path d="M4.5 7.5L6.5 9.5L10.5 5.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconoPdf() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect width="36" height="36" rx="8" fill="#CCFBF1" />
      <path d="M10 8h12l6 6v18H10V8z" fill="#0D9488" />
      <path d="M22 8l6 6h-6V8z" fill="#134E4A" />
      <text x="13" y="26" fontSize="7" fill="white" fontWeight="bold">PDF</text>
    </svg>
  );
}

function IconoPaquete() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
    </svg>
  );
}


/* ═══════════════════════════════════════════
   POPOVER DETALLE DE FEATURE
═══════════════════════════════════════════ */
function PopoverDetalleFeature({ nombreFeature, onCerrar }) {
  const info = FEATURES_FACTURACION[nombreFeature];
  if (!info) return null;

  return (
    <div
      className="absolute inset-0 z-[60] bg-black/30 flex items-center justify-center p-5 rounded-[22px] [animation:modal-fade_0.18s_ease]"
      onClick={onCerrar}
    >
      <div
        className="bg-[var(--surface-color)] rounded-[14px] p-[22px_20px_18px] max-w-[300px] w-full relative shadow-[0_8px_36px_rgba(0,0,0,0.18)] [animation:modal-slide_0.22s_cubic-bezier(0.34,1.4,0.64,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-[10px] right-[10px] w-[22px] h-[22px] rounded-full bg-[#F3F4F6] border-none cursor-pointer flex items-center justify-center transition-colors duration-150 hover:bg-[#E5E7EB] outline-none focus:outline-none"
          onClick={onCerrar}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 2L8 8M8 2L2 8" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
        <h4 className="text-[14px] font-bold text-[#0D9488] m-0 mb-2 pr-5">{info.titulo}</h4>
        <p className="text-[12.5px] text-[#4B5563] leading-[1.6] m-0">{info.desc}</p>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════
   PANEL PAQUETES ADICIONALES
═══════════════════════════════════════════ */
function PanelPaquetes({ onCerrar }) {
  return (
    <div
      className="absolute inset-0 z-50 bg-black/35 flex items-center justify-center p-5 [animation:modal-fade_0.2s_ease] rounded-[22px]"
      onClick={onCerrar}
    >
      <div
        className="bg-[var(--surface-color)] rounded-[18px] p-[28px_24px_24px] w-full max-w-[340px] max-h-[80%] overflow-y-auto relative shadow-[0_12px_50px_rgba(0,0,0,0.22)] [animation:modal-slide_0.24s_cubic-bezier(0.34,1.4,0.64,1)] [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-thumb]:bg-[#E5E7EB] [&::-webkit-scrollbar-thumb]:rounded-[99px] max-[760px]:max-w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 w-[26px] h-[26px] rounded-full bg-[#F3F4F6] border-none cursor-pointer flex items-center justify-center transition-colors duration-150 hover:bg-[#E5E7EB] outline-none focus:outline-none"
          onClick={onCerrar}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 2L10 10M10 2L2 10" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <h3 className="text-[18px] font-extrabold text-[#1C1917] m-0 mb-[4px]">Paquetes Adicionales</h3>
        <p className="text-[12.5px] text-[#6B7280] m-0 mb-4 leading-[1.4]">
          Al superar los 2,000 comprobantes electrónicos en el plan
        </p>

        <div className="flex flex-col gap-2 mb-4">
          {PAQUETES_COMPROBANTES.map((p, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-[10px] border-[1.5px] border-[#E5E7EB] rounded-[10px] px-[14px] py-[10px] transition-[border-color] duration-150 hover:border-[#99F6E4]"
            >
              <div>
                <div className="text-[13px] font-semibold text-[#1C1917]">{p.rango}</div>
                <div className="text-[11px] text-[#6B7280] mt-[2px]">{p.tarifa}</div>
              </div>
              <div className="text-[15px] font-extrabold text-[#0D9488] whitespace-nowrap">{p.total}</div>
            </div>
          ))}
        </div>

        <div className="bg-[#134E4A] rounded-[12px] p-4 flex flex-col gap-3">
          <div className="text-[14px] font-bold text-white mb-[6px]">Base de datos privada</div>
          <ul className="list-none p-0 m-0 flex flex-col gap-[5px]">
            {[
              "Alojamiento exclusivo de la información de tus clientes",
              "Mayor velocidad y tiempo de respuesta",
              "Canal directo a RENIEC y SUNAT",
            ].map((item, i) => (
              <li key={i} className="text-[12px] text-white/85 pl-[14px] relative leading-[1.4]">
                <span className="absolute left-0 text-[#99F6E4] text-[16px] leading-[1.1]">·</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between border-t border-white/15 pt-3 mt-[4px]">
            <span className="text-[12px] text-white/70">Pago único</span>
            <span className="text-[16px] font-extrabold text-white">S/1,000.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════
   COMPONENTE PRINCIPAL
═══════════════════════════════════════════ */
function SelectorPlanFacturacion({ estaAbierto, alCerrar, alProcederPago }) {

  const [periodoFacturacion, setPeriodoFacturacion] = useState("mensual");
  const [planSeleccionado,   setPlanSeleccionado]   = useState(null);
  const [paquetesVisible,    setPaquetesVisible]    = useState(false);
  const [featureAbierta,     setFeatureAbierta]     = useState(null);
  const [chatVisible,        setChatVisible]        = useState(false);
  const [visorPdf,           setVisorPdf]           = useState(null);

  const [mensajesChat, setMensajesChat] = useState([CHATBOT_BIENVENIDA_FACTURACION]);
  const [inputChat,    setInputChat]    = useState("");
  const refFinChat = useRef(null);

  /* ── Drag-scroll en el scroll horizontal de planes ── */
  const refPlanesScroll = useRef(null);
  const dragScroll = useRef({ activo: false, startX: 0, scrollLeft: 0 });
  const handlePlanesMouseDown = (e) => {
    dragScroll.current = { activo: true, startX: e.pageX - refPlanesScroll.current.offsetLeft, scrollLeft: refPlanesScroll.current.scrollLeft };
  };
  const handlePlanesMouseMove = (e) => {
    if (!dragScroll.current.activo) return;
    e.preventDefault();
    const x = e.pageX - refPlanesScroll.current.offsetLeft;
    refPlanesScroll.current.scrollLeft = dragScroll.current.scrollLeft - (x - dragScroll.current.startX);
  };
  const handlePlanesMouseUp = () => { dragScroll.current.activo = false; };

  useEffect(() => {
    if (chatVisible) refFinChat.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajesChat, chatVisible]);

  const handleClose = () => {
    setPlanSeleccionado(null);
    setPaquetesVisible(false);
    setFeatureAbierta(null);
    setChatVisible(false);
    setMensajesChat([CHATBOT_BIENVENIDA_FACTURACION]);
    alCerrar();
  };

  if (!estaAbierto) return null;

  const handleClickOverlay = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const labelPeriodo = periodoFacturacion === "mensual" ? "/mes" : "/año";

  const handleConfirmarPlan = () => {
    const precio = PRECIOS_FACTURACION[planSeleccionado][periodoFacturacion].replace(",", "");
    const plan   = PLANES_FACTURACION.find((p) => p.key === planSeleccionado);
    alProcederPago?.({ planNombre: plan?.nombre, precio, billing: periodoFacturacion });
  };

  const handleEnviarChat = (texto) => {
    if (!texto.trim()) return;
    const hora = new Date().toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });
    setMensajesChat((prev) => [...prev, { tipo: "usuario", texto, hora }]);
    setInputChat("");
    setTimeout(() => {
      const resp = CHATBOT_RESPUESTAS_FACTURACION[texto] ||
        "Gracias por tu consulta. Un asesor te contactará pronto para brindarte más información.";
      setMensajesChat((prev) => [...prev, { tipo: "bot", texto: resp, hora }]);
    }, 800);
  };

  const nombrePlanDisplay = PLANES_FACTURACION.find((p) => p.key === planSeleccionado)?.nombre ?? "";

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[rgba(6,30,30,0.55)] backdrop-blur-[6px] flex items-center justify-center p-4 [animation:modal-fade_0.22s_ease]"
      onClick={handleClickOverlay}
    >
      <div className="bg-[#F0FDFA] rounded-[22px] w-full max-w-[1100px] max-h-[90vh] overflow-hidden relative flex flex-col [animation:modal-slide_0.28s_cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_24px_80px_rgba(0,0,0,0.22)] max-[760px]:max-h-[92vh] max-[760px]:rounded-[20px]">

        {/* Cerrar */}
        <button
          className="absolute top-[14px] right-[14px] z-10 w-[30px] h-[30px] rounded-full bg-[#0D9488] border-none cursor-pointer flex items-center justify-center transition-[background,transform] duration-[0.18s] hover:bg-[#0B7A6E] hover:scale-110 outline-none focus:outline-none"
          onClick={handleClose}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2L12 12M12 2L2 12" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Body */}
        <div className="relative flex-1 min-h-0 overflow-hidden flex flex-col">
          <div className={`flex-1 min-h-0 overflow-y-auto [-webkit-overflow-scrolling:touch] p-[20px_28px_80px] box-border relative z-[1] [scrollbar-width:thin] [scrollbar-color:#99F6E4_transparent] [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-thumb]:bg-[#99F6E4] [&::-webkit-scrollbar-thumb]:rounded-[99px] max-[760px]:p-[16px_14px_96px]`}>

            {/* Volver */}
            <button
              className="inline-flex items-center gap-[6px] bg-none border-none text-[13px] font-semibold text-[#374151] cursor-pointer px-2 py-[4px] rounded-[8px] mb-[6px] transition-colors duration-150 hover:bg-black/[0.06] outline-none focus:outline-none"
              onClick={handleClose}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Volver
            </button>

            {/* Header — ícono + título en fila */}
            <div className="flex flex-col items-center text-center gap-[6px] mb-5">
              <div className="flex items-center gap-3">
                <IconoFacturacion size={44} />
                <h2 className="text-[22px] font-extrabold text-[#1C1917] m-0 max-[760px]:text-[19px]">Facturación Electrónica</h2>
              </div>
              <p className="text-[13.5px] text-[#6B7280] m-0">
                Software empresarial, elige el plan perfecto para ti&nbsp; con hasta 2,000 comprobantes
              </p>

              <div className="flex gap-2 flex-wrap justify-center mt-[2px]">
                {["1 mes gratis", "IGV incluido", "Multiusuario", "Actualizaciones"].map((b) => (
                  <span key={b} className="border-[1.5px] border-[#99F6E4] rounded-[20px] px-[14px] py-[4px] text-[12px] font-medium text-[#0F766E] bg-[var(--surface-color)]">{b}</span>
                ))}
              </div>

              <div className="inline-flex bg-[#F3F4F6] rounded-[10px] p-[4px] gap-[4px] mt-[4px]">
                {["mensual", "anual"].map((p) => (
                  <button
                    key={p}
                    className={`px-6 py-2 rounded-[8px] border-none text-[13.5px] font-semibold cursor-pointer transition-all duration-[0.18s] outline-none focus:outline-none ${periodoFacturacion === p ? "bg-[#134E4A] text-white shadow-[0_2px_8px_rgba(19,78,74,0.35)]" : "bg-transparent text-[#6B7280]"}`}
                    onClick={() => setPeriodoFacturacion(p)}
                  >
                    {p === "mensual" ? "Mensual" : "Anual"}
                  </button>
                ))}
              </div>
            </div>

            {/* Scroll de planes */}
            <div className="relative">
              <div
                className="flex overflow-x-auto gap-[14px] pb-[10px] [-webkit-overflow-scrolling:touch] cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:h-[5px] [&::-webkit-scrollbar-thumb]:bg-[#99F6E4] [&::-webkit-scrollbar-thumb]:rounded-[99px] md:justify-center"
                ref={refPlanesScroll}
                onMouseDown={handlePlanesMouseDown}
                onMouseMove={handlePlanesMouseMove}
                onMouseUp={handlePlanesMouseUp}
                onMouseLeave={handlePlanesMouseUp}
              >

                {PLANES_FACTURACION.map((plan) => {
                  const isSelected = planSeleccionado === plan.key;

                  return (
                    <div
                      key={plan.key}
                      className={[
                        "flex-[0_0_220px] min-w-[220px] border-[1.5px] rounded-[16px] p-[20px_16px_18px] flex flex-col gap-3 transition-[box-shadow,border-color] duration-[0.18s] relative hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] max-[760px]:flex-[0_0_200px] max-[760px]:min-w-[200px]",
                        plan.dark
                          ? "bg-[#134E4A] border-[#134E4A] pt-[42px]"
                          : "bg-[var(--surface-color)] border-[#E5E7EB]",
                        plan.dark && isSelected
                          ? "!border-white/55 shadow-[0_4px_20px_rgba(0,0,0,0.22)]"
                          : "",
                        !plan.dark && isSelected
                          ? "!border-2 !border-[#0D9488] shadow-[0_4px_20px_rgba(13,148,136,0.18)]"
                          : "",
                        !plan.dark && plan.badge && !isSelected
                          ? "pt-[42px]"
                          : "",
                      ].filter(Boolean).join(" ")}
                    >

                      {plan.badge && (
                        <div className={`absolute top-[-1px] left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-[1px] px-[18px] py-[6px] rounded-b-[12px] whitespace-nowrap text-white ${plan.dark ? "bg-[#0D9488]" : "bg-[#374151]"}`}>
                          {plan.badge}
                        </div>
                      )}

                      <h3 className={`text-[17px] font-bold m-0 ${plan.dark ? "text-white" : "text-[#0D9488]"}`}>
                        {plan.nombre}
                      </h3>

                      <div className={`flex items-baseline gap-[2px] ${plan.dark ? "text-white" : "text-[#1C1917]"}`}>
                        <span className="text-[18px] font-bold">s/</span>
                        <span className="text-[34px] font-extrabold leading-none max-[760px]:text-[28px]">{PRECIOS_FACTURACION[plan.key][periodoFacturacion]}</span>
                        <span className="text-[12px] font-medium opacity-70">{labelPeriodo}</span>
                      </div>

                      <div className="flex flex-wrap gap-[6px]">
                        <span className={`text-[11px] font-semibold px-[10px] py-[3px] rounded-[20px] ${plan.dark ? "border-[1.5px] border-white/55 text-white bg-transparent" : "border-[1.5px] border-[#99F6E4] text-[#0F766E] bg-transparent"}`}>
                          {plan.sede}
                        </span>
                      </div>

                      <ul className="list-none p-0 m-0 flex flex-col gap-[7px] flex-1">
                        {plan.features.map((f) => (
                          <li
                            key={f}
                            className={`flex items-start gap-[6px] text-[12px] leading-[1.4] cursor-pointer ${plan.dark ? "text-white/90 hover:[&>span]:text-[#99F6E4]" : "text-[#374151] hover:[&>span]:text-[#0D9488]"}`}
                            onClick={() => setFeatureAbierta(f)}
                          >
                            <IconoCheck dark={plan.dark} />
                            <span>{plan.dark ? <u>{f}</u> : f}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Ver paquetes */}
                      <button
                        className={[
                          "flex items-center gap-[5px] px-[10px] py-[7px] rounded-[8px] text-[11.5px] font-semibold cursor-pointer text-left transition-[border-color,background,color] duration-[0.18s] w-full outline-none focus:outline-none",
                          plan.dark
                            ? "bg-white/[0.08] border-[1.5px] border-white/30 text-white/90 hover:bg-white/[0.14] hover:border-white/60"
                            : "border-[1.5px] border-dashed border-[#99F6E4] bg-[#F0FDFA] text-[#0D9488] hover:border-[#0D9488] hover:bg-[#CCFBF1] hover:text-[#0B7A6E]",
                        ].join(" ")}
                        onClick={() => setPaquetesVisible(true)}
                      >
                        <IconoPaquete />
                        <span className={`flex-1 font-medium ${plan.dark ? "text-white/70" : "text-[#6B7280]"}`}>¿Más de 2,000 comprobantes?</span>
                        <span className={`font-bold whitespace-nowrap ${plan.dark ? "text-[#99F6E4]" : "text-[#0D9488]"}`}>Ver paquetes →</span>
                      </button>

                      <button
                        className={[
                          "w-full py-[10px] rounded-[10px] text-[13.5px] font-bold cursor-pointer transition-all duration-[0.18s] mt-auto outline-none focus:outline-none focus-visible:outline-none active:outline-none",
                          plan.dark
                            ? isSelected
                              ? "bg-white/15 border-none text-white"
                              : "bg-transparent border-2 border-white/70 text-white hover:bg-white/15 hover:border-white"
                            : isSelected
                              ? "bg-[#0D9488] text-white border-none"
                              : "bg-transparent border-2 border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488] hover:text-white",
                        ].join(" ")}
                        onClick={() => setPlanSeleccionado(plan.key)}
                      >
                        {isSelected ? "Seleccionado" : plan.key === "gratis" ? "Comenzar gratis" : "Elegir Plan"}
                      </button>

                    </div>
                  );
                })}

              </div>
            </div>

            {/* Hint chat */}
            <div
              className="flex items-center justify-end gap-[6px] mt-[14px] text-[13px] text-[#6B7280] cursor-pointer hover:text-[#0D9488]"
              onClick={() => setChatVisible(true)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2" strokeLinecap="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span>¿Tienes dudas sobre los planes?</span>
            </div>

            {planSeleccionado && (
              <button
                className="flex items-center justify-center gap-2 bg-[#0D9488] text-white border-none rounded-[10px] px-6 py-[13px] text-[14px] font-bold cursor-pointer w-full mt-[10px] transition-[background,transform] duration-[0.2s] hover:bg-[#0B7A6E] hover:-translate-y-px [animation:modal-fade_0.2s_ease]"
                onClick={handleConfirmarPlan}
              >
                Continuar con {nombrePlanDisplay}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Dimmed overlay when chat open */}
            {chatVisible && <div className="absolute inset-0 bg-black/[0.22] z-[2] rounded-[22px] pointer-events-auto" />}
          </div>{/* /planes-wrap */}

          {chatVisible && (
            <div
              className="hidden max-[760px]:block fixed inset-0 z-[10000] bg-black/45 [animation:modal-fade_0.22s_ease]"
              onClick={() => setChatVisible(false)}
            />
          )}

          {/* Panel chat */}
          {chatVisible && (
            <div className="absolute top-1/2 -translate-y-1/2 right-4 w-[360px] h-[86%] max-h-[520px] z-10 flex flex-col bg-[var(--surface-color)] rounded-[18px] shadow-[0_8px_40px_rgba(0,0,0,0.18)] [animation:modal-chat-in_0.28s_cubic-bezier(0.34,1.3,0.64,1)] overflow-hidden max-[760px]:fixed max-[760px]:top-auto max-[760px]:bottom-4 max-[760px]:left-2 max-[760px]:right-2 max-[760px]:w-[calc(100%-16px)] max-[760px]:h-auto max-[760px]:max-h-[80vh] max-[760px]:translate-y-0 max-[760px]:rounded-[20px] max-[760px]:shadow-[0_-8px_40px_rgba(0,0,0,0.28)] max-[760px]:z-[10001] max-[760px]:[animation:modal-chat-mobile-in_0.3s_cubic-bezier(0.34,1.2,0.64,1)]">
              <div className="bg-[#134E4A] px-4 py-[14px] flex items-center justify-between gap-[10px] flex-shrink-0">
                <div className="flex items-center gap-[10px]">
                  <div className="w-[38px] h-[38px] rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[13.5px] font-bold text-white">Asistente Facturación</div>
                    <div className="flex items-center gap-[5px] text-[11px] text-white/85 mt-[1px]">
                      <span className="w-[7px] h-[7px] rounded-full bg-[#4ADE80] flex-shrink-0" />
                      En línea · Catálogo cargado
                    </div>
                  </div>
                </div>
                <button
                  className="w-[26px] h-[26px] rounded-full bg-white/20 border-none cursor-pointer flex items-center justify-center flex-shrink-0 transition-colors duration-150 hover:bg-white/35 outline-none focus:outline-none"
                  onClick={() => setChatVisible(false)}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 2L10 10M10 2L2 10" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div
                className="flex items-center gap-[10px] px-[14px] py-[10px] border-b border-[#F3F4F6] bg-[#F0FDFA] flex-shrink-0 cursor-pointer"
                onClick={() => setVisorPdf({
                  url: "/catalogos/facturacion-electronica-2025.pdf",
                  nombre: "Catálogo Facturación Electrónica 2025.pdf",
                  tamanio: "PDF · Catálogo completo de planes"
                })}
              >
                <IconoPdf />
                <div className="flex-1 min-w-0 flex flex-col">
                  <span className="text-[12px] font-semibold text-[#0D9488] whitespace-nowrap overflow-hidden text-ellipsis">Catálogo Facturación Electrónica 2025.pdf</span>
                  <span className="text-[11px] text-[#9CA3AF]">Toca para ver el catálogo completo de planes</span>
                </div>
                <button
                  className="flex items-center gap-[3px] bg-none border-none text-[#0D9488] text-[12px] font-semibold cursor-pointer whitespace-nowrap px-[6px] py-[4px] rounded-[6px] transition-colors duration-150 hover:bg-[#CCFBF1] outline-none focus:outline-none"
                  onClick={(e) => { e.stopPropagation(); setVisorPdf({
                    url: "/catalogos/facturacion-electronica-2025.pdf",
                    nombre: "Catálogo Facturación Electrónica 2025.pdf",
                    tamanio: "PDF · Catálogo completo de planes"
                  }); }}
                >
                  Ver&nbsp;
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-3 py-[14px] flex flex-col gap-[10px] bg-[#FAFAFA] [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-thumb]:bg-[#E5E7EB] [&::-webkit-scrollbar-thumb]:rounded-[99px]">
                {mensajesChat.map((msg, i) => (
                  <div key={i} className={`flex gap-2 items-end ${msg.tipo === "usuario" ? "flex-row-reverse" : "flex-row"}`}>
                    {msg.tipo === "bot" && (
                      <div className="w-[28px] h-[28px] rounded-full bg-[#CCFBF1] flex items-center justify-center flex-shrink-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2" strokeLinecap="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      </div>
                    )}
                    <div className={`max-w-[75%] flex flex-col gap-[3px] ${msg.tipo === "usuario" ? "items-end" : "items-start"}`}>
                      <p className={`m-0 px-3 py-[9px] rounded-[14px] text-[12.5px] leading-[1.5] whitespace-pre-line ${msg.tipo === "bot" ? "bg-[var(--surface-color)] text-[#1C1917] rounded-tl-[4px] shadow-[0_1px_3px_rgba(0,0,0,0.07)]" : "bg-[#0D9488] text-white rounded-tr-[4px]"}`}>{msg.texto}</p>
                      <span className="text-[10px] text-[#9CA3AF]">{msg.hora}</span>
                    </div>
                  </div>
                ))}
                <div ref={refFinChat} />
              </div>

              <div className="flex flex-wrap gap-[6px] px-3 py-2 border-t border-[#F3F4F6] bg-[var(--surface-color)] flex-shrink-0 max-[760px]:flex-wrap max-[760px]:gap-[6px] max-[760px]:pb-3">
                {CHATBOT_PREGUNTAS_FACTURACION.map((q) => (
                  <button
                    key={q}
                    className="text-[11px] font-medium px-[11px] py-[5px] rounded-[20px] border-[1.5px] border-[#99F6E4] bg-[#F0FDFA] text-[#0F766E] cursor-pointer transition-all duration-150 whitespace-nowrap hover:bg-[#0D9488] hover:border-[#0D9488] hover:text-white outline-none focus:outline-none"
                    onClick={() => handleEnviarChat(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-[6px] px-3 py-[10px] border-t border-[#F3F4F6] bg-[var(--surface-color)] flex-shrink-0">
                <input
                  className="flex-1 border-[1.5px] border-[#E5E7EB] rounded-[20px] px-[14px] py-2 text-[12.5px] outline-none bg-[#FAFAFA] text-[#1C1917] transition-[border-color] duration-[0.18s] focus:border-[#0D9488] placeholder:text-[#9CA3AF]"
                  placeholder="Escribe tu pregunta..."
                  value={inputChat}
                  onChange={(e) => setInputChat(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleEnviarChat(inputChat)}
                />
                <button
                  className="w-9 h-9 rounded-full bg-[#0D9488] border-none cursor-pointer flex items-center justify-center flex-shrink-0 transition-[background,transform] duration-[0.18s] hover:bg-[#0B7A6E] hover:scale-[1.08] outline-none focus:outline-none"
                  onClick={() => handleEnviarChat(inputChat)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2.2" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          )}

        </div>{/* /body */}

        {/* Panel paquetes */}
        {paquetesVisible && (
          <PanelPaquetes onCerrar={() => setPaquetesVisible(false)} />
        )}

        {/* Popover feature */}
        {featureAbierta && (
          <PopoverDetalleFeature
            nombreFeature={featureAbierta}
            onCerrar={() => setFeatureAbierta(null)}
          />
        )}

        {/* FAB chat */}
        <button
          className={`absolute bottom-[18px] right-[18px] z-30 w-12 h-12 rounded-full border-none cursor-pointer flex items-center justify-center transition-[background,transform] duration-[0.18s] hover:scale-[1.08] outline-none focus:outline-none ${chatVisible ? "bg-[#9CA3AF] hover:bg-[#6B7280]" : "bg-[#0D9488] shadow-[0_4px_16px_rgba(13,148,136,0.45)] hover:bg-[#0B7A6E]"}`}
          onClick={() => setChatVisible(!chatVisible)}
        >
          {chatVisible ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="white" />
            </svg>
          )}
        </button>

      </div>

      <VisorCatalogoPDF
        estaAbierto={!!visorPdf}
        alCerrar={() => setVisorPdf(null)}
        pdfUrl={visorPdf?.url || ""}
        pdfNombre={visorPdf?.nombre || ""}
        pdfTamanio={visorPdf?.tamanio || ""}
        accentColor="#0D9488"
      />

    </div>
  );
}

export default SelectorPlanFacturacion;
