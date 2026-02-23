import React from "react";
import Icon from "../../common/Icon/Icon";

function WalletCard() {
  return (
    <div className="monedero-card">
      <div className="monedero-header">
        <div className="monedero-icon">$</div>
        <span className="monedero-title">Mi Monedero</span>
        <Icon name="informacion" size={25} />
      </div>

      <div className="balance-circle">
        <svg viewBox="0 0 200 200">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#7F0DF2", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#588CE5", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <circle className="circle-bg" cx="100" cy="100" r="85" />
          <circle
            className="circle-progress"
            cx="100" cy="100" r="85"
            strokeDasharray="534"
            strokeDashoffset="133.5"
          />
        </svg>
        <div className="balance-content">
          <div className="balance-amount">1,250</div>
          <div className="balance-label">BALANCE TOTAL</div>
        </div>
      </div>

      <button className="btn-monedero-completo">Ir al Monedero Completo</button>

      <div className="balance-stats">
        <div className="balance-stat">
          <div className="stat-label">Ganadas Hoy</div>
          <div className="stat-amount positive">+ 45</div>
        </div>
        <div className="balance-stat">
          <div className="stat-label">Este mes</div>
          <div className="stat-amount positive">+ 320</div>
        </div>
      </div>
    </div>
  );
}

export default WalletCard;