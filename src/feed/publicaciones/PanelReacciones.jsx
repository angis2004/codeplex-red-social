import React from "react";
import Icon from "../../ui/Icon/Icon";
import { REACTIONS } from "./publicaciones.data";

function PanelReacciones({ onSelect, onMouseEnter, onMouseLeave }) {
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

export default PanelReacciones;
