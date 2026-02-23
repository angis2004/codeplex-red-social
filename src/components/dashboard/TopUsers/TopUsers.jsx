import React from "react";
import Icon from "../../common/Icon/Icon";

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
    <div className="usuario-item">
      <div className="usuario-info">
        <div className="usuario-avatar-wrapper">
          <img
            src={`https://i.pravatar.cc/150?img=${img}`}
            alt={name}
            className="usuario-avatar"
            style={{
              border: `3px solid ${rank.color}`,
              boxShadow: `0 0 0 2px white, 0 0 12px ${rank.color}60`,
            }}
          />
          <div className="rank-badge">
            <Icon name={rank.icon} size={20} />
          </div>
        </div>
        <div className="usuario-details">
          <div className="usuario-name">{name}</div>
          <div className="usuario-role">
            Contador · <span style={{ color: rank.color }}>{rank.name}</span>
          </div>
        </div>
      </div>

      <div className="usuario-stats">
        <div className="usuario-percentage" style={{ color: rank.color }}>
          {percentage}%
        </div>
        <div className="usuario-label">SKILLS</div>
        <div className="usuario-progress">
          <div
            className="usuario-progress-bar"
            style={{
              width: `${percentage}%`,
              opacity: percentage === 0 ? 0.3 : 1,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

function TopUsers() {
  return (
    <div className="top-usuarios-card">
      <div className="card-header">
        <div className="card-title">
          <Icon name="libro_ranking" size={30} />
          <span>Top Usuarios</span>
        </div>
        <span className="card-subtitle">
          <span>⭐</span>
          <span>Semanal</span>
        </span>
      </div>

      <div className="usuarios-list">
        {USERS.map((user) => (
          <UserItem key={user.img} {...user} />
        ))}
      </div>

      <button className="btn-ver-todos">Ver todos los usuarios</button>
    </div>
  );
}

export default TopUsers;