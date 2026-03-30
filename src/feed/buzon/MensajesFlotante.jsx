import React, { useState, useRef, useEffect } from "react";
import { CONVERSACIONES_MOCK, SUGERIDOS_MOCK } from "./mensajes.data";
import { useSesion } from "../../identidad/sesion/SesionContext";
import "./MensajesFlotante.css";

const TABS = [
  { id: "todos",    label: "Todos"     },
  { id: "noLeidos", label: "No leídos" },
  { id: "grupos",   label: "Grupos"    },
];

/* ── clases reutilizables ── */
const tabClass = (activo) =>
  `flex-1 py-[10px] border-none bg-transparent text-[13px] cursor-pointer border-b-2 transition-[color,border-color] duration-200 font-[inherit] ${
    activo
      ? "text-[var(--primary-color)] border-b-[var(--primary-color)] font-semibold"
      : "text-[var(--text-muted)] border-b-transparent font-medium hover:text-[var(--text-dark)]"
  }`;

const popupBtnClass = "bg-transparent border-none text-white cursor-pointer p-1 rounded-[6px] flex items-center justify-center transition-[background] duration-200 hover:bg-[rgba(255,255,255,0.2)]";

/* ═══════════════════════════════════════════
   BOTÓN FLOTANTE
═══════════════════════════════════════════ */
function BotonFlotante({ totalSinLeer, onClick }) {
  return (
    <button
      className="relative flex items-center justify-between w-[251px] h-14 px-5 text-white border-none rounded-[50px] text-[14px] font-semibold cursor-pointer shadow-[var(--shadow-lg)] transition-[transform,box-shadow] duration-200 hover:-translate-y-[2px] hover:shadow-[var(--shadow-primary)] [@media(max-width:768px)]:w-[56px] [@media(max-width:768px)]:h-[56px] [@media(max-width:768px)]:rounded-full [@media(max-width:768px)]:p-0 [@media(max-width:768px)]:justify-center"
      style={{ background: 'var(--gradient-primary)' }}
      onClick={onClick}
    >
      <span className="flex items-center gap-2">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span className="[@media(max-width:768px)]:hidden">Mensajes</span>
      </span>
      {totalSinLeer > 0 && (
        <span className="bg-[#ef4444] text-white text-[11px] font-bold min-w-5 h-5 rounded-full flex items-center justify-center ml-[2px] [@media(max-width:768px)]:absolute [@media(max-width:768px)]:-top-1 [@media(max-width:768px)]:-right-1 [@media(max-width:768px)]:ml-0">
          {totalSinLeer}
        </span>
      )}
    </button>
  );
}

/* ═══════════════════════════════════════════
   ITEM DE CONVERSACIÓN
═══════════════════════════════════════════ */
function ConversacionItem({ conversacion, onClick }) {
  const { nombre, avatar, ultimoMensaje, hora, sinLeer } = conversacion;
  return (
    <button
      className="flex items-center gap-3 w-full px-4 py-[10px] border-none bg-transparent cursor-pointer text-left transition-[background] duration-150 hover:bg-[var(--hover-color)]"
      onClick={() => onClick(conversacion)}
    >
      <div className="relative shrink-0">
        <img src={avatar} alt={nombre} className="w-[42px] h-[42px] rounded-full object-cover" />
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-[2px]">
        <span className="text-[14px] font-semibold text-[var(--text-dark)]">{nombre}</span>
        <span className="text-[12px] text-[var(--text-muted)] truncate">{ultimoMensaje}</span>
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className="text-[11px] text-[var(--text-muted)]">{hora}</span>
        {sinLeer > 0 && (
          <span className="w-5 h-5 bg-[var(--primary-color)] text-white text-[11px] font-bold rounded-full flex items-center justify-center">
            {sinLeer}
          </span>
        )}
      </div>
    </button>
  );
}

/* ═══════════════════════════════════════════
   CONTACTO SUGERIDO
═══════════════════════════════════════════ */
function SugeridoItem({ contacto }) {
  return (
    <div className="flex items-center gap-3 px-4 py-[10px]">
      <div className="relative shrink-0">
        <img src={contacto.avatar} alt={contacto.nombre} className="w-[42px] h-[42px] rounded-full object-cover" />
        {contacto.enLinea && (
          <span className="absolute bottom-[1px] right-[1px] w-[10px] h-[10px] bg-[#22c55e] rounded-full border-2 border-[var(--white-color)]" />
        )}
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-[2px]">
        <span className="text-[14px] font-semibold text-[var(--text-dark)]">{contacto.nombre}</span>
        <span className="text-[12px] text-[var(--text-muted)] truncate">
          {contacto.enLinea ? "En Línea" : "Desconectado"}
        </span>
      </div>
      <button className="px-[14px] py-[6px] bg-[var(--primary-color)] text-white border-none rounded-[20px] text-[12px] font-semibold cursor-pointer shrink-0 transition-[background] duration-200 hover:bg-[var(--secondary-color)]">
        Mensaje
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════
   POPUP LISTA
═══════════════════════════════════════════ */
function PopupLista({ onCerrar, onAbrirChat, onExpandir }) {
  const [tabActivo, setTabActivo] = useState("todos");

  const conversacionesFiltradas = CONVERSACIONES_MOCK.filter((c) => {
    if (tabActivo === "noLeidos") return c.sinLeer > 0;
    return true;
  });

  return (
    <div className="mensajes-popup w-[380px] h-[520px] bg-[var(--white-color)] rounded-[16px] shadow-[var(--shadow-lg)] border border-[var(--border-color)] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-[14px] min-h-[50px]" style={{ background: 'var(--gradient-primary)', color: 'white' }}>
        <div className="flex items-center gap-2 font-semibold text-[15px]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span>Mensajes</span>
        </div>
        <div className="flex items-center gap-1">
          <button className={popupBtnClass} title="Ir a Mensajes" onClick={onExpandir}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
            </svg>
          </button>
          <button className={popupBtnClass} title="Cerrar" onClick={onCerrar}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-4 mt-3 border-b border-[var(--border-color)]">
        {TABS.map((tab) => (
          <button key={tab.id} className={tabClass(tabActivo === tab.id)} onClick={() => setTabActivo(tab.id)}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Lista */}
      <div className="flex-1 overflow-y-auto py-2">
        <div className="px-4 pt-[10px] pb-[6px] text-[11px] font-bold text-[var(--text-muted)] tracking-[0.5px]">RECIENTES</div>
        {conversacionesFiltradas.map((conv) => (
          <ConversacionItem key={conv.id} conversacion={conv} onClick={onAbrirChat} />
        ))}
        {tabActivo === "todos" && (
          <>
            <div className="px-4 pt-[10px] pb-[6px] text-[11px] font-bold text-[var(--text-muted)] tracking-[0.5px]">SUGERIDOS</div>
            {SUGERIDOS_MOCK.map((contacto) => (
              <SugeridoItem key={contacto.id} contacto={contacto} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   VISTA DE CHAT
═══════════════════════════════════════════ */
function VistaChat({ conversacion, onVolver, onCerrar }) {
  const [mensaje,    setMensaje]  = useState("");
  const [mensajes,   setMensajes] = useState(conversacion.mensajes);
  const [escribiendo]             = useState(true);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [mensajes]);

  const enviarMensaje = () => {
    if (!mensaje.trim()) return;
    setMensajes([...mensajes, {
      id: `m-${Date.now()}`,
      texto: mensaje,
      hora: new Date().toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" }),
      esPropio: true,
    }]);
    setMensaje("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); enviarMensaje(); }
  };

  return (
    <div className="mensajes-popup w-[380px] h-[520px] bg-[var(--white-color)] rounded-[16px] shadow-[var(--shadow-lg)] border border-[var(--border-color)] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-[14px] min-h-[50px]" style={{ background: 'var(--gradient-primary)', color: 'white' }}>
        <div className="flex items-center gap-2">
          <button className="bg-transparent border-none text-white cursor-pointer p-[2px] flex items-center" onClick={onVolver}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <img src={conversacion.avatar} alt={conversacion.nombre} className="w-8 h-8 rounded-full object-cover" />
          <div className="flex flex-col gap-[1px]">
            <span className="text-[14px] font-semibold">{conversacion.nombre}</span>
            <span className="text-[11px] opacity-[0.85]">{conversacion.ultimaActividad}</span>
          </div>
        </div>
        <button className={popupBtnClass} title="Cerrar" onClick={onCerrar}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>
      </div>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-[var(--background-color)]" ref={chatRef}>
        {mensajes.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 max-w-[80%] ${msg.esPropio ? "self-end flex-row-reverse" : "self-start"}`}
          >
            {!msg.esPropio && (
              <img src={conversacion.avatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0" />
            )}
            <div
              className={`mensajes-burbuja-contenido py-[10px] px-[14px] rounded-[18px] text-[13px] leading-[1.4] ${
                msg.esPropio
                  ? "bg-[var(--primary-color)] text-white rounded-br-[4px]"
                  : "bg-[var(--surface-color)] text-[var(--text-dark)] rounded-bl-[4px]"
              }`}
            >
              <p>{msg.texto}</p>
              <span className="block text-[10px] mt-1 opacity-60">{msg.hora}</span>
            </div>
          </div>
        ))}
        {escribiendo && (
          <div className="flex items-end gap-2 max-w-[80%] self-start">
            <img src={conversacion.avatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0" />
            <div className="mensajes-burbuja-contenido mensajes-escribiendo py-3 px-4 rounded-[18px] bg-[var(--surface-color)] text-[var(--text-dark)] rounded-bl-[4px] flex items-center gap-1">
              <span className="dot w-2 h-2 bg-[var(--primary-color)] rounded-full" />
              <span className="dot w-2 h-2 bg-[var(--primary-color)] rounded-full" />
              <span className="dot w-2 h-2 bg-[var(--primary-color)] rounded-full" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-4 py-3 border-t border-[var(--border-color)] bg-[var(--white-color)]">
        <input
          type="text"
          placeholder="Escribe tu mensaje.."
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 py-[10px] px-[14px] border border-[var(--border-color)] rounded-[24px] text-[13px] bg-[var(--input-bg)] text-[var(--input-text)] outline-none transition-[border-color] duration-200 focus:border-[var(--primary-color)] placeholder:text-[var(--text-muted)]"
        />
        <button
          className="w-[38px] h-[38px] rounded-full border-none bg-[var(--primary-color)] text-white cursor-pointer flex items-center justify-center shrink-0 transition-[background] duration-200 hover:bg-[var(--secondary-color)] disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={enviarMensaje}
          disabled={!mensaje.trim()}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ORQUESTADOR
═══════════════════════════════════════════ */
function MensajesFlotante({ alNavegar }) {
  const { modoExploracion, comenzarAutenticacion } = useSesion();
  const [estado,     setEstado]     = useState("cerrado");
  const [chatActivo, setChatActivo] = useState(null);
  const [esMobile,   setEsMobile]   = useState(window.innerWidth <= 768);
  const totalSinLeer = CONVERSACIONES_MOCK.reduce((sum, c) => sum + c.sinLeer, 0);

  useEffect(() => {
    const handleResize = () => setEsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cerrarTodo  = () => { setEstado("cerrado"); setChatActivo(null); };
  const expandir    = () => { cerrarTodo(); if (alNavegar) alNavegar("mensajes"); };
  const abrirChat   = (conv) => { setChatActivo(conv); setEstado("chat"); };
  const volverLista = () => { setChatActivo(null); setEstado("lista"); };

  return (
    <div className="fixed bottom-[35px] right-6 [@media(max-width:480px)]:right-3 z-[999] flex flex-col items-end gap-3">
      {!esMobile && estado === "lista" && (
        <PopupLista onCerrar={cerrarTodo} onAbrirChat={abrirChat} onExpandir={expandir} />
      )}
      {!esMobile && estado === "chat" && chatActivo && (
        <VistaChat conversacion={chatActivo} onVolver={volverLista} onCerrar={cerrarTodo} />
      )}
      <BotonFlotante
        totalSinLeer={totalSinLeer}
        onClick={modoExploracion
          ? comenzarAutenticacion
          : (esMobile ? expandir : (estado === "cerrado" ? () => setEstado("lista") : cerrarTodo))
        }
      />
    </div>
  );
}

export default MensajesFlotante;
