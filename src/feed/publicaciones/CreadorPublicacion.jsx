import React, { useState } from "react";
import Icon from "../../ui/Icon/Icon";
import { useSesion } from "../../identidad/sesion/SesionContext";

const POST_TABS = [
  { id: "post",     icon: "post",     label: "Post" },
  { id: "videos",   icon: "videos",   label: "Videos" },
  { id: "encuesta", icon: "encuesta", label: "Encuesta" },
];

const actionBtnCls = (activo) =>
  `flex items-center gap-2 px-[15px] py-[10px] border border-[var(--border-color)] bg-transparent rounded-[8px] cursor-pointer text-[14px] transition-all duration-300 ${
    activo
      ? "bg-[var(--hover-color)] text-[var(--primary-color)] border-[var(--primary-color)]"
      : "text-[var(--text-dark)] hover:bg-[var(--hover-color)]"
  }`;

function CreadorPublicacion({ onPublicar }) {
  const { modoExploracion, comenzarAutenticacion, usuario } = useSesion();
  const [activeTab, setActiveTab] = useState("post");
  const [texto, setTexto] = useState("");
  const [publicando, setPublicando] = useState(false);

  const demoBlock = modoExploracion
    ? { onClick: comenzarAutenticacion, title: "Inicia sesión para usar esta función", style: { cursor: "not-allowed", opacity: 0.6 } }
    : {};

  const handlePublicar = () => {
    if (!texto.trim() || publicando) return;
    setPublicando(true);
    setTimeout(() => {
      onPublicar(texto, usuario?.nombre, 12, activeTab);
      setTexto("");
      setPublicando(false);
    }, 400);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handlePublicar();
    }
  };

  return (
    <div className="bg-[var(--white-color)] p-[25px] rounded-[15px] shadow-[0_2px_8px_rgba(0,0,0,0.05)] [@media(max-width:480px)]:p-5 [@media(max-width:480px)]:px-[15px]">
      <div className="flex items-center gap-[15px] mb-5">
        {modoExploracion ? (
          <div className="w-9 h-9 rounded-full bg-[var(--border-light)] border-2 border-dashed border-[var(--border-color)] flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>
        ) : (
          <img
            src={usuario?.avatar || "https://i.pravatar.cc/150?img=12"}
            alt={usuario?.nombre || "Usuario"}
            className="w-[50px] h-[50px] rounded-full shrink-0 object-cover"
          />
        )}
        <input
          type="text"
          placeholder={modoExploracion ? "Inicia sesión para publicar..." : `¿Qué estas pensando, ${usuario?.nombre?.split(" ")[0] || ""}?`}
          className="flex-1 border border-[var(--border-color)] px-[15px] py-3 rounded-[10px] text-[14px] outline-none transition-all duration-300 bg-[var(--white-color)] text-[var(--text-dark)] focus:border-[var(--primary-color)] focus:shadow-[0_0_0_3px_rgba(127,13,242,0.1)]"
          value={modoExploracion ? "" : texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={!modoExploracion ? handleKeyDown : undefined}
          readOnly={modoExploracion}
          {...(modoExploracion ? { onClick: comenzarAutenticacion, style: { cursor: "not-allowed" } } : {})}
        />
      </div>
      <div className="flex justify-between items-center [@media(max-width:768px)]:flex-col [@media(max-width:768px)]:gap-[15px] [@media(max-width:768px)]:items-stretch">
        <div className="flex gap-[10px] [@media(max-width:768px)]:w-full [@media(max-width:768px)]:justify-around">
          {POST_TABS.map(({ id, icon, label }) => (
            <button
              key={id}
              className={actionBtnCls(activeTab === id)}
              onClick={modoExploracion ? comenzarAutenticacion : () => setActiveTab(id)}
              title={modoExploracion ? "Inicia sesión para usar esta función" : undefined}
              style={modoExploracion ? { cursor: "not-allowed", opacity: 0.6 } : undefined}
            >
              <Icon name={icon} size={18} />
              <span>{label}</span>
            </button>
          ))}
        </div>
        <button
          className="border-none px-[30px] py-[10px] rounded-[8px] text-white font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(127,13,242,0.3)] disabled:opacity-50 [@media(max-width:768px)]:w-full"
          style={{ background: "linear-gradient(135deg, var(--primary-color), var(--secondary-color))" }}
          onClick={modoExploracion ? comenzarAutenticacion : handlePublicar}
          disabled={!modoExploracion && (!texto.trim() || publicando)}
          {...(modoExploracion ? demoBlock : {})}
        >
          {publicando ? "Publicando..." : "Publicar"}
        </button>
      </div>
    </div>
  );
}

export default CreadorPublicacion;
