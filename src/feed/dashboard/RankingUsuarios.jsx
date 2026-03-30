import React from "react";
import Icon from "../../ui/Icon/Icon";

const USERS = [
  { img: 33, name: "Carlos Valverde", percentage: 98 },
  { img: 34, name: "María González",  percentage: 85 },
  { img: 35, name: "Juan Pérez",      percentage: 55 },
  { img: 36, name: "Ana Torres",      percentage: 8  },
];

function getRankData(percentage) {
  if (percentage >= 90) return { icon: "libro_diamante", color: "#00E5FF", name: "Diamante" };
  if (percentage >= 70) return { icon: "libro_oro",      color: "#FFD700", name: "Oro" };
  if (percentage >= 40) return { icon: "libro_plata",    color: "#C0C0C0", name: "Plata" };
  return                       { icon: "libro_bronce",   color: "#CD7F32", name: "Bronce" };
}

function UserItem({ img, name, percentage }) {
  const rank = getRankData(percentage);

  return (
    <div className="group flex justify-between items-center py-4 border-b border-[var(--border-color)] last:border-b-0 [@media(max-width:480px)]:py-3">
      <div className="flex items-center gap-[14px] flex-1">
        <div className="relative shrink-0">
          <img
            src={`https://i.pravatar.cc/150?img=${img}`}
            alt={name}
            className="w-[60px] h-[60px] rounded-full object-cover transition-transform duration-300 group-hover:scale-105 [@media(max-width:768px)]:w-[50px] [@media(max-width:768px)]:h-[50px] [@media(max-width:480px)]:w-[45px] [@media(max-width:480px)]:h-[45px]"
            style={{
              border: `3px solid ${rank.color}`,
              boxShadow: `0 0 0 2px white, 0 0 12px ${rank.color}60`,
            }}
          />
          <div className="absolute -top-[6px] -left-[6px] w-7 h-7 bg-[var(--white-color)] rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.15)] z-10 [@media(max-width:768px)]:w-6 [@media(max-width:768px)]:h-6 [@media(max-width:768px)]:-top-1 [@media(max-width:768px)]:-left-1 [@media(max-width:480px)]:w-[22px] [@media(max-width:480px)]:h-[22px]">
            <Icon name={rank.icon} size={18} />
          </div>
        </div>
        <div className="flex-1">
          <div className="text-[15px] font-semibold text-[var(--text-dark)] mb-1 [@media(max-width:768px)]:text-[14px] [@media(max-width:480px)]:text-[13px]">{name}</div>
          <div className="text-[13px] text-[var(--text-muted)] [@media(max-width:480px)]:text-[12px]">
            Contador · <span style={{ color: rank.color }}>{rank.name}</span>
          </div>
        </div>
      </div>

      <div className="text-right min-w-[100px] [@media(max-width:768px)]:min-w-[80px]">
        <div className="text-[22px] font-bold mb-[2px] [@media(max-width:768px)]:text-[18px] [@media(max-width:480px)]:text-[16px]" style={{ color: rank.color }}>
          {percentage}%
        </div>
        <div className="text-[11px] text-[var(--text-muted)] font-semibold tracking-[0.5px] mb-[6px] [@media(max-width:480px)]:text-[10px]">SKILLS</div>
        <div className="w-full h-[6px] bg-[var(--border-color)] rounded-[10px] overflow-hidden [@media(max-width:480px)]:w-[60px]">
          <div
            className="h-full rounded-[10px] transition-[width] duration-500"
            style={{
              width: `${percentage}%`,
              background: "linear-gradient(90deg, #7F0DF2, #674BEA, #588CE5)",
              opacity: percentage === 0 ? 0.3 : 1,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function RankingUsuarios() {
  return (
    <div className="bg-[var(--white-color)] p-[25px] rounded-[15px] shadow-[0_2px_8px_rgba(0,0,0,0.05)] [@media(max-width:480px)]:p-5">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-[10px] text-[18px] font-bold text-[var(--text-dark)]">
          <Icon name="libro_ranking" size={30} />
          <span>Top Usuarios</span>
        </div>
        <span className="flex items-center gap-[6px] bg-[var(--warning-bg)] text-[var(--warning-text)] px-3 py-[6px] rounded-[20px] text-[12px] font-semibold">
          <span>⭐</span>
          <span>Semanal</span>
        </span>
      </div>

      <div className="flex flex-col gap-5 mb-5">
        {USERS.map((user) => (
          <UserItem key={user.img} {...user} />
        ))}
      </div>

      <button className="w-full py-3 bg-transparent border-2 border-[var(--primary-color)] rounded-[10px] text-[var(--primary-color)] font-semibold text-[14px] cursor-pointer transition-all duration-300 hover:bg-[var(--primary-color)] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(127,13,242,0.2)]">
        Ver todos los usuarios
      </button>
    </div>
  );
}

export default RankingUsuarios;
