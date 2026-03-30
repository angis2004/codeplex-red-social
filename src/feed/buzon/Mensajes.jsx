import React, { useState, useRef, useEffect } from "react";
import { CONVERSACIONES_MOCK } from "./mensajes.data";
import { useSesion } from "../../identidad/sesion/SesionContext";
import PerfilPublico from "../perfil-publico/PerfilPublico";
import "./Mensajes.css";

const TABS = [
  { id: "todos",      label: "Todos"      },
  { id: "grupos",     label: "Grupos"     },
  { id: "solicitudes",label: "Solicitudes"},
];

/* ── clases reutilizables ── */
const tabClass = (activo) =>
  `flex-1 py-[10px] border-none bg-transparent text-[13px] cursor-pointer border-b-2 transition-[color,border-color] duration-200 font-[inherit] ${
    activo
      ? "text-[var(--primary-color)] border-b-[var(--primary-color)] font-semibold"
      : "text-[var(--text-muted)] border-b-transparent font-medium hover:text-[var(--text-dark)]"
  }`;

/* ═══════════════════════════════════════════
   ITEM DE CONVERSACIÓN
═══════════════════════════════════════════ */
function ConversacionItem({ conversacion, activa, onClick }) {
  const { nombre, avatar, ultimoMensaje, hora, sinLeer } = conversacion;
  return (
    <button
      className={`flex items-center gap-3 w-full px-5 py-3 border-none bg-transparent cursor-pointer text-left transition-[background] duration-150 border-l-[3px] hover:bg-[var(--hover-color)] ${
        activa ? "bg-[var(--hover-color)] border-l-[var(--primary-color)]" : "border-l-transparent"
      }`}
      onClick={() => onClick(conversacion)}
    >
      <div className="relative shrink-0">
        <img src={avatar} alt={nombre} className="w-11 h-11 rounded-full object-cover" />
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-[3px]">
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
   PANEL VACÍO
═══════════════════════════════════════════ */
function PanelVacio({ bloquearDemo }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 p-10 text-center">
      <div className="w-20 h-20 flex items-center justify-center">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-[var(--text-dark)] m-0">Tus Mensajes</h2>
      <p className="text-[14px] text-[var(--text-muted)] max-w-[320px] leading-[1.5] m-0">
        Conecta con otros profesionales de tu red. Haz preguntas, comparte conocimiento y colabora.
      </p>
      <button
        className="px-7 py-3 bg-[var(--primary-color)] text-white border-none rounded-[24px] text-[14px] font-semibold cursor-pointer mt-2 transition-[background,transform] duration-200 hover:bg-[var(--secondary-color)] hover:-translate-y-px"
        {...bloquearDemo}
      >
        Iniciar Conversación
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PANEL DE CHAT
═══════════════════════════════════════════ */
function PanelChat({ conversacion, onVolver, onVerPerfil }) {
  const [mensaje,    setMensaje]    = useState("");
  const [mensajes,   setMensajes]   = useState(conversacion.mensajes);
  const [escribiendo]               = useState(true);
  const chatRef = useRef(null);

  useEffect(() => { setMensajes(conversacion.mensajes); }, [conversacion]);
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
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header del contacto */}
      <div className="flex items-center justify-between px-6 py-[14px] border-b border-[var(--border-color)] bg-[var(--white-color)]">
        <div className="flex items-center gap-3">
          <button
            className="flex sm:hidden items-center bg-transparent border-none text-[var(--text-dark)] cursor-pointer p-1"
            onClick={onVolver}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <img src={conversacion.avatar} alt={conversacion.nombre} className="w-10 h-10 rounded-full object-cover" />
          <div className="flex flex-col gap-[2px]">
            <span className="text-[15px] font-semibold text-[var(--text-dark)]">{conversacion.nombre}</span>
            <span className="text-[12px] text-[var(--primary-color)]">{conversacion.ultimaActividad}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-[10px]" ref={chatRef}>
        {/* Perfil resumido scrolleable */}
        <div className="flex flex-col items-center px-6 py-6 gap-2">
          <img src={conversacion.avatar} alt={conversacion.nombre} className="w-20 h-20 rounded-full object-cover" />
          <h3 className="text-[18px] font-bold text-[var(--text-dark)] m-0">{conversacion.nombre}</h3>
          <span className="text-[12px] text-[var(--text-muted)]">{conversacion.especialidad}</span>
          <button
            className="px-5 py-2 bg-[var(--primary-color)] text-white border-none rounded-[20px] text-[13px] font-semibold cursor-pointer mt-1 transition-[background] duration-200 hover:bg-[var(--secondary-color)]"
            onClick={onVerPerfil}
          >
            Ver Perfil
          </button>
        </div>

        {mensajes.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 max-w-[65%] ${msg.esPropio ? "self-end flex-row-reverse" : "self-start"}`}
          >
            {!msg.esPropio && (
              <img src={conversacion.avatar} alt="" className="w-[30px] h-[30px] rounded-full object-cover shrink-0" />
            )}
            <div
              className={`msj-burbuja-contenido py-[10px] px-4 rounded-[18px] text-[14px] leading-[1.45] ${
                msg.esPropio
                  ? "bg-[var(--primary-color)] text-white rounded-br-[4px]"
                  : "bg-[var(--surface-color)] text-[var(--text-dark)] rounded-bl-[4px]"
              }`}
            >
              <p>{msg.texto}</p>
            </div>
          </div>
        ))}

        <span className="text-center text-[11px] text-[var(--text-muted)] my-1">
          {mensajes[mensajes.length - 1]?.hora}
        </span>

        {escribiendo && (
          <div className="flex items-end gap-2 max-w-[65%] self-start">
            <img src={conversacion.avatar} alt="" className="w-[30px] h-[30px] rounded-full object-cover shrink-0" />
            <div className="msj-burbuja-contenido msj-escribiendo py-3 px-4 rounded-[18px] bg-[var(--surface-color)] text-[var(--text-dark)] rounded-bl-[4px] flex items-center gap-1">
              <span className="dot w-2 h-2 bg-[var(--primary-color)] rounded-full" />
              <span className="dot w-2 h-2 bg-[var(--primary-color)] rounded-full" />
              <span className="dot w-2 h-2 bg-[var(--primary-color)] rounded-full" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex items-center gap-[10px] px-6 py-[14px]">
        <input
          type="text"
          placeholder="Escribe tu mensaje.."
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 py-3 px-[18px] border border-[var(--border-color)] rounded-[24px] text-[14px] bg-[var(--input-bg)] text-[var(--input-text)] outline-none transition-[border-color] duration-200 focus:border-[var(--primary-color)] placeholder:text-[var(--text-muted)]"
        />
        <button
          className="w-[42px] h-[42px] rounded-full border-none bg-[var(--primary-color)] text-white cursor-pointer flex items-center justify-center shrink-0 transition-[background] duration-200 hover:bg-[var(--secondary-color)] disabled:opacity-50 disabled:cursor-not-allowed"
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
function Mensajes() {
  const { modoExploracion, comenzarAutenticacion } = useSesion();
  const [tabActivo,       setTabActivo]       = useState("todos");
  const [busqueda,        setBusqueda]        = useState("");
  const [chatActivo,      setChatActivo]      = useState(null);
  const [perfilContacto,  setPerfilContacto]  = useState(null);

  const bloquearDemo = modoExploracion
    ? { onClick: comenzarAutenticacion, title: "Inicia sesión para usar esta función", style: { cursor: "not-allowed", opacity: 0.6 } }
    : {};

  const conversacionesFiltradas = CONVERSACIONES_MOCK.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (perfilContacto) {
    return (
      <PerfilPublico
        usuario={perfilContacto}
        onVolver={() => setPerfilContacto(null)}
        onEnviarMensaje={() => { setChatActivo(perfilContacto); setPerfilContacto(null); }}
        textoAmistad="Amigos"
      />
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-[320px_1fr] [@media(min-width:900px)]:grid-cols-[380px_1fr] h-[calc(100vh-var(--header-height,120px)-46px)] sm:h-[calc(100vh-var(--header-height,96px)-54px)] bg-[var(--white-color)] rounded-[16px] shadow-[var(--shadow-sm)] overflow-hidden`}>

      {/* ── Panel izquierdo: lista ── */}
      <div className={`flex-col border-r border-[var(--border-color)] overflow-hidden ${chatActivo ? "hidden sm:flex" : "flex"}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 min-h-[56px]" style={{ background: 'var(--gradient-primary)', color: 'white' }}>
          <div className="flex items-center gap-2 font-semibold text-[16px]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>Mensajes</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="bg-transparent border-none text-white cursor-pointer p-[6px] rounded-[8px] flex items-center justify-center transition-[background] duration-200 hover:bg-[rgba(255,255,255,0.2)]" title="Nueva conversación" {...bloquearDemo}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            </button>
            <button className="bg-transparent border-none text-white cursor-pointer p-[6px] rounded-[8px] flex items-center justify-center transition-[background] duration-200 hover:bg-[rgba(255,255,255,0.2)]" title="Cerrar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
        </div>

        {/* Búsqueda */}
        <div className="px-5 pt-[14px] pb-[10px]">
          <input
            type="text"
            placeholder={modoExploracion ? "Inicia sesión para buscar..." : "Buscar conversación .."}
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            readOnly={modoExploracion}
            className="w-full py-[10px] px-4 border border-[var(--border-color)] rounded-[24px] text-[13px] bg-[var(--input-bg)] text-[var(--input-text)] outline-none transition-[border-color] duration-200 focus:border-[var(--primary-color)] placeholder:text-[var(--text-muted)]"
            {...(modoExploracion ? { onClick: comenzarAutenticacion, style: { cursor: "not-allowed" } } : {})}
          />
        </div>

        {/* Tabs */}
        <div className="flex px-5 border-b border-[var(--border-color)]">
          {TABS.map((tab) => (
            <button key={tab.id} className={tabClass(tabActivo === tab.id)} onClick={() => setTabActivo(tab.id)}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Lista */}
        <div className="flex-1 overflow-y-auto py-2">
          <div className="px-5 pt-3 pb-[6px] text-[11px] font-bold text-[var(--text-muted)] tracking-[0.5px]">RECIENTES</div>
          {conversacionesFiltradas.map((conv) => (
            <ConversacionItem
              key={conv.id}
              conversacion={conv}
              activa={chatActivo?.id === conv.id}
              onClick={modoExploracion ? comenzarAutenticacion : setChatActivo}
            />
          ))}
        </div>
      </div>

      {/* ── Panel derecho ── */}
      <div className={`flex-col overflow-hidden bg-[var(--background-color)] ${chatActivo ? "flex" : "hidden sm:flex"}`}>
        {chatActivo ? (
          <PanelChat
            conversacion={chatActivo}
            onVolver={() => setChatActivo(null)}
            onVerPerfil={() => setPerfilContacto(chatActivo)}
          />
        ) : (
          <PanelVacio bloquearDemo={bloquearDemo} />
        )}
      </div>
    </div>
  );
}

export default Mensajes;
