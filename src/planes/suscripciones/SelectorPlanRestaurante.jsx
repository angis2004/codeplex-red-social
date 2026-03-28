import React, { useState, useRef, useEffect } from "react";
import VisorCatalogoPDF from "../../ui/visor-catalogo/VisorCatalogoPDF";
import {
 PRECIOS_RESTAURANTE,
 FEATURES_RESTAURANTE,
 FEATURES_COMUNES_RESTAURANTE,
 FEATURES_GOLD_RESTAURANTE,
 CHATBOT_PREGUNTAS_RESTAURANTE,
 CHATBOT_RESPUESTAS_RESTAURANTE,
 CHATBOT_BIENVENIDA_RESTAURANTE,
} from "./restaurante.data";





/* ═══════════════════════════════════════════
 ÍCONOS — SVG inline
 Separados en componentes para reutilización
 y legibilidad del árbol JSX principal.
═══════════════════════════════════════════ */

/* Ícono del producto: restaurante (tenedor + cuchillo) */
function IconoProductoRestaurante({ size = 48 }) {
 return (
 <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
 <rect width="48" height="48" rx="12" fill="#F97316" />
 <rect x="12" y="14" width="5" height="22" rx="2.5" fill="white" opacity="0.5" />
 <rect x="20" y="14" width="5" height="16" rx="2.5" fill="white" opacity="0.8" />
 <rect x="28" y="14" width="5" height="10" rx="2.5" fill="white" />
 </svg>
 );
}

/* Check verde para features incluidas */
function IconoCheckFeature({ sobreDorado = false }) {
 const colorCirculo = sobreDorado ? "rgba(255,255,255,0.2)" : "#FEF3C7";
 const colorCheck = sobreDorado ? "#fff" : "#F97316";
 return (
 <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}>
 <circle cx="7.5" cy="7.5" r="7.5" fill={colorCirculo} />
 <path d="M4.5 7.5L6.5 9.5L10.5 5.5" stroke={colorCheck} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
 </svg>
 );
}

/* X roja para features no incluidas / limitadas */
function IconoXFeatureNoDisponible({ sobreDorado = false }) {
 return (
 <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0 }}>
 <circle cx="5" cy="5" r="5" fill={sobreDorado ? "rgba(255,255,255,0.2)" : "#FEE2E2"} />
 <path d="M3.5 3.5L6.5 6.5M6.5 3.5L3.5 6.5" stroke={sobreDorado ? "#fff" : "#EF4444"} strokeWidth="1.4" strokeLinecap="round" />
 </svg>
 );
}

/* Ícono PDF para el adjunto del chatbot */
function IconoPdfAdjunto() {
 return (
 <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
 <rect width="36" height="36" rx="8" fill="#FEF3C7" />
 <path d="M10 8h12l6 6v18H10V8z" fill="#F59E0B" />
 <path d="M22 8l6 6h-6V8z" fill="#D97706" />
 <text x="13" y="26" fontSize="7" fill="white" fontWeight="bold">PDF</text>
 </svg>
 );
}


/* ═══════════════════════════════════════════
 POPOVER DE DETALLE DE FEATURE
 Se abre al hacer click en cualquier feature
 de cualquier plan. Muestra título y descripción
 detallada del feature seleccionado.
═══════════════════════════════════════════ */
function PopoverDetalleFeature({ nombreFeature, onCerrar }) {
 const info = FEATURES_RESTAURANTE[nombreFeature];
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
function SelectorPlanRestaurante({ estaAbierto, alCerrar, alProcederPago }) {

 /* ── Estado del modal ── */
 const [periodoFacturacion, setPeriodoFacturacion] = useState("mensual"); // "mensual" | "anual"
 const [planSeleccionado, setPlanSeleccionado] = useState(""); // "" | "gratis" | "basico" | "gold"
 const [featureAbierta, setFeatureAbierta] = useState(null); // nombre del feature en popover
 const [chatVisible, setChatVisible] = useState(false);
 const [visorPdf, setVisorPdf] = useState(null);

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

 /* ── Estado del chatbot ── */
 const [mensajesChat, setMensajesChat] = useState([CHATBOT_BIENVENIDA_RESTAURANTE]);
 const [inputChat, setInputChat] = useState("");
 const refFinChat = useRef(null);

 /* Scroll automático al último mensaje del chat */
 useEffect(() => {
 if (chatVisible) refFinChat.current?.scrollIntoView({ behavior: "smooth" });
 }, [mensajesChat, chatVisible]);

 /* No renderizar si el modal está cerrado */
 if (!estaAbierto) return null;

 /* Cerrar modal al clickear el overlay */
 const handleClickOverlay = (e) => {
 if (e.target === e.currentTarget) alCerrar();
 };

 /* ── Precios calculados según periodo ── */
 const precioBasico = PRECIOS_RESTAURANTE.basico[periodoFacturacion];
 const precioGold = PRECIOS_RESTAURANTE.gold[periodoFacturacion];
 const labelPeriodo = periodoFacturacion === "mensual" ? "/mes" : "/año";

 /* Nombre legible del plan seleccionado para el botón "Continuar" */
 const NOMBRES_PLANES = { gratis: "Gratis", basico: "Básico", gold: "Gold" };
 const nombrePlanDisplay = NOMBRES_PLANES[planSeleccionado] || "";

 /* ── Confirmar selección de plan → sube al padre ── */
 const handleConfirmarPlan = () => {
 const precio =
 planSeleccionado === "gratis" ? "0"
 : planSeleccionado === "basico" ? precioBasico.replace(",", "")
 : precioGold.replace(",", "");

 /* TODO (backend): conectar con POST /api/suscripciones */
 alProcederPago?.({
 planNombre: planSeleccionado,
 precio,
 billing: periodoFacturacion,
 });
 };

 /* ── Chatbot: enviar mensaje y generar respuesta automática ── */
 const handleEnviarMensajeChat = (texto) => {
 if (!texto.trim()) return;
 const hora = new Date().toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });

 setMensajesChat((prev) => [...prev, { tipo: "usuario", texto, hora }]);
 setInputChat("");

 /* TODO (backend): reemplazar setTimeout con POST /api/chat */
 setTimeout(() => {
 const respuesta =
 CHATBOT_RESPUESTAS_RESTAURANTE[texto] ||
 "Gracias por tu consulta. Un asesor te contactará pronto para brindarte más información.";
 setMensajesChat((prev) => [...prev, { tipo: "bot", texto: respuesta, hora }]);
 }, 800);
 };


 /* ═══════════════════════════════════════
 RENDER
 ═══════════════════════════════════════ */
 return (
 <div className="fixed inset-0 z-[9999] bg-[rgba(15,10,30,0.55)] backdrop-blur-[6px] flex items-center justify-center p-4 [animation:modal-fade_0.22s_ease]" onClick={handleClickOverlay}>
 <div className="bg-surface rounded-[22px] w-full max-w-[740px] max-h-[90vh] overflow-hidden relative flex flex-col [animation:modal-slide_0.28s_cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_24px_80px_rgba(0,0,0,0.22)]">

 {/* ── Botón cerrar modal ── */}
 <button className="absolute top-3.5 right-3.5 z-10 w-[30px] h-[30px] rounded-full border-0 cursor-pointer flex items-center justify-center transition-all hover:scale-110 outline-none bg-[#F97316] hover:bg-[#EA580C]" onClick={alCerrar}>
 <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
 <path d="M2 2L12 12M12 2L2 12" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
 </svg>
 </button>

 {/* ── Body: columna planes + panel chat ── */}
 <div className="relative flex-1 min-h-0 overflow-hidden flex flex-col">

 {/* ══════════════════════════════════════
 COLUMNA IZQUIERDA — Planes de suscripción
 ══════════════════════════════════════ */}
 <div className="flex-1 min-h-0 overflow-y-auto px-8 pt-9 pb-20 box-border relative z-[1] [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#FCD9C0] max-[700px]:px-3.5 max-[700px]:pt-5 max-[700px]:pb-24">

 {/* ── Header del producto ── */}
 <div className="flex flex-col items-center text-center gap-2 mb-6">
 <IconoProductoRestaurante size={52} />
 <h2 className="text-[22px] font-extrabold text-fg m-0 max-[700px]:text-[18px]">Gestión-Plex Restaurantes</h2>
 <p className="text-[13.5px] text-muted m-0">Elige el plan perfecto para ti con comprobantes ilimitados</p>
 <div className="flex gap-2 flex-wrap justify-center mt-0.5">
 <span className="border-[1.5px] border-[#D1D5DB] rounded-full px-3.5 py-1 text-xs font-medium bg-surface text-fg">1 mes gratis</span>
 <span className="border-[1.5px] border-[#D1D5DB] rounded-full px-3.5 py-1 text-xs font-medium bg-surface text-fg">IGV incluido</span>
 </div>

 {/* Toggle periodo de facturación */}
 <div className="inline-flex bg-base rounded-[10px] p-1 gap-1 mt-1">
 <button
 className={`px-6 py-2 rounded-lg border-0 text-[13.5px] font-semibold cursor-pointer transition-all outline-none${periodoFacturacion === "mensual" ? " bg-[#F97316] text-white shadow-[0_2px_8px_rgba(249,115,22,0.4)]" : " bg-transparent text-muted"}`}
 onClick={() => setPeriodoFacturacion("mensual")}
 >
 Mensual
 </button>
 <button
 className={`px-6 py-2 rounded-lg border-0 text-[13.5px] font-semibold cursor-pointer transition-all outline-none${periodoFacturacion === "anual" ? " bg-[#F97316] text-white shadow-[0_2px_8px_rgba(249,115,22,0.4)]" : " bg-transparent text-muted"}`}
 onClick={() => setPeriodoFacturacion("anual")}
 >
 Anual
 </button>
 </div>
 </div>

 {/* ── Scroll horizontal de planes ── */}
 <div
 className="flex overflow-x-auto gap-3.5 pb-2.5 cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:h-[5px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#FCD9C0]"
 ref={refPlanesScroll}
 onMouseDown={handlePlanesMouseDown}
 onMouseMove={handlePlanesMouseMove}
 onMouseUp={handlePlanesMouseUp}
 onMouseLeave={handlePlanesMouseUp}
 >

 {/* ── Plan Gratis ── */}
 <div className={`bg-surface border-[1.5px] border-line rounded-2xl px-4 pt-5 pb-[18px] flex flex-col gap-3 transition-[box-shadow,border-color] duration-[180ms] relative flex-[0_0_210px] min-w-[210px] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]${planSeleccionado === "gratis" ? " border-2 border-[#F97316] shadow-[0_4px_20px_rgba(249,115,22,0.18)]" : ""}`}>
 <h3 className="text-[17px] font-bold m-0 text-[#F97316]">Gratis</h3>

 <div className="flex items-baseline gap-0.5 text-fg">
 <span className="text-[18px] font-bold">s/</span>
 <span className="text-[34px] font-extrabold leading-none max-[700px]:text-[28px]">0</span>
 <span className="text-xs font-medium opacity-70">{labelPeriodo}</span>
 </div>

 <div className="flex flex-wrap gap-1.5">
 <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full border-[1.5px] border-[#F97316] text-[#F97316] bg-transparent">1 Empresa</span>
 </div>

 <ul className="list-none p-0 m-0 flex flex-col gap-[7px] flex-1">
 {FEATURES_COMUNES_RESTAURANTE.map((feature) => (
 <li
 key={feature}
 className="flex items-start gap-1.5 text-xs text-fg leading-[1.4] cursor-pointer rounded-md px-1 py-0.5 -mx-1 transition-colors hover:bg-[rgba(249,115,22,0.08)]"
 onClick={() => setFeatureAbierta(feature)}
 >
 <IconoCheckFeature />
 <span>{feature}</span>
 </li>
 ))}
 <li
 className="flex items-start gap-1.5 text-xs text-fg leading-[1.4] cursor-pointer rounded-md px-1 py-0.5 -mx-1 transition-colors hover:bg-[rgba(249,115,22,0.08)]"
 onClick={() => setFeatureAbierta("3-sucursales(SOLO 2)")}
 >
 <IconoXFeatureNoDisponible />
 <span className="line-through text-subtle text-[11.5px]">3-sucursales(SOLO 2)</span>
 </li>
 </ul>

 <button
 className={`outline-none w-full py-[10px] rounded-[10px] text-[13.5px] font-bold cursor-pointer transition-all mt-auto${planSeleccionado === "gratis" ? " bg-[#F97316] text-white border-0" : " bg-transparent border-2 border-[#F97316] text-[#F97316] hover:bg-[#F97316] hover:text-white"}`}
 onClick={() => setPlanSeleccionado("gratis")}
 >
 {planSeleccionado === "gratis" ? "Seleccionado" : "Elegir Plan"}
 </button>
 </div>

 {/* ── Plan Básico ── */}
 <div className={`bg-surface border-[1.5px] border-line rounded-2xl px-4 pt-5 pb-[18px] flex flex-col gap-3 transition-[box-shadow,border-color] duration-[180ms] relative flex-[0_0_210px] min-w-[210px] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]${planSeleccionado === "basico" ? " border-2 border-[#F97316] shadow-[0_4px_20px_rgba(249,115,22,0.18)]" : ""}`}>
 <h3 className="text-[17px] font-bold m-0 text-[#F97316]">Básico</h3>

 <div className="flex items-baseline gap-0.5 text-fg">
 <span className="text-[18px] font-bold">s/</span>
 <span className="text-[34px] font-extrabold leading-none max-[700px]:text-[28px]">{precioBasico}</span>
 <span className="text-xs font-medium opacity-70">{labelPeriodo}</span>
 </div>

 <div className="flex flex-wrap gap-1.5">
 <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#F97316] text-white border-0">2 Empresas</span>
 <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#F97316] text-white border-0">1 mes gratis</span>
 </div>

 <ul className="list-none p-0 m-0 flex flex-col gap-[7px] flex-1">
 {FEATURES_COMUNES_RESTAURANTE.map((feature) => (
 <li
 key={feature}
 className="flex items-start gap-1.5 text-xs text-fg leading-[1.4] cursor-pointer rounded-md px-1 py-0.5 -mx-1 transition-colors hover:bg-[rgba(249,115,22,0.08)]"
 onClick={() => setFeatureAbierta(feature)}
 >
 <IconoCheckFeature />
 <span>{feature}</span>
 </li>
 ))}
 <li
 className="flex items-start gap-1.5 text-xs text-fg leading-[1.4] cursor-pointer rounded-md px-1 py-0.5 -mx-1 transition-colors hover:bg-[rgba(249,115,22,0.08)]"
 onClick={() => setFeatureAbierta("3-sucursales(SOLO 2)")}
 >
 <IconoXFeatureNoDisponible />
 <span className="line-through text-subtle text-[11.5px]">3-sucursales(SOLO 2)</span>
 </li>
 </ul>

 <button
 className={`outline-none w-full py-[10px] rounded-[10px] text-[13.5px] font-bold cursor-pointer transition-all mt-auto${planSeleccionado === "basico" ? " bg-[#F97316] text-white border-0" : " bg-transparent border-2 border-[#F97316] text-[#F97316] hover:bg-[#F97316] hover:text-white"}`}
 onClick={() => setPlanSeleccionado("basico")}
 >
 {planSeleccionado === "basico" ? "Seleccionado" : "Elegir Plan"}
 </button>
 </div>

 {/* ── Plan Gold (destacado) ── */}
 <div className={`bg-[#F97316] border-[#F97316] rounded-2xl px-4 pt-[44px] pb-[18px] flex flex-col gap-3 transition-[box-shadow,border-color] duration-[180ms] relative flex-[0_0_210px] min-w-[210px] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]${planSeleccionado === "gold" ? " border-2 border-white/70 shadow-[0_4px_20px_rgba(0,0,0,0.2)]" : " border-[1.5px]"}`}>
 <div className="absolute -top-px left-1/2 -translate-x-1/2 bg-[#431407] text-[#FED7AA] text-[10px] font-bold tracking-[1px] px-[20px] py-[6px] rounded-[0_0_12px_12px] whitespace-nowrap">MAS POPULAR</div>

 <h3 className="text-[17px] font-bold m-0 text-white">Gold</h3>

 <div className="flex items-baseline gap-0.5 text-white">
 <span className="text-[18px] font-bold">s/</span>
 <span className="text-[34px] font-extrabold leading-none max-[700px]:text-[28px]">{precioGold}</span>
 <span className="text-xs font-medium opacity-70">{labelPeriodo}</span>
 </div>

 <div className="flex flex-wrap gap-1.5">
 <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full border-[1.5px] border-white/60 text-white bg-transparent">3 Empresas</span>
 <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full border-[1.5px] border-white/60 text-white bg-transparent">1 mes gratis</span>
 </div>

 <ul className="list-none p-0 m-0 flex flex-col gap-[7px] flex-1">
 {/* Primer item: enlace al plan básico */}
 <li
 className="flex items-start gap-1.5 text-xs text-white leading-[1.4] cursor-pointer rounded-md px-1 py-0.5 -mx-1 transition-colors hover:bg-white/15 mb-0.5"
 onClick={() => setFeatureAbierta("Todo lo del Básico +")}
 >
 <IconoCheckFeature sobreDorado />
 <span><strong><u>Todo lo del Básico +</u></strong></span>
 </li>

 {/* Features exclusivos del Gold */}
 {FEATURES_GOLD_RESTAURANTE.map((feature) => (
 <li
 key={feature}
 className="flex items-start gap-1.5 text-xs text-white leading-[1.4] cursor-pointer rounded-md px-1 py-0.5 -mx-1 transition-colors hover:bg-white/15"
 onClick={() => setFeatureAbierta(feature)}
 >
 <IconoCheckFeature sobreDorado />
 <span><u>{feature}</u></span>
 </li>
 ))}
 </ul>

 <button
 className={`outline-none w-full py-[10px] rounded-[10px] text-[13.5px] font-bold cursor-pointer transition-all mt-auto border-2 border-white text-[#F97316]${planSeleccionado === "gold" ? " bg-white/85" : " bg-surface hover:bg-white/85"}`}
 onClick={() => setPlanSeleccionado("gold")}
 >
 {planSeleccionado === "gold" ? "Seleccionado" : "Elegir Plan"}
 </button>
 </div>

 </div>{/* /planes */}

 {/* ── Hint: abrir chatbot ── */}
 <div className="flex items-center justify-end gap-1.5 mt-3.5 text-[13px] text-muted cursor-pointer hover:text-[#F97316]">
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round">
 <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
 </svg>
 <span>¿Tienes dudas sobre los planes?</span>
 </div>

 {/* Botón confirmar — visible solo cuando hay plan seleccionado */}
 {planSeleccionado && (
 <button className="flex items-center justify-center gap-2 text-white border-0 rounded-[10px] py-[13px] px-6 text-sm font-bold cursor-pointer w-full mt-2.5 transition-[background,transform] duration-200 hover:-translate-y-px [animation:modal-fade_0.2s_ease] bg-[#F97316] hover:bg-[#EA580C]" onClick={handleConfirmarPlan}>
 Continuar con Plan {nombrePlanDisplay}
 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
 <path d="M5 12h14M12 5l7 7-7 7" />
 </svg>
 </button>
 )}

 {/* dimmed overlay */}
 {chatVisible && <div className="absolute inset-0 bg-black/[0.22] z-[2] rounded-[22px] pointer-events-auto" />}

 </div>{/* /planes-wrap */}

 {/* Backdrop oscuro para cerrar chat en mobile */}
 {chatVisible && (
 <div className="hidden max-[700px]:block fixed inset-0 z-[10000] bg-black/45 [animation:modal-fade_0.22s_ease]" onClick={() => setChatVisible(false)} />
 )}

 {/* ══════════════════════════════════════
 PANEL CHAT — Asistente virtual
 TODO (backend): conectar con endpoint AI
 ══════════════════════════════════════ */}
 {chatVisible && (
 <div className="absolute top-1/2 -translate-y-1/2 right-4 w-[360px] h-[86%] max-h-[520px] z-10 flex flex-col bg-surface rounded-[18px] shadow-[0_8px_40px_rgba(0,0,0,0.18)] overflow-hidden [animation:modal-chat-in_0.28s_cubic-bezier(0.34,1.3,0.64,1)] max-[700px]:fixed max-[700px]:top-auto max-[700px]:bottom-4 max-[700px]:left-2 max-[700px]:right-2 max-[700px]:w-[calc(100%-16px)] max-[700px]:h-auto max-[700px]:max-h-[80vh] max-[700px]:translate-y-0 max-[700px]:z-[10001] max-[700px]:rounded-[20px] max-[700px]:[animation:modal-chat-mobile-in_0.3s_cubic-bezier(0.34,1.2,0.64,1)]">

 {/* Header del chat */}
 <div className="bg-[#F97316] px-4 py-3.5 flex items-center justify-between gap-2.5 shrink-0">
 <div className="flex items-center gap-2.5">
 <div className="w-[38px] h-[38px] rounded-full bg-white/20 flex items-center justify-center shrink-0">
 <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
 <rect width="48" height="48" rx="12" fill="white" opacity="0.2" />
 <path d="M16 18h-4v14l4-4h16V18H16z" stroke="white" strokeWidth="2.5" strokeLinejoin="round" />
 </svg>
 </div>
 <div>
 <div className="text-[13.5px] font-bold text-white">Asistente Codeplex</div>
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

 {/* Adjunto: catálogo PDF del producto */}
 {/* TODO (backend): reemplazar href="#" con URL real del PDF */}
 <div
 className="flex items-center gap-2.5 px-3.5 py-2.5 border-b border-line-light shrink-0 cursor-pointer bg-base"
 onClick={() => setVisorPdf({
 url: "/catalogos/gestionplex-restaurante-2025.pdf",
 nombre: "Catálogo GestiónPlex Restaurantes 2025.pdf",
 tamanio: "PDF · Catálogo completo de planes"
 })}
 >
 <IconoPdfAdjunto />
 <div className="flex-1 min-w-0 flex flex-col">
 <span className="text-xs font-semibold whitespace-nowrap overflow-hidden text-ellipsis text-[#F97316]">Catálogo GestiónPlex Restaurantes 2025.pdf</span>
 <span className="text-[11px] text-subtle">Toca para ver el catálogo completo de planes</span>
 </div>
 <button
 className="flex items-center gap-0.5 bg-transparent border-0 text-xs font-semibold cursor-pointer whitespace-nowrap px-1.5 py-1 rounded-md transition-colors text-[#F97316] hover:bg-[#FEF3C7]"
 onClick={(e) => { e.stopPropagation(); setVisorPdf({
 url: "/catalogos/gestionplex-restaurante-2025.pdf",
 nombre: "Catálogo GestiónPlex Restaurantes 2025.pdf",
 tamanio: "PDF · Catálogo completo de planes"
 }); }}
 >
 Ver&nbsp;
 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
 <path d="M5 12h14M12 5l7 7-7 7" />
 </svg>
 </button>
 </div>

 {/* Historial de mensajes */}
 <div className="flex-1 overflow-y-auto px-3 py-3.5 flex flex-col gap-2.5 bg-base [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-thumb]:bg-line [&::-webkit-scrollbar-thumb]:rounded-full">
 {mensajesChat.map((mensaje, index) => (
 <div key={index} className={`flex gap-2 items-end${mensaje.tipo === "usuario" ? " flex-row-reverse" : " flex-row"}`}>
 {mensaje.tipo === "bot" && (
 <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-[#FEF3C7]">
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round">
 <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
 </svg>
 </div>
 )}
 <div className={`max-w-[75%] flex flex-col gap-[3px]${mensaje.tipo === "bot" ? " items-start" : " items-end"}`}>
 <p className={`m-0 px-3 py-[9px] text-[12.5px] leading-[1.5] whitespace-pre-line${mensaje.tipo === "bot" ? " bg-surface text-fg rounded-[4px_14px_14px_14px] shadow-[0_1px_3px_rgba(0,0,0,0.07)]" : " bg-[#F97316] text-white rounded-[14px_4px_14px_14px]"}`}>{mensaje.texto}</p>
 <span className="text-[10px] text-subtle">{mensaje.hora}</span>
 </div>
 </div>
 ))}
 <div ref={refFinChat} />
 </div>

 {/* Respuestas rápidas predefinidas */}
 <div className="flex flex-wrap gap-1.5 px-3 py-2 border-t border-line-light bg-surface shrink-0">
 {CHATBOT_PREGUNTAS_RESTAURANTE.map((pregunta) => (
 <button
 key={pregunta}
 className="text-[11px] font-medium px-[11px] py-[5px] rounded-full border-[1.5px] cursor-pointer transition-all whitespace-nowrap border-[#FCD9C0] bg-surface text-[#EA580C] hover:bg-[#F97316] hover:border-[#F97316] hover:text-white"
 onClick={() => handleEnviarMensajeChat(pregunta)}
 >
 {pregunta}
 </button>
 ))}
 </div>

 {/* Input libre del usuario */}
 <div className="flex items-center gap-1.5 px-3 py-2.5 border-t border-line-light bg-surface shrink-0">
 <input
 className="flex-1 border-[1.5px] border-line rounded-full px-3.5 py-2 text-[12.5px] outline-none bg-base text-fg transition-colors placeholder:text-subtle focus:border-[#F97316]"
 placeholder="Escribe tu pregunta..."
 value={inputChat}
 onChange={(e) => setInputChat(e.target.value)}
 onKeyDown={(e) => e.key === "Enter" && handleEnviarMensajeChat(inputChat)}
 />
 <button className="w-9 h-9 rounded-full border-0 cursor-pointer flex items-center justify-center shrink-0 transition-[background,transform] duration-[180ms] hover:scale-[1.08] bg-[#F97316] hover:bg-[#EA580C]" onClick={() => handleEnviarMensajeChat(inputChat)}>
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
 <path d="M22 2L11 13" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
 <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2.2" strokeLinejoin="round" />
 </svg>
 </button>
 </div>

 </div>
 )}{/* /chat */}

 </div>{/* /body */}

 {/* ── Popover detalle de feature (sobre todo el modal) ── */}
 {featureAbierta && (
 <PopoverDetalleFeature
 nombreFeature={featureAbierta}
 onCerrar={() => setFeatureAbierta(null)}
 />
 )}

 {/* ── FAB flotante para abrir/cerrar chatbot ── */}
 <button
 className={`absolute bottom-[18px] right-[18px] z-30 w-12 h-12 rounded-full border-0 cursor-pointer flex items-center justify-center transition-[background,transform] duration-[180ms] hover:scale-[1.08] shadow-[0_4px_16px_rgba(249,115,22,0.45)]${chatVisible ? " bg-[#9CA3AF] hover:bg-[#6B7280]" : " bg-[#F97316] hover:bg-[#EA580C]"}`}
 onClick={() => setChatVisible(!chatVisible)}
 title="Asistente virtual"
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
 accentColor="#F97316"
 />

 </div>
 );
}

export default SelectorPlanRestaurante;
