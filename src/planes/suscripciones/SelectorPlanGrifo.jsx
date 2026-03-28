import React, { useState, useRef, useEffect } from "react";
import VisorCatalogoPDF from "../../ui/visor-catalogo/VisorCatalogoPDF";
import {
 PRECIOS_GRIFO,
 FEATURES_LISTA_GRIFO,
 FEATURES_GRIFO,
 CHATBOT_PREGUNTAS_GRIFO,
 CHATBOT_RESPUESTAS_GRIFO,
 CHATBOT_BIENVENIDA_GRIFO,
} from "./grifo.data";


/* ═══════════════════════════════════════════
 ÍCONOS
═══════════════════════════════════════════ */
function IconoGrifo({ size = 48 }) {
 return (
 <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
 <rect width="48" height="48" rx="12" fill="#B91C1C" />
 <rect x="8" y="28" width="7" height="12" rx="1.5" fill="white" />
 <rect x="20" y="20" width="7" height="20" rx="1.5" fill="#FCA5A5" />
 <rect x="33" y="12" width="7" height="28" rx="1.5" fill="white" />
 <path d="M11.5 22 L23.5 15 L36.5 8" stroke="#FCA5A5" strokeWidth="2" strokeLinecap="round" />
 <circle cx="11.5" cy="22" r="2.5" fill="white" />
 <circle cx="23.5" cy="15" r="2.5" fill="white" />
 <circle cx="36.5" cy="8" r="2.5" fill="white" />
 </svg>
 );
}

function IconoCheck({ dark = false }) {
 const bg = dark ? "rgba(255,255,255,0.2)" : "#FEE2E2";
 const color = dark ? "#fff" : "#B91C1C";
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
 <rect width="36" height="36" rx="8" fill="#FEE2E2" />
 <path d="M10 8h12l6 6v18H10V8z" fill="#B91C1C" />
 <path d="M22 8l6 6h-6V8z" fill="#7F1D1D" />
 <text x="13" y="26" fontSize="7" fill="white" fontWeight="bold">PDF</text>
 </svg>
 );
}


/* ═══════════════════════════════════════════
 POPOVER DETALLE DE FEATURE
═══════════════════════════════════════════ */
function PopoverDetalleFeature({ nombreFeature, onCerrar }) {
 const info = FEATURES_GRIFO[nombreFeature];
 if (!info) return null;

 return (
 <div className="absolute inset-0 z-50 bg-black/[0.28] backdrop-blur-[3px] flex items-center justify-center rounded-[22px] [animation:modal-fade_0.18s_ease]" onClick={onCerrar}>
 <div className="bg-surface rounded-[18px] p-[24px_22px_22px] w-[300px] max-w-[88%] relative shadow-[0_12px_40px_rgba(0,0,0,0.16)] [animation:modal-pop-in_0.2s_cubic-bezier(0.34,1.56,0.64,1)]" onClick={(e) => e.stopPropagation()}>
 <button className="absolute top-3 right-3 w-6 h-6 rounded-full bg-base border-0 cursor-pointer flex items-center justify-center transition-colors hover:bg-line" onClick={onCerrar}>
 <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
 <path d="M2 2L8 8M8 2L2 8" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" />
 </svg>
 </button>
 <h4 className="text-[15px] font-bold text-fg m-0 mb-2.5 pr-5 leading-[1.3]">{info.titulo}</h4>
 <p className="text-[13px] text-fg leading-[1.6] m-0">{info.desc}</p>
 </div>
 </div>
 );
}


/* ═══════════════════════════════════════════
 COMPONENTE PRINCIPAL
═══════════════════════════════════════════ */
function SelectorPlanGrifo({ estaAbierto, alCerrar, alProcederPago }) {

 const [periodoFacturacion, setPeriodoFacturacion] = useState("mensual");
 const [planSeleccionado, setPlanSeleccionado] = useState(null);
 const [featureAbierta, setFeatureAbierta] = useState(null);
 const [chatVisible, setChatVisible] = useState(false);
 const [visorPdf, setVisorPdf] = useState(null);

 const [mensajesChat, setMensajesChat] = useState([CHATBOT_BIENVENIDA_GRIFO]);
 const [inputChat, setInputChat] = useState("");
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
 setFeatureAbierta(null);
 setChatVisible(false);
 setMensajesChat([CHATBOT_BIENVENIDA_GRIFO]);
 alCerrar();
 };

 if (!estaAbierto) return null;

 const handleClickOverlay = (e) => {
 if (e.target === e.currentTarget) handleClose();
 };

 const labelPeriodo = periodoFacturacion === "mensual" ? "/mes" : "/año";
 const precioGrifo = PRECIOS_GRIFO.grifo[periodoFacturacion];

 const handleConfirmarPlan = () => {
 const precio = planSeleccionado === "gratis" ? "0" : precioGrifo.replace(",", "");
 alProcederPago?.({ planNombre: planSeleccionado, precio, billing: periodoFacturacion });
 };

 const handleEnviarChat = (texto) => {
 if (!texto.trim()) return;
 const hora = new Date().toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });
 setMensajesChat((prev) => [...prev, { tipo: "usuario", texto, hora }]);
 setInputChat("");
 setTimeout(() => {
 const resp = CHATBOT_RESPUESTAS_GRIFO[texto] ||
 "Gracias por tu consulta. Un asesor te contactará pronto para brindarte más información.";
 setMensajesChat((prev) => [...prev, { tipo: "bot", texto: resp, hora }]);
 }, 800);
 };


 const nombrePlanDisplay = planSeleccionado === "gratis" ? "Gratis"
 : planSeleccionado === "grifo" ? "Plan Grifo" : "";


 return (
 <div className="fixed inset-0 z-[9999] bg-[rgba(40,8,8,0.55)] backdrop-blur-[6px] flex items-center justify-center p-4 [animation:modal-fade_0.22s_ease]" onClick={handleClickOverlay}>
 <div className="bg-surface rounded-[22px] w-full max-w-[820px] max-h-[90vh] overflow-hidden relative flex flex-col [animation:modal-slide_0.28s_cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_24px_80px_rgba(0,0,0,0.22)]">

 {/* Cerrar */}
 <button className="absolute top-3.5 right-3.5 z-10 w-[30px] h-[30px] rounded-full border-0 cursor-pointer flex items-center justify-center transition-all hover:scale-110 outline-none bg-[#B91C1C] hover:bg-[#7F1D1D]" onClick={handleClose}>
 <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
 <path d="M2 2L12 12M12 2L2 12" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
 </svg>
 </button>

 {/* Body */}
 <div className="relative flex-1 min-h-0 overflow-hidden flex flex-col">
 <div className="flex-1 min-h-0 overflow-y-auto px-7 pt-5 pb-20 box-border relative z-[1] [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#FECACA] max-[700px]:px-3.5 max-[700px]:pt-4 max-[700px]:pb-24">

 {/* Volver */}
 <button className="inline-flex items-center gap-1.5 bg-transparent border-0 text-[13px] font-semibold text-fg cursor-pointer px-2 py-1 rounded-lg mb-1.5 transition-colors hover:bg-black/[0.06] outline-none" onClick={handleClose}>
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
 <path d="M19 12H5M12 19l-7-7 7-7" />
 </svg>
 Volver
 </button>

 {/* Header */}
 <div className="flex flex-col items-center text-center gap-1.5 mb-5">
 <IconoGrifo size={48} />
 <h2 className="text-[22px] font-extrabold text-fg m-0 max-[700px]:text-[19px]">Gestión-Plex Grifo</h2>
 <p className="text-[13.5px] text-muted m-0">
 Software especializado para grifos ,elige el plan perfecto para ti&nbsp; con comprobantes ilimitados
 </p>

 <div className="flex gap-2 flex-wrap justify-center mt-0.5">
 <span className="border-[1.5px] border-[#FECACA] rounded-full px-3.5 py-1 text-xs font-medium bg-surface text-[#B91C1C]">1 mes gratis</span>
 <span className="border-[1.5px] border-[#FECACA] rounded-full px-3.5 py-1 text-xs font-medium bg-surface text-[#B91C1C]">IGV incluido</span>
 <span className="border-[1.5px] border-[#FECACA] rounded-full px-3.5 py-1 text-xs font-medium bg-surface text-[#B91C1C]">Actualizaciones</span>
 <span className="border-[1.5px] border-[#FECACA] rounded-full px-3.5 py-1 text-xs font-medium bg-surface text-[#B91C1C]">S/3,000 implementación</span>
 </div>

 <div className="inline-flex bg-base rounded-[10px] p-1 gap-1 mt-1">
 <button
 className={`px-6 py-2 rounded-lg border-0 text-[13.5px] font-semibold cursor-pointer transition-all outline-none${periodoFacturacion === "mensual" ? " bg-[#7F1D1D] text-white shadow-[0_2px_8px_rgba(127,29,29,0.35)]" : " bg-transparent text-muted"}`}
 onClick={() => setPeriodoFacturacion("mensual")}
 >Mensual</button>
 <button
 className={`px-6 py-2 rounded-lg border-0 text-[13.5px] font-semibold cursor-pointer transition-all outline-none${periodoFacturacion === "anual" ? " bg-[#7F1D1D] text-white shadow-[0_2px_8px_rgba(127,29,29,0.35)]" : " bg-transparent text-muted"}`}
 onClick={() => setPeriodoFacturacion("anual")}
 >Anual</button>
 </div>
 </div>

 {/* Scroll horizontal de planes */}
 <div
 className="flex overflow-x-auto gap-3.5 pb-2.5 cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:h-[5px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#FECACA] md:justify-center"
 ref={refPlanesScroll}
 onMouseDown={handlePlanesMouseDown}
 onMouseMove={handlePlanesMouseMove}
 onMouseUp={handlePlanesMouseUp}
 onMouseLeave={handlePlanesMouseUp}
 >

 {/* ── Plan Gratis ── */}
 <div className={`bg-surface border-[1.5px] border-line rounded-2xl px-4 pt-5 pb-[18px] flex flex-col gap-3 transition-[box-shadow,border-color] duration-[180ms] relative flex-[0_0_210px] min-w-[210px] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]${planSeleccionado === "gratis" ? " border-2 border-[#B91C1C] shadow-[0_4px_20px_rgba(185,28,28,0.18)]" : ""}`}>
 <h3 className="text-[17px] font-bold m-0 text-[#B91C1C]">Gratis</h3>

 <div className="flex items-baseline gap-0.5 text-fg">
 <span className="text-[18px] font-bold">s/</span>
 <span className="text-[34px] font-extrabold leading-none max-[700px]:text-[28px]">0</span>
 <span className="text-xs font-medium opacity-70">{labelPeriodo}</span>
 </div>

 <div className="flex flex-wrap gap-1.5">
 <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full border-[1.5px] border-[#FECACA] text-[#B91C1C] bg-transparent">1 Empresa</span>
 <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full border-[1.5px] border-[#FECACA] text-[#B91C1C] bg-transparent">Ilimitados</span>
 </div>

 <ul className="list-none p-0 m-0 flex flex-col gap-[7px] flex-1">
 {FEATURES_LISTA_GRIFO.map((f) => (
 <li key={f} className="flex items-start gap-1.5 text-xs text-fg leading-[1.4] cursor-pointer rounded-md px-1 py-0.5 -mx-1 transition-colors hover:bg-[rgba(185,28,28,0.08)]" onClick={() => setFeatureAbierta(f)}>
 <IconoCheck />
 <span>{f}</span>
 </li>
 ))}
 </ul>

 <button
 className={`outline-none w-full py-[10px] rounded-[10px] text-[13.5px] font-bold cursor-pointer transition-all mt-auto${planSeleccionado === "gratis" ? " bg-[#B91C1C] text-white border-0" : " bg-transparent border-2 border-[#B91C1C] text-[#B91C1C] hover:bg-[#B91C1C] hover:text-white"}`}
 onClick={() => setPlanSeleccionado("gratis")}
 >
 {planSeleccionado === "gratis" ? "Seleccionado" : "Elegir Plan"}
 </button>
 </div>

 {/* ── Plan Grifo (dark) ── */}
 <div className={`bg-[#7F1D1D] border-[#7F1D1D] rounded-2xl px-4 pt-[42px] pb-[18px] flex flex-col gap-3 transition-[box-shadow,border-color] duration-[180ms] relative flex-[0_0_210px] min-w-[210px] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]${planSeleccionado === "grifo" ? " border-2 border-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.25)]" : " border-[1.5px]"}`}>
 <div className="absolute -top-px left-1/2 -translate-x-1/2 bg-[#B91C1C] text-white text-[10px] font-bold tracking-[1px] px-[18px] py-[6px] rounded-[0_0_12px_12px] whitespace-nowrap">TODO INCLUIDO</div>

 <h3 className="text-[17px] font-bold m-0 text-white">Plan Grifo</h3>

 <div className="flex items-baseline gap-0.5 text-white">
 <span className="text-[18px] font-bold">s/</span>
 <span className="text-[34px] font-extrabold leading-none max-[700px]:text-[28px]">{precioGrifo}</span>
 <span className="text-xs font-medium opacity-70">{labelPeriodo}</span>
 </div>

 <div className="flex flex-wrap gap-1.5">
 <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full border-[1.5px] border-white/55 text-white bg-transparent">1 Empresa</span>
 <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full border-[1.5px] border-white/55 text-white bg-transparent">Ilimitados</span>
 </div>

 <ul className="list-none p-0 m-0 flex flex-col gap-[7px] flex-1">
 {FEATURES_LISTA_GRIFO.map((f) => (
 <li key={f} className="flex items-start gap-1.5 text-xs text-white leading-[1.4] cursor-pointer rounded-md px-1 py-0.5 -mx-1 transition-colors hover:bg-white/15" onClick={() => setFeatureAbierta(f)}>
 <IconoCheck dark />
 <span><u>{f}</u></span>
 </li>
 ))}
 </ul>

 <button
 className={`outline-none w-full py-[10px] rounded-[10px] text-[13.5px] font-bold cursor-pointer transition-all mt-auto${planSeleccionado === "grifo" ? " bg-white/15 border-0 text-white" : " bg-transparent border-2 border-white/70 text-white hover:bg-white/15 hover:border-white"}`}
 onClick={() => setPlanSeleccionado("grifo")}
 >
 {planSeleccionado === "grifo" ? "Seleccionado" : "Elegir Plan"}
 </button>
 </div>

 </div>{/* /planes scroll */}

 {/* Hint chat */}
 <div className="flex items-center justify-end gap-1.5 mt-3.5 text-[13px] text-muted cursor-pointer hover:text-[#B91C1C]" onClick={() => setChatVisible(true)}>
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round">
 <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
 </svg>
 <span>¿Tienes dudas sobre los planes?</span>
 </div>

 {planSeleccionado && (
 <button className="flex items-center justify-center gap-2 text-white border-0 rounded-[10px] py-[13px] px-6 text-sm font-bold cursor-pointer w-full mt-2.5 transition-[background,transform] duration-200 hover:-translate-y-px [animation:modal-fade_0.2s_ease] bg-[#B91C1C] hover:bg-[#7F1D1D]" onClick={handleConfirmarPlan}>
 Continuar con {nombrePlanDisplay}
 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
 <path d="M5 12h14M12 5l7 7-7 7" />
 </svg>
 </button>
 )}

 {/* dimmed overlay */}
 {chatVisible && <div className="absolute inset-0 bg-black/[0.22] z-[2] rounded-[22px] pointer-events-auto" />}

 </div>{/* /planes-wrap */}

 {chatVisible && (
 <div className="hidden max-[700px]:block fixed inset-0 z-[10000] bg-black/45 [animation:modal-fade_0.22s_ease]" onClick={() => setChatVisible(false)} />
 )}

 {/* Panel chat */}
 {chatVisible && (
 <div className="absolute top-1/2 -translate-y-1/2 right-4 w-[360px] h-[88%] max-h-[560px] z-10 flex flex-col bg-surface rounded-[18px] shadow-[0_8px_40px_rgba(0,0,0,0.18)] overflow-hidden [animation:modal-chat-in_0.28s_cubic-bezier(0.34,1.3,0.64,1)] max-[700px]:fixed max-[700px]:top-auto max-[700px]:bottom-4 max-[700px]:left-2 max-[700px]:right-2 max-[700px]:w-[calc(100%-16px)] max-[700px]:h-auto max-[700px]:max-h-[80vh] max-[700px]:translate-y-0 max-[700px]:z-[10001] max-[700px]:rounded-[20px] max-[700px]:[animation:modal-chat-mobile-in_0.3s_cubic-bezier(0.34,1.2,0.64,1)]">
 <div className="bg-[#7F1D1D] px-4 py-3.5 flex items-center justify-between gap-2.5 shrink-0">
 <div className="flex items-center gap-2.5">
 <div className="w-[38px] h-[38px] rounded-full bg-white/20 flex items-center justify-center shrink-0">
 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
 <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
 </svg>
 </div>
 <div>
 <div className="text-[13.5px] font-bold text-white">Asistente Grifo</div>
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

 <div
 className="flex items-center gap-2.5 px-3.5 py-2.5 border-b border-line-light shrink-0 cursor-pointer bg-surface"
 onClick={() => setVisorPdf({
 url: "/catalogos/gestionplex-grifo-2025.pdf",
 nombre: "Catálogo GestiónPlex Grifo 2025.pdf",
 tamanio: "PDF · Catálogo completo de planes"
 })}
 >
 <IconoPdf />
 <div className="flex-1 min-w-0 flex flex-col">
 <span className="text-xs font-semibold whitespace-nowrap overflow-hidden text-ellipsis text-[#B91C1C]">Catálogo GestiónPlex Grifo 2025.pdf</span>
 <span className="text-[11px] text-subtle">Toca para ver el catálogo completo de planes</span>
 </div>
 <button
 className="flex items-center gap-0.5 bg-transparent border-0 text-xs font-semibold cursor-pointer whitespace-nowrap px-1.5 py-1 rounded-md transition-colors text-[#B91C1C] hover:bg-[#FEE2E2]"
 onClick={(e) => { e.stopPropagation(); setVisorPdf({
 url: "/catalogos/gestionplex-grifo-2025.pdf",
 nombre: "Catálogo GestiónPlex Grifo 2025.pdf",
 tamanio: "PDF · Catálogo completo de planes"
 }); }}
 >
 Ver&nbsp;
 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
 <path d="M5 12h14M12 5l7 7-7 7" />
 </svg>
 </button>
 </div>

 <div className="flex-1 overflow-y-auto px-3 py-3.5 flex flex-col gap-2.5 bg-base [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-thumb]:bg-line [&::-webkit-scrollbar-thumb]:rounded-full">
 {mensajesChat.map((msg, i) => (
 <div key={i} className={`flex gap-2 items-end${msg.tipo === "usuario" ? " flex-row-reverse" : " flex-row"}`}>
 {msg.tipo === "bot" && (
 <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-[#FEE2E2]">
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round">
 <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
 </svg>
 </div>
 )}
 <div className={`max-w-[75%] flex flex-col gap-[3px]${msg.tipo === "bot" ? " items-start" : " items-end"}`}>
 <p className={`m-0 px-3 py-[9px] text-[12.5px] leading-[1.5] whitespace-pre-line${msg.tipo === "bot" ? " bg-surface text-fg rounded-[4px_14px_14px_14px] shadow-[0_1px_3px_rgba(0,0,0,0.07)]" : " bg-[#B91C1C] text-white rounded-[14px_4px_14px_14px]"}`}>{msg.texto}</p>
 <span className="text-[10px] text-subtle">{msg.hora}</span>
 </div>
 </div>
 ))}
 <div ref={refFinChat} />
 </div>

 <div className="flex flex-wrap gap-1.5 px-3 py-2 border-t border-line-light bg-surface shrink-0">
 {CHATBOT_PREGUNTAS_GRIFO.map((q) => (
 <button key={q} className="text-[11px] font-medium px-[11px] py-[5px] rounded-full border-[1.5px] cursor-pointer transition-all whitespace-nowrap border-[#FECACA] bg-surface text-[#B91C1C] hover:bg-[#B91C1C] hover:border-[#B91C1C] hover:text-white" onClick={() => handleEnviarChat(q)}>
 {q}
 </button>
 ))}
 </div>

 <div className="flex items-center gap-1.5 px-3 py-2.5 border-t border-line-light bg-surface shrink-0">
 <input
 className="flex-1 border-[1.5px] border-line rounded-full px-3.5 py-2 text-[12.5px] outline-none bg-base text-fg transition-colors placeholder:text-subtle focus:border-[#B91C1C]"
 placeholder="Escribe tu pregunta..."
 value={inputChat}
 onChange={(e) => setInputChat(e.target.value)}
 onKeyDown={(e) => e.key === "Enter" && handleEnviarChat(inputChat)}
 />
 <button className="w-9 h-9 rounded-full border-0 cursor-pointer flex items-center justify-center shrink-0 transition-[background,transform] duration-[180ms] hover:scale-[1.08] bg-[#B91C1C] hover:bg-[#7F1D1D]" onClick={() => handleEnviarChat(inputChat)}>
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
 <path d="M22 2L11 13" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
 <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2.2" strokeLinejoin="round" />
 </svg>
 </button>
 </div>
 </div>
 )}{/* /chat */}

 </div>{/* /body */}

 {/* Popover feature */}
 {featureAbierta && (
 <PopoverDetalleFeature
 nombreFeature={featureAbierta}
 onCerrar={() => setFeatureAbierta(null)}
 />
 )}

 {/* FAB chat */}
 <button
 className={`absolute bottom-[18px] right-[18px] z-30 w-12 h-12 rounded-full border-0 cursor-pointer flex items-center justify-center transition-[background,transform] duration-[180ms] hover:scale-[1.08] shadow-[0_4px_16px_rgba(185,28,28,0.45)]${chatVisible ? " bg-[#9CA3AF] hover:bg-[#6B7280]" : " bg-[#B91C1C] hover:bg-[#7F1D1D]"}`}
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

 </div>{/* /modal */}

 <VisorCatalogoPDF
 estaAbierto={!!visorPdf}
 alCerrar={() => setVisorPdf(null)}
 pdfUrl={visorPdf?.url || ""}
 pdfNombre={visorPdf?.nombre || ""}
 pdfTamanio={visorPdf?.tamanio || ""}
 accentColor="#B91C1C"
 />

 </div>
 );
}

export default SelectorPlanGrifo;
