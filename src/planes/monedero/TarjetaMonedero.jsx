import React from "react";
import Icon from "../../ui/Icon/Icon";

function TarjetaMonedero() {
  return (
    <div className="bg-[var(--white-color)] p-[25px] rounded-[15px] shadow-[0_2px_8px_rgba(0,0,0,0.05)] max-w-full overflow-hidden [@media(max-width:768px)]:p-5 [@media(max-width:480px)]:p-4">
      <div className="flex items-center gap-[10px] mb-5 flex-wrap">
        <div className="w-10 h-10 bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] rounded-full flex items-center justify-center text-white text-[20px] font-bold shrink-0">$</div>
        <span className="font-bold text-[var(--text-dark)] text-[18px] flex-1">Mi Monedero</span>
        <span className="text-[var(--primary-color)] ml-auto cursor-pointer transition-all duration-200 hover:opacity-100 hover:scale-105">
          <Icon name="informacion" size={25} />
        </span>
      </div>

      {/* Círculo SVG — mantiene clase balance-circle para sus estilos SVG complejos */}
      <div className="balance-circle">
        <svg viewBox="0 0 200 200">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#7F0DF2", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#588CE5", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <circle className="circle-bg" cx="100" cy="100" r="85" />
          <circle className="circle-progress" cx="100" cy="100" r="85" strokeDasharray="534" strokeDashoffset="133.5" />
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-5">
          <div className="text-[48px] font-bold text-[var(--text-dark)] mb-2 leading-none [@media(max-width:1400px)]:text-[42px] [@media(max-width:768px)]:text-[38px] [@media(max-width:480px)]:text-[32px] [@media(max-width:360px)]:text-[28px]">1,250</div>
          <div className="text-[14px] text-[var(--text-muted)] uppercase tracking-[1px] font-medium [@media(max-width:1400px)]:text-[13px] [@media(max-width:768px)]:text-[12px] [@media(max-width:480px)]:text-[11px]">BALANCE TOTAL</div>
        </div>
      </div>

      <button
        className="w-full border-none p-4 rounded-[12px] text-white font-semibold text-[16px] cursor-pointer mb-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(127,13,242,0.4)] [@media(max-width:768px)]:py-[14px] [@media(max-width:768px)]:text-[15px] [@media(max-width:480px)]:py-3 [@media(max-width:480px)]:text-[14px]"
        style={{ background: "var(--gradient-primary)" }}
      >
        Ir al Monedero Completo
      </button>

      <div className="grid grid-cols-2 gap-3 pt-5 border-t border-[var(--border-color)] [@media(max-width:480px)]:gap-2">
        <div className="text-center py-4 px-3 rounded-[12px] transition-transform duration-300 hover:-translate-y-0.5 bg-[var(--success-bg)] [@media(max-width:480px)]:py-3 [@media(max-width:480px)]:px-2">
          <div className="text-[12px] text-[var(--text-muted)] mb-2 font-medium [@media(max-width:480px)]:text-[10px]">Ganadas Hoy</div>
          <div className="text-[24px] font-bold text-[var(--success-color)] [@media(max-width:768px)]:text-[22px] [@media(max-width:480px)]:text-[20px] [@media(max-width:360px)]:text-[18px]">+ 45</div>
        </div>
        <div className="text-center py-4 px-3 rounded-[12px] transition-transform duration-300 hover:-translate-y-0.5 bg-[var(--info-bg)] [@media(max-width:480px)]:py-3 [@media(max-width:480px)]:px-2">
          <div className="text-[12px] text-[var(--text-muted)] mb-2 font-medium [@media(max-width:480px)]:text-[10px]">Este mes</div>
          <div className="text-[24px] font-bold text-[var(--success-color)] [@media(max-width:768px)]:text-[22px] [@media(max-width:480px)]:text-[20px] [@media(max-width:360px)]:text-[18px]">+ 320</div>
        </div>
      </div>
    </div>
  );
}

export default TarjetaMonedero;
