import React from "react";

const TABS = [
  { id: "post",     label: "Post" },
  { id: "videos",   label: "Videos" },
  { id: "noticias", label: "Noticias" },
];

function FeedTabs({ activeTab, onTabChange }) {
  return (
    <div className="posts-tabs">
      {TABS.map(({ id, label }) => (
        <div
          key={id}
          className={`tab ${activeTab === id ? "active" : ""}`}
          onClick={() => onTabChange(id)}
        >
          {label}
        </div>
      ))}
    </div>
  );
}

export default FeedTabs;