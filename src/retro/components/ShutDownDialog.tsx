import React, { useState } from "react";
import { playClickSound, playChordSound } from "../utils/soundEffects";

interface ShutDownDialogProps {
  onClose: () => void;
  onToggleTerminal: () => void;
}

export default function ShutDownDialog({ onClose, onToggleTerminal }: ShutDownDialogProps) {
  const [selectedAction, setSelectedAction] = useState<"shutdown" | "restart" | "restart_dos">("restart_dos");
  const [isShutDownComplete, setIsShutDownComplete] = useState(false);

  const handleOK = () => {
    playClickSound();
    if (selectedAction === "restart_dos") {
      onClose();
      onToggleTerminal();
    } else if (selectedAction === "restart") {
      window.location.reload();
    } else if (selectedAction === "shutdown") {
      setIsShutDownComplete(true);
    }
  };

  if (isShutDownComplete) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "#000000",
          color: "#ff8000",
          fontFamily: "Courier New, monospace",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99999,
          cursor: "pointer",
        }}
        onClick={() => window.location.reload()}
      >
        <p style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center", margin: "20px" }}>
          It's now safe to turn off your computer.
        </p>
        <p style={{ fontSize: "14px", color: "#808080", marginTop: "20px" }}>
          (Click anywhere to reboot)
        </p>
      </div>
    );
  }

  return (
    <div className="retro-modal-overlay" onClick={onClose}>
      <div className="retro-dialog" style={{ width: 340 }} onClick={(e) => e.stopPropagation()}>
        {/* Title bar */}
        <div className="retro-title-bar">
          <div className="retro-title-bar-text">
            <span>Shut Down Windows</span>
          </div>
          <div className="retro-title-bar-controls">
            <button className="retro-ctrl-btn" onClick={onClose}>
              <span>✕</span>
            </button>
          </div>
        </div>

        {/* Dialog body */}
        <div className="retro-dialog-body" style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
          <img
            src="/icons/windows98-icons/png/shut_down_normal-2.png"
            alt="Shut Down"
            width="36"
            height="36"
          />

          <div style={{ flex: 1 }}>
            <p style={{ margin: "0 0 10px 0", fontWeight: "bold" }}>
              What do you want the computer to do?
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input
                  type="radio"
                  name="shutdown_action"
                  checked={selectedAction === "restart_dos"}
                  onChange={() => {
                    playClickSound();
                    setSelectedAction("restart_dos");
                  }}
                />
                <span>Restart in <u>M</u>S-DOS mode (Terminal)</span>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input
                  type="radio"
                  name="shutdown_action"
                  checked={selectedAction === "restart"}
                  onChange={() => {
                    playClickSound();
                    setSelectedAction("restart");
                  }}
                />
                <span><u>R</u>estart computer</span>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input
                  type="radio"
                  name="shutdown_action"
                  checked={selectedAction === "shutdown"}
                  onChange={() => {
                    playClickSound();
                    setSelectedAction("shutdown");
                  }}
                />
                <span><u>S</u>hut down</span>
              </label>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="retro-dialog-actions">
          <button className="retro-btn" onClick={handleOK}>
            OK
          </button>
          <button className="retro-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="retro-btn"
            onClick={() => {
              playChordSound();
              alert("Selecting 'Restart in MS-DOS mode' launches the command-line portfolio shell.");
            }}
          >
            <u>H</u>elp
          </button>
        </div>
      </div>
    </div>
  );
}
