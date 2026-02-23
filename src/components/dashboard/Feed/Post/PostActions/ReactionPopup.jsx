import React from "react";
import Icon from "../../../../common/Icon/Icon";

export const REACTIONS = [
  { icon: "like",       label: "Me gusta",  color: "#7F0DF2" },
  { icon: "me_encanta", label: "Me encanta", color: "#ef4444" },
  { icon: "asombro",    label: "Asombro",    color: "#f59e0b" },
];

function ReactionPopup({ onSelect, onMouseEnter, onMouseLeave }) {
  return (
    <div
      className="reactions-popup"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {REACTIONS.map((reaction) => (
        <button
          key={reaction.label}
          className="reaction-option"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(reaction);
          }}
        >
          <Icon name={reaction.icon} size={28} />
          <span className="reaction-label" style={{ color: reaction.color }}>
            {reaction.label}
          </span>
        </button>
      ))}
    </div>
  );
}

export default ReactionPopup;