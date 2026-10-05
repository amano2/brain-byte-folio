import React, { useState } from "react";
import { playClickSound } from "../utils/soundEffects";

interface DisplayPropertiesDialogProps {
  currentWallpaper: string;
  onApplyWallpaper: (wallpaper: string) => void;
  onClose: () => void;
}

export default function DisplayPropertiesDialog({
  currentWallpaper,
  onApplyWallpaper,
  onClose,
}: DisplayPropertiesDialogProps) {
  const [selectedWallpaper, setSelectedWallpaper] = useState(currentWallpaper);

  const wallpapers = [
    { id: "wallpaper-teal", name: "Windows 98 Teal (Default)", color: "#008080" },
    { id: "wallpaper-matrix", name: "Matrix Cyberpunk", color: "#020c05" },
    { id: "wallpaper-grid", name: "Retro Blue Grid", color: "#004e7c" },
    { id: "wallpaper-navy", name: "Midnight Navy", color: "#000080" },
  ];

  const handleApply = () => {
    playClickSound();
    onApplyWallpaper(selectedWallpaper);
  };

  const handleOK = () => {
    handleApply();
    onClose();
  };

  const activeObj = wallpapers.find((w) => w.id === selectedWallpaper) || wallpapers[0];

  return (
    <div className="retro-modal-overlay" onClick={onClose}>
      <div className="retro-dialog" style={{ width: 380 }} onClick={(e) => e.stopPropagation()}>
        {/* Title bar */}
        <div className="retro-title-bar">
          <div className="retro-title-bar-text">
            <img src="/icons/windows98-icons/png/themes-0.png" width="16" height="16" alt="themes" />
            <span>Display Properties</span>
          </div>
          <div className="retro-title-bar-controls">
            <button className="retro-ctrl-btn" onClick={onClose}>
              <span>✕</span>
            </button>
          </div>
        </div>

        {/* Tab Header */}
        <div style={{ padding: "4px 8px 0" }}>
          <div className="retro-tabs-nav">
            <button className="retro-tab active">Background</button>
            <button className="retro-tab" onClick={() => playClickSound()}>Screen Saver</button>
            <button className="retro-tab" onClick={() => playClickSound()}>Appearance</button>
            <button className="retro-tab" onClick={() => playClickSound()}>Settings</button>
          </div>
        </div>

        {/* Dialog body */}
        <div className="retro-dialog-body" style={{ paddingTop: 4 }}>
          {/* CRT Monitor Mockup */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 170,
                height: 125,
                background: "#c0c0c0",
                border: "4px solid #808080",
                borderTopColor: "#dfdfdf",
                borderLeftColor: "#dfdfdf",
                borderRadius: "6px 6px 2px 2px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 4,
                boxShadow: "inset -1px -1px #0a0a0a, inset 1px 1px #fff",
              }}
            >
              {/* Monitor Screen */}
              <div
                style={{
                  width: 140,
                  height: 95,
                  backgroundColor: activeObj.color,
                  border: "2px solid #000000",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Mini Window Preview */}
                <div
                  style={{
                    position: "absolute",
                    top: 15,
                    left: 20,
                    width: 75,
                    height: 50,
                    background: "#c0c0c0",
                    border: "1px solid #ffffff",
                    boxShadow: "inset -1px -1px #000, 1px 1px 2px rgba(0,0,0,0.5)",
                  }}
                >
                  <div
                    style={{
                      height: 10,
                      background: "linear-gradient(90deg, #000080, #1084d0)",
                      color: "white",
                      fontSize: "6px",
                      padding: "1px 2px",
                      fontWeight: "bold",
                    }}
                  >
                    Active Window
                  </div>
                </div>

                {/* Mini Taskbar */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 10,
                    background: "#c0c0c0",
                    borderTop: "1px solid #fff",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 2px",
                  }}
                >
                  <div
                    style={{
                      width: 16,
                      height: 6,
                      background: "#c0c0c0",
                      border: "1px solid #000",
                      fontSize: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Start
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wallpaper Selection Fieldset */}
          <fieldset className="retro-fieldset">
            <legend>Select a background wallpaper:</legend>
            <div
              className="retro-well"
              style={{
                height: 80,
                overflowY: "auto",
                padding: "2px 0",
              }}
            >
              {wallpapers.map((wp) => (
                <div
                  key={wp.id}
                  style={{
                    padding: "2px 8px",
                    cursor: "pointer",
                    backgroundColor: selectedWallpaper === wp.id ? "#000080" : "transparent",
                    color: selectedWallpaper === wp.id ? "#ffffff" : "#000000",
                  }}
                  onClick={() => {
                    playClickSound();
                    setSelectedWallpaper(wp.id);
                  }}
                >
                  {wp.name}
                </div>
              ))}
            </div>
          </fieldset>
        </div>

        {/* Action buttons */}
        <div className="retro-dialog-actions">
          <button className="retro-btn" onClick={handleOK}>
            OK
          </button>
          <button className="retro-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="retro-btn" onClick={handleApply}>
            <u>A</u>pply
          </button>
        </div>
      </div>
    </div>
  );
}
