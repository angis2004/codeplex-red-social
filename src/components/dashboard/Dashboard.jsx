import React from "react";
import StatsCards from "./StatsCards/StatsCards";
import PostCreator from "./PostCreator/PostCreator";
import Feed from "./Feed/Feed";
import WalletCard from "./Wallet/WalletCard";
import TopUsers from "./TopUsers/TopUsers";
import "../../styles/Dashboard.css";

// Dashboard es solo un ORQUESTADOR — no tiene lógica propia
function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-left">
        <StatsCards />
        <PostCreator />
        <Feed />
      </div>

      <div className="dashboard-right">
        <WalletCard />
        <TopUsers />
      </div>
    </div>
  );
}

export default Dashboard;

