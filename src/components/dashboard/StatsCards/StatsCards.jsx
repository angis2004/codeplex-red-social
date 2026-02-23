import React from "react";
import Icon from "../../common/Icon/Icon";

const STATS = [
  { title: "Tus post",     icon: "tusPost",     iconSize: 18, value: 10 },
  { title: "Tus Videos",   icon: "videos",      iconSize: 20, value: 10 },
  { title: "Compartidos",  icon: "compartidos", iconSize: 18, value: 10 },
];

function StatCard({ title, icon, iconSize, value }) {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <span className="stat-title">{title}</span>
        <div className="stat-icon">
          <Icon name={icon} size={iconSize} />
        </div>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-change">
        <Icon name="flecha" size={18} />
        <span>+5% este mes</span>
      </div>
    </div>
  );
}

function StatsCards() {
  return (
    <div className="stats-cards">
      {STATS.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}

export default StatsCards;