import React from "react";
import StatsCards from "./StatsCards";
import PostCreator from "../publicaciones/PostCreator";
import Feed from "../publicaciones/Feed";
import WalletCard from "../../planes/monedero/WalletCard";
import TopUsers from "./TopUsers";
import "./Dashboard.css";

// Dashboard es solo un ORQUESTADOR — no tiene lógica propia
function Dashboard({ isDemo, onLoginClick }) {
  return (
    <div className="dashboard">
      <div className="dashboard-left">
        <StatsCards />
        <PostCreator isDemo={isDemo} onLoginClick={onLoginClick} />
        <Feed isDemo={isDemo} onLoginClick={onLoginClick} />
      </div>

      <div className="dashboard-right">
        <WalletCard />
        <TopUsers />
      </div>
    </div>
  );
}

export default Dashboard;
