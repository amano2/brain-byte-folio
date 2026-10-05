import React, { useState, useEffect, useRef } from "react";
import { RetroWindow } from "../types";
import StartMenu from "./StartMenu";
import { playClickSound } from "../utils/soundEffects";

interface TaskbarProps {
  windows: RetroWindow[];
  onFocusWindow: (id: string) => void;
  onRestoreWindow: (id: string) => void;
  onMinimizeWindow: (id: string) => void;
  onToggleTerminal: () => void;
  onOpenWindow: (id: string) => void;
  onShutDownRequest: () => void;
  onDisplayPropertiesRequest: () => void;
}

export default function Taskbar({
  windows,
  onFocusWindow,
  onRestoreWindow,
  onMinimizeWindow,
  onToggleTerminal,
  onOpenWindow,
  onShutDownRequest,
  onDisplayPropertiesRequest,
}: TaskbarProps) {
  const [time, setTime] = useState("");
  const [dateTooltip, setDateTooltip] = useState("");
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [volumeOpen, setVolumeOpen] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(80);
  const startBtnRef = useRef<HTMLButtonElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);

  // Time & Date updater
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
      setDateTooltip(
        now.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close volume popup on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (volumeRef.current && !volumeRef.current.contains(e.target as Node)) {
        setVolumeOpen(false);
      }
    };
    if (volumeOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [volumeOpen]);

  const topZIndex = Math.max(0, ...windows.map((w) => w.zIndex));

  const handleWindowClick = (w: RetroWindow) => {
    playClickSound();
    if (w.isMinimized) {
      onRestoreWindow(w.id);
    } else if (w.zIndex === topZIndex && topZIndex > 0) {
      // If window is already on top, clicking its taskbar item minimizes it (authentic Windows 98 behavior)
      onMinimizeWindow(w.id);
    } else {
      onFocusWindow(w.id);
    }
  };

  // Show desktop toggler
  const handleShowDesktop = () => {
    playClickSound();
    const anyOpenNotMinimized = windows.some((w) => w.isOpen && !w.isMinimized);
    if (anyOpenNotMinimized) {
      windows.forEach((w) => {
        if (w.isOpen && !w.isMinimized) onMinimizeWindow(w.id);
      });
    } else {
      windows.forEach((w) => {
        if (w.isOpen && w.isMinimized) onRestoreWindow(w.id);
      });
    }
  };

  return (
    <div className="retro-taskbar" onClick={() => setStartMenuOpen(false)}>
      {/* Start Button */}
      <button
        ref={startBtnRef}
        className={`retro-btn retro-start-btn ${startMenuOpen ? "active" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          playClickSound();
          setStartMenuOpen(!startMenuOpen);
        }}
      >
        <img
          src="/icons/windows98-icons/png/windows-0.png"
          alt="Start"
          width="16"
          height="16"
        />
        <span>Start</span>
      </button>

      {/* Start Menu Dropup */}
      {startMenuOpen && (
        <StartMenu
          onClose={() => setStartMenuOpen(false)}
          onToggleTerminal={onToggleTerminal}
          onOpenWindow={onOpenWindow}
          onShutDownRequest={onShutDownRequest}
          onDisplayPropertiesRequest={onDisplayPropertiesRequest}
        />
      )}

      {/* Quick Launch Toolbar */}
      <div className="retro-taskbar-divider" />
      <div className="retro-quick-launch">
        {/* Show Desktop */}
        <button
          className="retro-quick-btn"
          title="Show Desktop"
          onClick={handleShowDesktop}
        >
          <img
            src="/icons/windows98-icons/png/desktop-0.png"
            alt="Show Desktop"
            width="16"
            height="16"
          />
        </button>

        {/* MS-DOS Prompt (Switch to Terminal) */}
        <button
          className="retro-quick-btn"
          title="MS-DOS Prompt (Switch to Terminal)"
          onClick={() => {
            playClickSound();
            onToggleTerminal();
          }}
        >
          <img
            src="/icons/windows98-icons/png/console_prompt-0.png"
            alt="Terminal"
            width="16"
            height="16"
          />
        </button>

        {/* Internet Explorer */}
        <button
          className="retro-quick-btn"
          title="Notepad - Blog"
          onClick={() => {
            playClickSound();
            onOpenWindow("blog");
          }}
        >
          <img
            src="/icons/windows98-icons/png/msie1-2.png"
            alt="Internet"
            width="16"
            height="16"
          />
        </button>
      </div>
      <div className="retro-taskbar-divider" />

      {/* Open Windows Tabs */}
      <div style={{ flex: 1, display: "flex", gap: "2px", overflow: "hidden", minWidth: 0 }}>
        {windows
          .filter((w) => w.isOpen)
          .map((w) => {
            const isActive = !w.isMinimized && w.zIndex === topZIndex && topZIndex > 0;
            return (
              <button
                key={w.id}
                className={`retro-btn retro-taskbar-item ${isActive ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleWindowClick(w);
                }}
              >
                {w.icon}
                <span>{w.title}</span>
              </button>
            );
          })}
      </div>

      {/* System Tray */}
      <div className="retro-system-tray" title={dateTooltip} onClick={(e) => e.stopPropagation()}>
        {/* Volume Icon */}
        <div
          className="retro-tray-icon"
          title="Volume Control"
          onClick={() => {
            playClickSound();
            setVolumeOpen(!volumeOpen);
          }}
        >
          <img
            src="/icons/windows98-icons/png/loudspeaker_rays-0.png"
            alt="Sound"
            width="16"
            height="16"
          />
        </div>

        {/* Real-time Clock */}
        <span style={{ cursor: "default", letterSpacing: "0.2px" }}>{time}</span>
      </div>

      {/* Master Volume Popup */}
      {volumeOpen && (
        <div ref={volumeRef} className="retro-volume-popup">
          <span style={{ fontSize: "10px", fontWeight: "bold" }}>Volume</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volumeLevel}
            onChange={(e) => setVolumeLevel(Number(e.target.value))}
          />
          <span style={{ fontSize: "10px" }}>{volumeLevel}%</span>
        </div>
      )}
    </div>
  );
}
