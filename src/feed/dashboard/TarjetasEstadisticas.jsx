import React from "react";
import Icon from "../../ui/Icon/Icon";

const STATS = [
  { title: "Tus post",    icon: "tusPost",     iconSize: 18, value: 10 },
  { title: "Tus Videos",  icon: "videos",      iconSize: 20, value: 10 },
  { title: "Compartidos", icon: "compartidos", iconSize: 18, value: 10 },
];

function StatCard({ title, icon, iconSize, value }) {
  return (
    <div className="p-[25px] rounded-[15px] text-white relative overflow-hidden [@media(max-width:480px)]:p-5" style={{ background: "var(--gradient-primary)" }}>
      <div className="flex justify-between items-center mb-[15px]">
        <span className="text-[14px] opacity-90">{title}</span>
        <div className="w-10 h-10 bg-[rgba(255,255,255,0.2)] rounded-[10px] flex items-center justify-center text-[20px]">
          <Icon name={icon} size={iconSize} />
        </div>
      </div>
      <div className="text-[32px] font-bold mb-[10px] [@media(max-width:480px)]:text-[28px]">{value}</div>
      <div className="flex items-center gap-[5px] text-[13px] opacity-90">
        <Icon name="flecha" size={18} />
        <span>+5% este mes</span>
      </div>
    </div>
  );
}

function TarjetasEstadisticas() {
  return (
    <div className="grid grid-cols-3 gap-5 min-w-0 [@media(max-width:768px)]:grid-cols-1 [@media(max-width:768px)]:gap-[15px]">
      {STATS.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}

export default TarjetasEstadisticas;
