import React from "react";

const TABS = [
  { id: "post",     label: "Post" },
  { id: "videos",   label: "Videos" },
  { id: "noticias", label: "Noticias" },
];

const tabClass = (activo) =>
  `py-3 cursor-pointer font-semibold text-[15px] border-b-[3px] transition-all duration-300 relative ${
    activo
      ? "text-[var(--primary-color)] border-b-[var(--primary-color)]"
      : "text-[var(--text-muted)] border-b-transparent hover:text-[var(--primary-color)]"
  }`;

function PestanasFeed({ activeTab, onTabChange }) {
  return (
    <div className="flex gap-[30px] bg-[var(--white-color)] px-[25px] pt-5 pb-0 rounded-[15px_15px_0_0] shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
      {TABS.map(({ id, label }) => (
        <div key={id} className={tabClass(activeTab === id)} onClick={() => onTabChange(id)}>
          {label}
        </div>
      ))}
    </div>
  );
}

export default PestanasFeed;
