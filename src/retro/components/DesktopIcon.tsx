import React, { useState } from "react";
import { DesktopIconType } from "../types";
import { playClickSound } from "../utils/soundEffects";

interface DesktopIconProps {
  icon: DesktopIconType;
  onOpen: (windowId: string) => void;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

export default function DesktopIcon({ icon, onOpen, isSelected: externalSelected, onSelect }: DesktopIconProps) {
  const [internalSelected, setInternalSelected] = useState(false);
  const isSelected = externalSelected !== undefined ? externalSelected : internalSelected;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    if (onSelect) {
      onSelect(icon.id);
    } else {
      setInternalSelected(true);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    onOpen(icon.windowId);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    playClickSound();
    if (onSelect) onSelect(icon.id);
    onOpen(icon.windowId);
  };

  return (
    <div
      className={`retro-desktop-icon ${isSelected ? "selected" : ""}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onTouchEnd={handleTouchEnd}
      onBlur={() => setInternalSelected(false)}
      tabIndex={0}
    >
      <div style={{ imageRendering: "pixelated" }}>
        {icon.icon}
      </div>
      <div className="retro-desktop-icon-label">{icon.label}</div>
    </div>
  );
}
