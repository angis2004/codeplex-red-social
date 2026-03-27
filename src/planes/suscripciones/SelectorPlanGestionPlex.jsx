import React, { useState, useRef, useEffect } from "react";
import VisorCatalogoPDF from "../../compartido/visor-catalogo/VisorCatalogoPDF";
import {
  PLANES_COMERCIAL,
  CHATBOT_PREGUNTAS_COMERCIAL,
  CHATBOT_RESPUESTAS_COMERCIAL,
  CHATBOT_BIENVENIDA_COMERCIAL,
  FEATURES_COMERCIAL,
} from "./gestionplex.data";


function PopoverDetalleFeature({ nombreFeature, onCerrar }) {
  const info = FEATURES_COMERCIAL[nombreFeature];
  if (!info) return null;
  return (
    <div className="absolute inset-0 z-50 bg-black/[0.28] backdrop-blur-[3px] flex items-center justify-center rounded-[22px] [animation:modal-fade_0.18s_ease]" onClick={onCerrar}>
      <div className="bg-[var(--surface-color)] rounded-[18px] p-[24px_22px_22px] w-[300px] max-w-[88%] relative shadow-[0_12px_40px_rgba(0,0,0,0.16)] [animation:modal-pop-in_0.2s_cubic-bezier(0.34,1.56,0.64,1)]" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#F3F4F6] border-0 cursor-pointer flex items-center justify-center transition-colors hover:bg-[#E5E7EB]" onClick={onCerrar}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 2l6 6M8 2l-6 6" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
        <h4 className="text-[15px] font-bold text-[#111827] m-0 mb-2.5 pr-5 leading-[1.3]">{info.titulo}</h4>
        <p className="text-[13px] text-[#4B5563] leading-[1.6] m-0">{info.desc}</p>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════
   ÍCONOS
═══════════════════════════════════════════ */
function IconoGestionPlex({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#0D9488" />
      <rect x="8"  y="30" width="8"  height="10" rx="2" fill="white" />
      <rect x="20" y="22" width="8"  height="18" rx="2" fill="#99F6E4" />
      <rect x="32" y="14" width="8"  height="26" rx="2" fill="white" />
      <path d="M12 22 L24 16 L36 10" stroke="#99F6E4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="22" r="2.5" fill="white" />
      <circle cx="24" cy="16" r="2.5" fill="white" />
      <circle cx="36" cy="10" r="2.5" fill="white" />
    </svg>
  );
}

function IconoCheck({ dark = false }) {
  const bg    = dark ? "rgba(255,255,255,0.2)" : "#CCFBF1";
  const color = dark ? "#fff"                  : "#0D9488";
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="7.5" cy="7.5" r="7.5" fill={bg} />
      <path d="M4.5 7.5L6.5 9.5L10.5 5.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconoX({ dark = false }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="5" cy="5" r="5" fill={dark ? "rgba(255,255,255,0.15)" : "#FEE2E2"} />
      <path d="M3.5 3.5L6.5 6.5M6.5 3.5L3.5 6.5" stroke={dark ? "rgba(255,255,255,0.5)" : "#EF4444"} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IconoPdf() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect width="36" height="36" rx="8" fill="#CCFBF1" />
      <path d="M10 8h12l6 6v18H10V8z" fill="#0D9488" />
      <path d="M22 8l6 6h-6V8z" fill="#0B7A6E" />
      <text x="13" y="26" fontSize="7" fill="white" fontWeight="bold">PDF</text>
    </svg>
  );
}


/* ═══════════════════════════════════════════
   TARJETA DE PLAN
═══════════════════════════════════════════ */
function PlanCard({ plan, periodo, seleccionado, onSeleccionar, onFeatureClick }) {
  const precio   = plan.precio[periodo];
  const labelPer = periodo === "mensual" ? "/mes" : "/año";

  return (
    <div
      className={[
        "bg-[var(--surface-color)] border-[1.5px] border-[#E5E7EB] rounded-2xl px-4 pt-5 pb-[18px] flex flex-col gap-3 transition-[box-shadow,border-color] duration-[180ms] relative flex-[0_0_192px] min-w-[192px] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]",
        plan.dark    ? "!bg-[#134E4A] !border-[#134E4A] !pt-[42px]" : "",
        seleccionado && !plan.dark ? "!border-2 !border-[#0D9488] shadow-[0_4px_20px_rgba(13,148,136,0.18)]" : "",
        seleccionado && plan.dark  ? "!border-[rgba(255,255,255,0.55)] shadow-[0_4px_20px_rgba(0,0,0,0.22)]" : "",
      ].filter(Boolean).join(" ")}
    >
      {plan.popular && <div className="absolute -top-px left-1/2 -translate-x-1/2 bg-[#0D9488] text-white text-[10px] font-bold tracking-[1px] px-[18px] py-[6px] rounded-[0_0_12px_12px] whitespace-nowrap">MAS POPULAR</div>}

      <h3 className={`text-[17px] font-bold m-0${plan.dark ? " text-white" : " text-[#0D9488]"}`}>
        {plan.nombre}
      </h3>

      <div className={`flex items-baseline gap-0.5${plan.dark ? " text-white" : " text-[#1C1917]"}`}>
        <span className="text-[18px] font-bold">s/</span>
        <span className="text-[34px] font-extrabold leading-none max-[700px]:text-[28px]">{precio}</span>
        <span className="text-xs font-medium opacity-70">{labelPer}</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full${plan.dark ? " border-[1.5px] border-white/55 text-white bg-transparent" : " bg-[#0D9488] text-white border-0"}`}>
          {plan.empresas}
        </span>
      </div>

      <ul className="list-none p-0 m-0 flex flex-col gap-[7px] flex-1">
        {plan.features.map((f, i) => (
          <li
            key={i}
            className={`flex items-start gap-1.5 text-xs leading-[1.4]${plan.dark ? " text-white" : " text-[#374151]"}${f.check === false ? " opacity-80" : ""}`}
          >
            {f.check === true
              ? <IconoCheck dark={plan.dark} />
              : <IconoX dark={plan.dark} />}
            <span
              className={[
                f.highlight ? "font-bold underline" : "",
                FEATURES_COMERCIAL[f.texto] ? "cursor-pointer underline decoration-dotted [text-underline-offset:3px]" + (plan.dark ? "" : " hover:text-[#0D9488]") : "",
              ].filter(Boolean).join(" ")}
              onClick={FEATURES_COMERCIAL[f.texto] ? (e) => { e.stopPropagation(); onFeatureClick(f.texto); } : undefined}
            >
              {f.check === false ? <span className="line-through text-[#9CA3AF] text-[11.5px]">{f.texto}</span> : (plan.dark && FEATURES_COMERCIAL[f.texto] ? <u>{f.texto}</u> : f.texto)}
            </span>
          </li>
        ))}
      </ul>

      <button
        className={[
          "outline-none w-full py-[10px] rounded-[10px] text-[13.5px] font-bold cursor-pointer transition-all mt-auto focus:outline-none",
          plan.dark
            ? (seleccionado ? "bg-white/15 border-0 text-white" : "bg-transparent border-2 border-white/70 text-white hover:bg-white/15 hover:border-white")
            : (seleccionado ? "bg-[#0D9488] text-white border-0" : "bg-transparent border-2 border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488] hover:text-white"),
        ].join(" ")}
        onClick={onSeleccionar}
      >
        {seleccionado ? "Seleccionado" : "Elegir Plan"}
      </button>
    </div>
  );
}


/* ═══════════════════════════════════════════
   COMPONENTE PRINCIPAL
═══════════════════════════════════════════ */
function SelectorPlanGestionPlex({ estaAbierto, alCerrar, alProcederPago }) {

  const [periodoFacturacion, setPeriodoFacturacion] = useState("mensual");
  const [planSeleccionado,   setPlanSeleccionado]   = useState(null);
  const [chatVisible,        setChatVisible]        = useState(false);
  const [visorPdf,           setVisorPdf]           = useState(null);
  const [featureAbierta,     setFeatureAbierta]     = useState(null);

  /* Chatbot */
  const [mensajesChat, setMensajesChat] = useState([CHATBOT_BIENVENIDA_COMERCIAL]);
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

  /* Reset al cerrar */
  const handleClose = () => {
    setPlanSeleccionado(null);
    setChatVisible(false);
    setMensajesChat([CHATBOT_BIENVENIDA_COMERCIAL]);
    alCerrar();
  };

  if (!estaAbierto) return null;

  const handleClickOverlay = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const handleConfirmarPlan = () => {
    const plan = PLANES_COMERCIAL.find((p) => p.id === planSeleccionado);
    if (!plan) return;
    alProcederPago?.({
      planNombre: plan.id,
      precio: plan.precio[periodoFacturacion].replace(",", ""),
      billing: periodoFacturacion,
    });
  };

  const handleEnviarChat = (texto) => {
    if (!texto.trim()) return;
    const hora = new Date().toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });
    setMensajesChat((prev) => [...prev, { tipo: "usuario", texto, hora }]);
    setInputChat("");
    setTimeout(() => {
      const resp = CHATBOT_RESPUESTAS_COMERCIAL[texto] ||
        "Gracias por tu consulta. Un asesor te contactará pronto para brindarte más información.";
      setMensajesChat((prev) => [...prev, { tipo: "bot", texto: resp, hora }]);
    }, 800);
  };

  const nombrePlanDisplay = PLANES_COMERCIAL.find((p) => p.id === planSeleccionado)?.nombre || "";


  /* ═══════════════════════════════════════
     RENDER
  ═══════════════════════════════════════ */
  return (
    <div className="fixed inset-0 z-[9999] bg-[rgba(6,30,30,0.55)] backdrop-blur-[6px] flex items-center justify-center p-4 [animation:modal-fade_0.22s_ease]" onClick={handleClickOverlay}>
      <div className="bg-[#F0FDFA] rounded-[22px] w-full max-w-[1060px] max-h-[90vh] overflow-hidden relative flex flex-col [animation:modal-slide_0.28s_cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_24px_80px_rgba(0,0,0,0.22)]">

        {/* ── Cerrar ── */}
        <button className="absolute top-3.5 right-3.5 z-10 w-[30px] h-[30px] rounded-full border-0 cursor-pointer flex items-center justify-center transition-all hover:scale-110 outline-none focus:outline-none bg-[#0D9488] hover:bg-[#0B7A6E]" onClick={handleClose}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2L12 12M12 2L2 12" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>

        {/* ── Body ── */}
        <div className="relative flex-1 min-h-0 overflow-hidden flex flex-col">
          <div className="flex-1 min-h-0 overflow-y-auto px-7 pt-5 pb-20 box-border relative z-[1] [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#99F6E4] max-[700px]:px-3.5 max-[700px]:pt-4 max-[700px]:pb-24">

            {/* Botón volver */}
            <button className="inline-flex items-center gap-1.5 bg-transparent border-0 text-[13px] font-semibold text-[#374151] cursor-pointer px-2 py-1 rounded-lg mb-1.5 transition-colors hover:bg-black/[0.06] outline-none focus:outline-none" onClick={handleClose}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Volver
            </button>

            {/* Header */}
            <div className="flex flex-col items-center text-center gap-1.5 mb-5">
              <IconoGestionPlex size={44} />
              <h2 className="text-[22px] font-extrabold text-[#1C1917] m-0 max-[700px]:text-[19px]">Gestión-Plex Comercial</h2>
              <p className="text-[13.5px] text-[#6B7280] m-0">Elige el plan perfecto para ti  con comprobantes ilimitados</p>

              <div className="flex gap-2 flex-wrap justify-center mt-0.5">
                <span className="border-[1.5px] border-[#99F6E4] rounded-full px-3.5 py-1 text-xs font-medium bg-[var(--surface-color)] text-[#0F766E]">1 mes gratis</span>
                <span className="border-[1.5px] border-[#99F6E4] rounded-full px-3.5 py-1 text-xs font-medium bg-[var(--surface-color)] text-[#0F766E]">IGV incluido</span>
                <span className="border-[1.5px] border-[#99F6E4] rounded-full px-3.5 py-1 text-xs font-medium bg-[var(--surface-color)] text-[#0F766E]">Actualizaciones</span>
              </div>

              {/* Toggle Mensual / Anual */}
              <div className="inline-flex bg-[#F3F4F6] rounded-[10px] p-1 gap-1 mt-1">
                <button
                  className={`px-6 py-2 rounded-lg border-0 text-[13.5px] font-semibold cursor-pointer transition-all outline-none focus:outline-none${periodoFacturacion === "mensual" ? " bg-[#134E4A] text-white shadow-[0_2px_8px_rgba(19,78,74,0.35)]" : " bg-transparent text-[#6B7280]"}`}
                  onClick={() => setPeriodoFacturacion("mensual")}
                >
                  Mensual
                </button>
                <button
                  className={`px-6 py-2 rounded-lg border-0 text-[13.5px] font-semibold cursor-pointer transition-all outline-none focus:outline-none${periodoFacturacion === "anual" ? " bg-[#134E4A] text-white shadow-[0_2px_8px_rgba(19,78,74,0.35)]" : " bg-transparent text-[#6B7280]"}`}
                  onClick={() => setPeriodoFacturacion("anual")}
                >
                  Anual
                </button>
              </div>
            </div>

            {/* Planes — scroll horizontal */}
            <div
              className="flex overflow-x-auto gap-3.5 pb-2.5 cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:h-[5px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#99F6E4]"
              ref={refPlanesScroll}
              onMouseDown={handlePlanesMouseDown}
              onMouseMove={handlePlanesMouseMove}
              onMouseUp={handlePlanesMouseUp}
              onMouseLeave={handlePlanesMouseUp}
            >
              {PLANES_COMERCIAL.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  periodo={periodoFacturacion}
                  seleccionado={planSeleccionado === plan.id}
                  onSeleccionar={() => setPlanSeleccionado(plan.id)}
                  onFeatureClick={setFeatureAbierta}
                />
              ))}
            </div>

            {/* Hint chat */}
            <div className="flex items-center justify-end gap-1.5 mt-3.5 text-[13px] text-[#6B7280] cursor-pointer hover:text-[#0D9488]" onClick={() => setChatVisible(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2" strokeLinecap="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span>¿Tienes dudas sobre los planes?</span>
            </div>

            {/* Botón confirmar */}
            {planSeleccionado && (
              <button className="flex items-center justify-center gap-2 text-white border-0 rounded-[10px] py-[13px] px-6 text-sm font-bold cursor-pointer w-full mt-2.5 transition-[background,transform] duration-200 hover:-translate-y-px [animation:modal-fade_0.2s_ease] bg-[#0D9488] hover:bg-[#0B7A6E]" onClick={handleConfirmarPlan}>
                Continuar con Plan {nombrePlanDisplay}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* dimmed overlay */}
            {chatVisible && <div className="absolute inset-0 bg-black/[0.22] z-[2] rounded-[22px] pointer-events-auto" />}

          </div>{/* /planes-wrap */}

          {/* Backdrop oscuro (mobile) */}
          {chatVisible && (
            <div className="hidden max-[700px]:block fixed inset-0 z-[10000] bg-black/45 [animation:modal-fade_0.22s_ease]" onClick={() => setChatVisible(false)} />
          )}

          {/* ── Panel chat ── */}
          {chatVisible && (
            <div className="absolute top-1/2 -translate-y-1/2 right-4 w-[360px] h-[86%] max-h-[520px] z-10 flex flex-col bg-[var(--surface-color)] rounded-[18px] shadow-[0_8px_40px_rgba(0,0,0,0.18)] overflow-hidden [animation:modal-chat-in_0.28s_cubic-bezier(0.34,1.3,0.64,1)] max-[700px]:fixed max-[700px]:top-auto max-[700px]:bottom-4 max-[700px]:left-2 max-[700px]:right-2 max-[700px]:w-[calc(100%-16px)] max-[700px]:h-auto max-[700px]:max-h-[80vh] max-[700px]:translate-y-0 max-[700px]:z-[10001] max-[700px]:rounded-[20px] max-[700px]:[animation:modal-chat-mobile-in_0.3s_cubic-bezier(0.34,1.2,0.64,1)]">
              {/* Header chat */}
              <div className="bg-[#134E4A] px-4 py-3.5 flex items-center justify-between gap-2.5 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-[38px] h-[38px] rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[13.5px] font-bold text-white">Asistente Gestión-Plex</div>
                    <div className="flex items-center gap-[5px] text-[11px] text-white/85 mt-px">
                      <span className="w-[7px] h-[7px] rounded-full bg-[#4ADE80] shrink-0" />
                      En línea · Catálogo cargado
                    </div>
                  </div>
                </div>
                <button className="w-[26px] h-[26px] rounded-full bg-white/20 border-0 cursor-pointer flex items-center justify-center shrink-0 transition-colors hover:bg-white/35" onClick={() => setChatVisible(false)}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 2L10 10M10 2L2 10" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* PDF adjunto */}
              <div
                className="flex items-center gap-2.5 px-3.5 py-2.5 border-b border-[#F3F4F6] shrink-0 cursor-pointer bg-[#F0FDFA]"
                onClick={() => setVisorPdf({
                  url: "/catalogos/gestionplex-comercial-2025.pdf",
                  nombre: "Catálogo GestiónPlex Comercial 2025.pdf",
                  tamanio: "PDF · Catálogo completo de planes"
                })}
              >
                <IconoPdf />
                <div className="flex-1 min-w-0 flex flex-col">
                  <span className="text-xs font-semibold whitespace-nowrap overflow-hidden text-ellipsis text-[#0D9488]">Catálogo GestiónPlex Comercial 2025.pdf</span>
                  <span className="text-[11px] text-[#9CA3AF]">Toca para ver el catálogo completo de planes</span>
                </div>
                <button
                  className="flex items-center gap-0.5 bg-transparent border-0 text-xs font-semibold cursor-pointer whitespace-nowrap px-1.5 py-1 rounded-md transition-colors text-[#0D9488] hover:bg-[#CCFBF1]"
                  onClick={(e) => { e.stopPropagation(); setVisorPdf({
                    url: "/catalogos/gestionplex-comercial-2025.pdf",
                    nombre: "Catálogo GestiónPlex Comercial 2025.pdf",
                    tamanio: "PDF · Catálogo completo de planes"
                  }); }}
                >
                  Ver&nbsp;
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Mensajes */}
              <div className="flex-1 overflow-y-auto px-3 py-3.5 flex flex-col gap-2.5 bg-[#FAFAFA] [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-thumb]:bg-[#E5E7EB] [&::-webkit-scrollbar-thumb]:rounded-full">
                {mensajesChat.map((msg, i) => (
                  <div key={i} className={`flex gap-2 items-end${msg.tipo === "usuario" ? " flex-row-reverse" : " flex-row"}`}>
                    {msg.tipo === "bot" && (
                      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-[#CCFBF1]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2" strokeLinecap="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      </div>
                    )}
                    <div className={`max-w-[75%] flex flex-col gap-[3px]${msg.tipo === "bot" ? " items-start" : " items-end"}`}>
                      <p className={`m-0 px-3 py-[9px] text-[12.5px] leading-[1.5] whitespace-pre-line${msg.tipo === "bot" ? " bg-[var(--surface-color)] text-[#1C1917] rounded-[4px_14px_14px_14px] shadow-[0_1px_3px_rgba(0,0,0,0.07)]" : " bg-[#0D9488] text-white rounded-[14px_4px_14px_14px]"}`}>{msg.texto}</p>
                      <span className="text-[10px] text-[#9CA3AF]">{msg.hora}</span>
                    </div>
                  </div>
                ))}
                <div ref={refFinChat} />
              </div>

              {/* Quick replies */}
              <div className="flex flex-wrap gap-1.5 px-3 py-2 border-t border-[#F3F4F6] bg-[var(--surface-color)] shrink-0">
                {CHATBOT_PREGUNTAS_COMERCIAL.map((q) => (
                  <button key={q} className="text-[11px] font-medium px-[11px] py-[5px] rounded-full border-[1.5px] cursor-pointer transition-all whitespace-nowrap border-[#99F6E4] bg-[#F0FDFA] text-[#0F766E] hover:bg-[#0D9488] hover:border-[#0D9488] hover:text-white" onClick={() => handleEnviarChat(q)}>
                    {q}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="flex items-center gap-1.5 px-3 py-2.5 border-t border-[#F3F4F6] bg-[var(--surface-color)] shrink-0">
                <input
                  className="flex-1 border-[1.5px] border-[#E5E7EB] rounded-full px-3.5 py-2 text-[12.5px] outline-none bg-[#FAFAFA] text-[#1C1917] transition-colors placeholder:text-[#9CA3AF] focus:border-[#0D9488]"
                  placeholder="Escribe tu pregunta..."
                  value={inputChat}
                  onChange={(e) => setInputChat(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleEnviarChat(inputChat)}
                />
                <button className="w-9 h-9 rounded-full border-0 cursor-pointer flex items-center justify-center shrink-0 transition-[background,transform] duration-[180ms] hover:scale-[1.08] bg-[#0D9488] hover:bg-[#0B7A6E]" onClick={() => handleEnviarChat(inputChat)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2.2" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          )}{/* /chat */}

        </div>{/* /body */}

        {/* FAB chat */}
        <button
          className={`absolute bottom-[18px] right-[18px] z-30 w-12 h-12 rounded-full border-0 cursor-pointer flex items-center justify-center transition-[background,transform] duration-[180ms] hover:scale-[1.08] shadow-[0_4px_16px_rgba(13,148,136,0.45)]${chatVisible ? " bg-[#9CA3AF] hover:bg-[#6B7280]" : " bg-[#0D9488] hover:bg-[#0B7A6E]"}`}
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

        {featureAbierta && (
          <PopoverDetalleFeature
            nombreFeature={featureAbierta}
            onCerrar={() => setFeatureAbierta(null)}
          />
        )}

      </div>{/* /modal */}

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

export default SelectorPlanGestionPlex;
