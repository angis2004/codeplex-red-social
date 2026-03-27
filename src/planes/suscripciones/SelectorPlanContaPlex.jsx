import React, { useState, useRef, useEffect } from "react";
import VisorCatalogoPDF from "../../compartido/visor-catalogo/VisorCatalogoPDF";
import {
  PLANES_IND,
  PLANES_EMP,
  CHATBOT_QUICK,
  CHATBOT_RESPUESTAS,
  CHATBOT_MSG_INICIAL,
  FEATURES_INFO,
} from "./contaplex.data";

function PopoverDetalleFeature({ nombreFeature, onCerrar }) {
  const info = FEATURES_INFO[nombreFeature];
  if (!info) return null;
  return (
    <div
      className="absolute inset-0 z-50 bg-black/[0.28] backdrop-blur-[3px] flex items-center justify-center rounded-[22px] [animation:modal-fade_0.18s_ease]"
      onClick={onCerrar}
    >
      <div
        className="bg-[var(--surface-color)] rounded-[18px] p-[24px_22px_22px] w-[300px] max-w-[88%] relative shadow-[0_12px_40px_rgba(0,0,0,0.16)] [animation:modal-pop-in_0.2s_cubic-bezier(0.34,1.56,0.64,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#F3F4F6] border-none cursor-pointer flex items-center justify-center transition-colors duration-150 hover:bg-[#E5E7EB]"
          onClick={onCerrar}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 2l6 6M8 2l-6 6" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
        <h4 className="text-[15px] font-bold text-[#111827] m-0 mb-[10px] pr-5 leading-[1.3]">{info.titulo}</h4>
        <p className="text-[13px] text-[#4B5563] leading-[1.6] m-0">{info.desc}</p>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════
   ÍCONOS
═══════════════════════════════════════════ */
function IconoContaPlex({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#0094C0" />
      <rect x="10" y="28" width="6"  height="11" rx="1.5" fill="white" />
      <rect x="21" y="20" width="6"  height="19" rx="1.5" fill="#7DE0F5" />
      <rect x="32" y="10" width="6"  height="29" rx="1.5" fill="white" />
    </svg>
  );
}

function IconoContaPlexSm({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#0094C0" />
      <rect x="10" y="28" width="6"  height="11" rx="1.5" fill="white" />
      <rect x="21" y="20" width="6"  height="19" rx="1.5" fill="#7DE0F5" />
      <rect x="32" y="10" width="6"  height="29" rx="1.5" fill="white" />
    </svg>
  );
}

function IconoCheck({ dark = false }) {
  const bg    = dark ? "rgba(255,255,255,0.2)" : "#DBEAFE";
  const color = dark ? "#fff"                  : "#0094C0";
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
      <path d="M3.5 3.5L6.5 6.5M6.5 3.5L3.5 6.5" stroke={dark ? "rgba(255,255,255,0.6)" : "#EF4444"} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IconoPdf() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect width="36" height="36" rx="8" fill="#DBEAFE" />
      <path d="M10 8h12l6 6v18H10V8z" fill="#0094C0" />
      <path d="M22 8l6 6h-6V8z" fill="#0077A8" />
      <text x="13" y="26" fontSize="7" fill="white" fontWeight="bold">PDF</text>
    </svg>
  );
}


/* ═══════════════════════════════════════════
   TARJETA DE PLAN
═══════════════════════════════════════════ */
function PlanCard({ plan, periodo, seleccionado, onSeleccionar, compact = false, onFeatureClick }) {
  const precio    = plan.precio[periodo];
  const labelPer  = periodo === "mensual" ? "/mes" : "/año";

  return (
    <div
      className={[
        "bg-[var(--surface-color)] border-[1.5px] border-[#E5E7EB] rounded-[16px] p-[20px_16px_18px] flex flex-col gap-3 transition-[box-shadow,border-color] duration-[0.18s] relative hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]",
        plan.dark      ? "!bg-[#0D4471] !border-[#0D4471] !pt-[42px]" : "",
        plan.dark && seleccionado ? "!border-[rgba(255,255,255,0.55)] shadow-[0_4px_20px_rgba(0,0,0,0.22)]" : "",
        !plan.dark && seleccionado ? "!border-2 !border-[#0094C0] shadow-[0_4px_20px_rgba(0,148,192,0.18)]" : "",
        compact        ? "flex-[0_0_172px] min-w-[172px]" : "",
      ].filter(Boolean).join(" ")}
    >
      {plan.popular && (
        <div className="absolute top-[-1px] left-1/2 -translate-x-1/2 bg-[#0094C0] text-white text-[10px] font-bold tracking-[1px] px-[18px] py-[6px] rounded-b-[12px] whitespace-nowrap">
          MAS POPULAR
        </div>
      )}

      <h3 className={`text-[17px] font-bold m-0 ${plan.dark ? "text-white" : "text-[#0094C0]"}`}>
        {plan.nombre}
      </h3>

      <div className={`flex items-baseline gap-[2px] ${plan.dark ? "text-white" : "text-[#1C1917]"}`}>
        <span className="text-[18px] font-bold">s/</span>
        <span className="text-[34px] font-extrabold leading-none">{precio}</span>
        <span className="text-[12px] font-medium opacity-70">{labelPer}</span>
      </div>

      <div className="flex flex-wrap gap-[6px]">
        <span className={`text-[11px] font-semibold px-[10px] py-[3px] rounded-[20px] ${plan.dark ? "border-[1.5px] border-white/55 text-white bg-transparent" : "bg-[#0094C0] text-white border-none"}`}>
          {plan.empresas}
        </span>
      </div>

      <ul className="list-none p-0 m-0 flex flex-col gap-[7px] flex-1">
        {plan.features.map((f, i) => (
          <li
            key={i}
            className={`flex items-start gap-[6px] text-[12px] leading-[1.4] ${plan.dark ? "text-white" : "text-[#374151]"}`}
          >
            {f.check === null  ? <span className="inline-block w-[15px] h-[15px] flex-shrink-0" /> :
             f.check === true  ? <IconoCheck dark={plan.dark} /> :
                                 <IconoX dark={plan.dark} />}
            <span
              className={[
                f.check === false ? (plan.dark ? "line-through text-white/40 text-[11.5px]" : "line-through text-[#9CA3AF] text-[11.5px]") : "",
                f.highlight ? "font-bold underline" : "",
                FEATURES_INFO[f.texto] ? (plan.dark ? "cursor-pointer" : "cursor-pointer underline decoration-dotted [text-underline-offset:3px] hover:text-[#0094C0]") : "",
              ].filter(Boolean).join(" ")}
              onClick={FEATURES_INFO[f.texto] ? (e) => { e.stopPropagation(); onFeatureClick(f.texto); } : undefined}
            >
              {plan.dark && FEATURES_INFO[f.texto] ? <u>{f.texto}</u> : f.texto}
            </span>
          </li>
        ))}
      </ul>

      <button
        className={[
          "w-full py-[10px] rounded-[10px] text-[13.5px] font-bold cursor-pointer transition-all duration-[0.18s] mt-auto outline-none focus:outline-none focus-visible:outline-none active:outline-none",
          plan.dark
            ? seleccionado
              ? "bg-white/15 border-none text-white"
              : "bg-transparent border-2 border-white/70 text-white hover:bg-white/15 hover:border-white"
            : seleccionado
              ? "bg-[#0094C0] text-white border-none"
              : "bg-transparent border-2 border-[#0094C0] text-[#0094C0] hover:bg-[#0094C0] hover:text-white",
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
function SelectorPlanContaPlex({ estaAbierto, alCerrar, alProcederPago }) {

  const [tipoSeleccionado,   setTipoSeleccionado]   = useState("independiente");   /* "independiente" | "empresarial" */
  const [periodoFacturacion, setPeriodoFacturacion] = useState("mensual");
  const [planSeleccionado,   setPlanSeleccionado]   = useState(null);
  const [chatVisible,        setChatVisible]        = useState(false);
  const [visorPdf,           setVisorPdf]           = useState(null); /* { url, nombre, tamanio } */
  const [featureAbierta,     setFeatureAbierta]     = useState(null);

  /* Chatbot */
  const [mensajesChat, setMensajesChat] = useState([CHATBOT_MSG_INICIAL]);
  const [inputChat,    setInputChat]    = useState("");
  const refFinChat = useRef(null);

  /* Drag-scroll en desktop */
  const refPlanesScroll = useRef(null);
  const dragState = useRef({ dragging: false, startX: 0, scrollLeft: 0 });

  const onDragStart = (e) => {
    dragState.current = { dragging: true, startX: e.pageX, scrollLeft: refPlanesScroll.current.scrollLeft };
    refPlanesScroll.current.style.cursor = "grabbing";
    refPlanesScroll.current.style.userSelect = "none";
  };
  const onDragMove = (e) => {
    if (!dragState.current.dragging) return;
    e.preventDefault();
    const dx = e.pageX - dragState.current.startX;
    refPlanesScroll.current.scrollLeft = dragState.current.scrollLeft - dx;
  };
  const onDragEnd = () => {
    dragState.current.dragging = false;
    if (refPlanesScroll.current) {
      refPlanesScroll.current.style.cursor = "grab";
      refPlanesScroll.current.style.userSelect = "";
    }
  };

  useEffect(() => {
    if (chatVisible) refFinChat.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajesChat, chatVisible]);

  /* Reset al cerrar */
  const handleClose = () => {
    setTipoSeleccionado("independiente");
    setPlanSeleccionado(null);
    setChatVisible(false);
    setMensajesChat([CHATBOT_MSG_INICIAL]);
    alCerrar();
  };

  if (!estaAbierto) return null;

  const handleClickOverlay = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const planes = tipoSeleccionado === "empresarial" ? PLANES_EMP : PLANES_IND;

  const handleConfirmarPlan = () => {
    const plan = planes.find((p) => p.id === planSeleccionado);
    if (!plan) return;
    alProcederPago?.({
      planNombre: plan.id,
      precio: plan.precio[periodoFacturacion].replace(",", ""),
      billing: periodoFacturacion,
      tipo: tipoSeleccionado,
    });
  };

  const handleEnviarChat = (texto) => {
    if (!texto.trim()) return;
    const hora = new Date().toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });
    setMensajesChat((prev) => [...prev, { tipo: "usuario", texto, hora }]);
    setInputChat("");
    setTimeout(() => {
      const resp = CHATBOT_RESPUESTAS[texto] ||
        "Gracias por tu consulta. Un asesor te contactará pronto para brindarte más información.";
      setMensajesChat((prev) => [...prev, { tipo: "bot", texto: resp, hora }]);
    }, 800);
  };

  const tituloPlanes = "Conta-Plex";

  const nombrePlanDisplay = planes.find((p) => p.id === planSeleccionado)?.nombre || "";


  /* ═══════════════════════════════════════
     RENDER
  ═══════════════════════════════════════ */
  return (
    <div
      className="fixed inset-0 z-[9999] bg-[rgba(8,30,55,0.55)] backdrop-blur-[6px] flex items-center justify-center p-4 [animation:modal-fade_0.22s_ease]"
      onClick={handleClickOverlay}
    >
      <div className="bg-[#EBF8FF] rounded-[22px] w-full max-w-[820px] max-h-[90vh] overflow-hidden relative flex flex-col [animation:modal-slide_0.28s_cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_24px_80px_rgba(0,0,0,0.22)]">

        {/* ── Cerrar ── */}
        <button
          className="absolute top-[14px] right-[14px] z-10 w-[30px] h-[30px] rounded-full bg-[#0094C0] border-none cursor-pointer flex items-center justify-center transition-[background,transform] duration-[0.18s] hover:bg-[#0077A8] hover:scale-110 outline-none focus:outline-none"
          onClick={handleClose}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2L12 12M12 2L2 12" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>

        {/* ══════════════════════════════════════
            Planes (vista directa)
        ══════════════════════════════════════ */}
          <div className="relative flex-1 min-h-0 overflow-hidden flex flex-col">
            {/* Wrap de planes (scrollable) */}
            <div className={`flex-1 min-h-0 overflow-y-auto [-webkit-overflow-scrolling:touch] p-[20px_28px_80px] box-border relative z-[1] [scrollbar-width:thin] [scrollbar-color:#BAE6FD_transparent] [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-thumb]:bg-[#BAE6FD] [&::-webkit-scrollbar-thumb]:rounded-[99px] max-[700px]:p-[16px_14px_96px]`}>

              {/* ── Header ── */}
              <div className="flex flex-col items-center text-center gap-[6px] mb-5">
                <IconoContaPlexSm size={36} />
                <h2 className="text-[20px] font-extrabold text-[#1C1917] m-0 max-[700px]:text-[19px]">{tituloPlanes}</h2>
                <p className="text-[13.5px] text-[#6B7280] m-0">Sistema contable integral · Comprobantes ilimitados</p>
                <div className="flex gap-2 flex-wrap justify-center mt-[2px]">
                  {["1 mes gratis", "IGV incluido", "Actualizaciones"].map((b) => (
                    <span key={b} className="border-[1.5px] border-[#BAE6FD] rounded-[20px] px-[14px] py-[4px] text-[12px] font-medium text-[#0369A1] bg-[var(--surface-color)]">{b}</span>
                  ))}
                </div>

                {/* Tabs Independiente / Empresarial */}
                <div className="flex w-full bg-[#E5E7EB] rounded-[14px] p-[4px] gap-[4px] mt-[6px] mb-[2px] md:w-[70%]">
                  {[
                    { key: "independiente", nombre: "Independiente", sub: "Para Contadores y gestores" },
                    { key: "empresarial",   nombre: "Empresarial",   sub: "Para empresas Propias" },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      className={`flex-1 border-none rounded-[10px] px-[20px] py-[10px] cursor-pointer flex flex-col items-center gap-[2px] transition-[background,box-shadow] duration-[0.18s] outline-none focus:outline-none ${tipoSeleccionado === tab.key ? "bg-[#0D4471] shadow-[0_2px_8px_rgba(13,68,113,0.3)]" : "bg-transparent"}`}
                      onClick={() => { setTipoSeleccionado(tab.key); setPlanSeleccionado(null); }}
                    >
                      <span className={`text-[14px] font-bold transition-colors duration-[0.18s] ${tipoSeleccionado === tab.key ? "text-white" : "text-[#6B7280]"}`}>{tab.nombre}</span>
                      <small className={`text-[11px] transition-colors duration-[0.18s] ${tipoSeleccionado === tab.key ? "text-white/75" : "text-[#9CA3AF]"}`}>{tab.sub}</small>
                    </button>
                  ))}
                </div>

                {/* Toggle Mensual / Anual */}
                <div className="flex items-center gap-[10px] mt-[6px]">
                  <span className={`text-[13px] font-medium transition-colors duration-[0.18s] ${periodoFacturacion === "mensual" ? "text-[#1C1917] font-bold" : "text-[#9CA3AF]"}`}>Mensual</span>
                  <button
                    className={`relative w-[42px] h-[24px] border-none rounded-[99px] cursor-pointer p-0 transition-[background] duration-[0.22s] flex-shrink-0 outline-none focus:outline-none ${periodoFacturacion === "anual" ? "bg-[#0094C0]" : "bg-[#D1D5DB]"}`}
                    onClick={() => setPeriodoFacturacion(periodoFacturacion === "mensual" ? "anual" : "mensual")}
                    aria-label="Cambiar periodo de facturación"
                  >
                    <span
                      className="absolute top-[3px] left-[3px] w-[18px] h-[18px] bg-[var(--surface-color)] rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.2)] transition-transform duration-[0.22s] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] block"
                      style={{ transform: periodoFacturacion === "anual" ? "translateX(18px)" : "translateX(0)" }}
                    />
                  </button>
                  <span className={`text-[13px] font-medium transition-colors duration-[0.18s] ${periodoFacturacion === "anual" ? "text-[#1C1917] font-bold" : "text-[#9CA3AF]"}`}>Anual</span>
                </div>
              </div>

              {/* ── Planes ── */}
              {tipoSeleccionado === "independiente" ? (
                <div
                  className="flex overflow-x-auto gap-[14px] pb-[10px] [-webkit-overflow-scrolling:touch] cursor-grab [&::-webkit-scrollbar]:h-[5px] [&::-webkit-scrollbar-thumb]:bg-[#BAE6FD] [&::-webkit-scrollbar-thumb]:rounded-[99px]"
                  ref={refPlanesScroll}
                  onMouseDown={onDragStart}
                  onMouseMove={onDragMove}
                  onMouseUp={onDragEnd}
                  onMouseLeave={onDragEnd}
                >
                  {PLANES_IND.map((plan) => (
                    <PlanCard
                      key={plan.id}
                      plan={plan}
                      periodo={periodoFacturacion}
                      seleccionado={planSeleccionado === plan.id}
                      onSeleccionar={() => setPlanSeleccionado(plan.id)}
                      compact
                      onFeatureClick={setFeatureAbierta}
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 max-[700px]:grid-cols-1">
                  {PLANES_EMP.map((plan) => (
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
              )}

              {/* ── Hint chat ── */}
              <div
                className="flex items-center justify-end gap-[6px] mt-[14px] text-[13px] text-[#6B7280] cursor-pointer hover:text-[#0094C0]"
                onClick={() => setChatVisible(true)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0094C0" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>¿Tienes dudas sobre los planes?</span>
              </div>

              {/* ── Botón confirmar ── */}
              {planSeleccionado && (
                <button
                  className="flex items-center justify-center gap-2 bg-[#0094C0] text-white border-none rounded-[10px] px-6 py-[13px] text-[14px] font-bold cursor-pointer w-full mt-[10px] transition-[background,transform] duration-[0.2s] hover:bg-[#0077A8] hover:-translate-y-px [animation:modal-fade_0.2s_ease]"
                  onClick={handleConfirmarPlan}
                >
                  Continuar con Plan {nombrePlanDisplay}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              )}

              {/* Dimmed overlay when chat open */}
              {chatVisible && <div className="absolute inset-0 bg-black/[0.22] z-[2] rounded-[22px] pointer-events-auto" />}
            </div>{/* /planes-wrap */}

            {/* Backdrop oscuro para cerrar chat en mobile */}
            {chatVisible && (
              <div
                className="hidden max-[700px]:block fixed inset-0 z-[10000] bg-black/45 [animation:modal-fade_0.22s_ease]"
                onClick={() => setChatVisible(false)}
              />
            )}

            {/* ══════════════════════════════════════
                PANEL CHAT
            ══════════════════════════════════════ */}
            {chatVisible && (
              <div className="absolute top-1/2 -translate-y-1/2 right-4 w-[360px] h-[86%] max-h-[520px] z-10 flex flex-col bg-[var(--surface-color)] rounded-[18px] shadow-[0_8px_40px_rgba(0,0,0,0.18)] [animation:modal-chat-in_0.28s_cubic-bezier(0.34,1.3,0.64,1)] overflow-hidden max-[700px]:fixed max-[700px]:top-auto max-[700px]:bottom-4 max-[700px]:left-2 max-[700px]:right-2 max-[700px]:w-[calc(100%-16px)] max-[700px]:h-auto max-[700px]:max-h-[80vh] max-[700px]:translate-y-0 max-[700px]:rounded-[20px] max-[700px]:shadow-[0_-8px_40px_rgba(0,0,0,0.28)] max-[700px]:z-[10001] max-[700px]:[animation:modal-chat-mobile-in_0.3s_cubic-bezier(0.34,1.2,0.64,1)]">
                {/* Header */}
                <div className="bg-[#0D4471] px-4 py-[14px] flex items-center justify-between gap-[10px] flex-shrink-0">
                  <div className="flex items-center gap-[10px]">
                    <div className="w-[38px] h-[38px] rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[13.5px] font-bold text-white">Asistente Conta-Plex</div>
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

                {/* PDF adjunto */}
                {(() => {
                  const esEmp   = tipoSeleccionado === "empresarial";
                  const pdfUrl  = esEmp
                    ? "/catalogos/contaplex-empresariales-2026.pdf"
                    : "/catalogos/contaplex-independientes-2026.pdf";
                  const pdfNom  = esEmp
                    ? "Brochure Conta-Plex Empresariales 2026.pdf"
                    : "Brochure Conta-Plex Independientes 2026.pdf";
                  const pdfInfo = esEmp ? "PDF · Catálogo empresarial" : "1.8 MB · 4 páginas";
                  const abrirVisor = () => setVisorPdf({ url: pdfUrl, nombre: pdfNom, tamanio: pdfInfo });
                  return (
                    <div className="flex items-center gap-[10px] px-[14px] py-[10px] border-b border-[#F3F4F6] bg-[#F0F9FF] flex-shrink-0 cursor-pointer" onClick={abrirVisor}>
                      <IconoPdf />
                      <div className="flex-1 min-w-0 flex flex-col">
                        <span className="text-[12px] font-semibold text-[#0094C0] whitespace-nowrap overflow-hidden text-ellipsis">{pdfNom}</span>
                        <span className="text-[11px] text-[#9CA3AF]">Toca para ver el catálogo completo de planes</span>
                      </div>
                      <button
                        className="flex items-center gap-[3px] bg-none border-none text-[#0094C0] text-[12px] font-semibold cursor-pointer whitespace-nowrap px-[6px] py-[4px] rounded-[6px] transition-colors duration-150 hover:bg-[#DBEAFE] outline-none focus:outline-none"
                        onClick={(e) => { e.stopPropagation(); abrirVisor(); }}
                      >
                        Ver&nbsp;
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  );
                })()}

                {/* Mensajes */}
                <div className="flex-1 overflow-y-auto px-3 py-[14px] flex flex-col gap-[10px] bg-[#FAFAFA] [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-thumb]:bg-[#E5E7EB] [&::-webkit-scrollbar-thumb]:rounded-[99px]">
                  {mensajesChat.map((msg, i) => (
                    <div key={i} className={`flex gap-2 items-end ${msg.tipo === "usuario" ? "flex-row-reverse" : "flex-row"}`}>
                      {msg.tipo === "bot" && (
                        <div className="w-[28px] h-[28px] rounded-full bg-[#DBEAFE] flex items-center justify-center flex-shrink-0">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0094C0" strokeWidth="2" strokeLinecap="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                        </div>
                      )}
                      <div className={`max-w-[75%] flex flex-col gap-[3px] ${msg.tipo === "usuario" ? "items-end" : "items-start"}`}>
                        <p className={`m-0 px-3 py-[9px] rounded-[14px] text-[12.5px] leading-[1.5] whitespace-pre-line ${msg.tipo === "bot" ? "bg-[var(--surface-color)] text-[#1C1917] rounded-tl-[4px] shadow-[0_1px_3px_rgba(0,0,0,0.07)]" : "bg-[#0094C0] text-white rounded-tr-[4px]"}`}>{msg.texto}</p>
                        <span className="text-[10px] text-[#9CA3AF]">{msg.hora}</span>
                      </div>
                    </div>
                  ))}
                  <div ref={refFinChat} />
                </div>

                {/* Quick replies */}
                <div className="flex flex-wrap gap-[6px] px-3 py-2 border-t border-[#F3F4F6] bg-[var(--surface-color)] flex-shrink-0 max-[700px]:flex-wrap max-[700px]:gap-[6px] max-[700px]:pb-3">
                  {CHATBOT_QUICK.map((q) => (
                    <button
                      key={q}
                      className="text-[11px] font-medium px-[11px] py-[5px] rounded-[20px] border-[1.5px] border-[#BAE6FD] bg-[#F0F9FF] text-[#0369A1] cursor-pointer transition-all duration-150 whitespace-nowrap hover:bg-[#0094C0] hover:border-[#0094C0] hover:text-white outline-none focus:outline-none"
                      onClick={() => handleEnviarChat(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>

                {/* Input */}
                <div className="flex items-center gap-[6px] px-3 py-[10px] border-t border-[#F3F4F6] bg-[var(--surface-color)] flex-shrink-0">
                  <input
                    className="flex-1 border-[1.5px] border-[#E5E7EB] rounded-[20px] px-[14px] py-2 text-[12.5px] outline-none bg-[#FAFAFA] text-[#1C1917] transition-[border-color] duration-[0.18s] focus:border-[#0094C0] placeholder:text-[#9CA3AF]"
                    placeholder="Escribe tu pregunta..."
                    value={inputChat}
                    onChange={(e) => setInputChat(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleEnviarChat(inputChat)}
                  />
                  <button
                    className="w-9 h-9 rounded-full bg-[#0094C0] border-none cursor-pointer flex items-center justify-center flex-shrink-0 transition-[background,transform] duration-[0.18s] hover:bg-[#0077A8] hover:scale-[1.08] outline-none focus:outline-none"
                    onClick={() => handleEnviarChat(inputChat)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M22 2L11 13" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2.2" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            )}{/* /chat */}

          </div>

        {/* FAB chat */}
        <button
          className={`absolute bottom-[18px] right-[18px] z-30 w-12 h-12 rounded-full border-none cursor-pointer flex items-center justify-center transition-[background,transform] duration-[0.18s] hover:scale-[1.08] outline-none focus:outline-none ${chatVisible ? "bg-[#9CA3AF] hover:bg-[#6B7280]" : "bg-[#0094C0] shadow-[0_4px_16px_rgba(0,148,192,0.45)] hover:bg-[#0077A8]"}`}
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

      {/* ── Visor PDF in-app ── */}
      <VisorCatalogoPDF
        estaAbierto={!!visorPdf}
        alCerrar={() => setVisorPdf(null)}
        pdfUrl={visorPdf?.url || ""}
        pdfNombre={visorPdf?.nombre || ""}
        pdfTamanio={visorPdf?.tamanio || ""}
        accentColor="#0094C0"
      />

    </div>
  );
}

export default SelectorPlanContaPlex;
