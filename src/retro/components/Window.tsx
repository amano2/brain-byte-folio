import React, { useRef, useState, useEffect } from "react";
import { RetroWindow } from "../types";
import { playClickSound, playAsteriskSound } from "../utils/soundEffects";
import {
  BackIcon,
  ForwardIcon,
  UpIcon,
  CutIcon,
  CopyIcon,
  PasteIcon,
  UndoIcon,
  DeleteIcon,
  PropertiesIcon,
  ViewsIcon,
} from "./ToolbarIcons";

interface WindowProps {
  window: RetroWindow;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onRestore: (id: string) => void;
  onFocus: (id: string) => void;
  onUpdatePosition: (id: string, x: number, y: number) => void;
  onUpdateSize: (id: string, w: number, h: number) => void;
  isActive: boolean;
}

export default function Window({
  window,
  onClose,
  onMinimize,
  onMaximize,
  onRestore,
  onFocus,
  onUpdatePosition,
  onUpdateSize,
  isActive,
}: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Close active menu when clicking outside
  useEffect(() => {
    const handleGlobalClick = () => {
      if (activeMenu) setActiveMenu(null);
    };
    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, [activeMenu]);

  if (!window.isOpen || window.isMinimized) {
    return null;
  }

  const handlePointerDown = () => {
    onFocus(window.id);
  };

  const handleTitleBarPointerDown = (e: React.PointerEvent) => {
    if (window.isMaximized) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - window.position.x,
      y: e.clientY - window.position.y,
    });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleTitleBarPointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      onUpdatePosition(window.id, e.clientX - dragOffset.x, e.clientY - dragOffset.y);
    }
  };

  const handleTitleBarPointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const handleResizePointerDown = (e: React.PointerEvent) => {
    if (window.isMaximized) return;
    setIsResizing(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    e.stopPropagation();
  };

  const handleResizePointerMove = (e: React.PointerEvent) => {
    if (isResizing && windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      const newWidth = Math.max(240, e.clientX - rect.left);
      const newHeight = Math.max(160, e.clientY - rect.top);
      onUpdateSize(window.id, newWidth, newHeight);
    }
  };

  const handleResizePointerUp = (e: React.PointerEvent) => {
    setIsResizing(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const toggleMaximize = () => {
    playClickSound();
    if (window.isMaximized) {
      onRestore(window.id);
    } else {
      onMaximize(window.id);
    }
  };

  // Determine path for address bar
  const getWindowPath = () => {
    const titleClean = window.title.replace(/[^a-zA-Z0-9 ]/g, "").trim().replace(/\s+/g, "_");
    return `C:\\Portfolio\\${titleClean}`;
  };

  const style: React.CSSProperties = window.isMaximized
    ? {
        top: 0,
        left: 0,
        width: "100%",
        height: "calc(100% - 28px)", // minus taskbar height
        zIndex: window.zIndex,
      }
    : {
        top: window.position.y,
        left: window.position.x,
        width: window.size.w,
        height: window.size.h,
        zIndex: window.zIndex,
      };

  return (
    <div
      ref={windowRef}
      className="retro-window"
      style={style}
      onPointerDown={handlePointerDown}
    >
      {/* Titlebar */}
      <div
        className={`retro-title-bar ${!isActive ? "inactive" : ""}`}
        onPointerDown={handleTitleBarPointerDown}
        onPointerMove={handleTitleBarPointerMove}
        onPointerUp={handleTitleBarPointerUp}
        onDoubleClick={toggleMaximize}
      >
        <div className="retro-title-bar-text">
          {window.icon}
          <span>{window.title}</span>
        </div>

        {/* 16x14px Authentic Windows 98 Control Buttons */}
        <div className="retro-title-bar-controls" onPointerDown={(e) => e.stopPropagation()}>
          {/* Minimize */}
          <button
            className="retro-ctrl-btn"
            title="Minimize"
            onClick={() => {
              playClickSound();
              onMinimize(window.id);
            }}
          >
            <span style={{ fontSize: "10px", fontWeight: "900", marginTop: "4px" }}>_</span>
          </button>

          {/* Maximize / Restore */}
          <button
            className="retro-ctrl-btn"
            title={window.isMaximized ? "Restore" : "Maximize"}
            onClick={toggleMaximize}
          >
            {window.isMaximized ? (
              <span style={{ fontSize: "10px", fontWeight: "bold" }}>❐</span>
            ) : (
              <span style={{ fontSize: "10px", fontWeight: "bold" }}>□</span>
            )}
          </button>

          {/* Close */}
          <button
            className="retro-ctrl-btn"
            style={{ marginLeft: 2 }}
            title="Close"
            onClick={() => {
              playClickSound();
              onClose(window.id);
            }}
          >
            <span style={{ fontSize: "11px", fontWeight: "bold" }}>✕</span>
          </button>
        </div>
      </div>

      {/* Menu Bar (File, Edit, View, Help) */}
      <div className="retro-menu-bar">
        {/* File */}
        <div
          className={`retro-menu-item ${activeMenu === "file" ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            playClickSound();
            setActiveMenu(activeMenu === "file" ? null : "file");
          }}
        >
          <span><u>F</u>ile</span>
          {activeMenu === "file" && (
            <div className="retro-menu-dropdown">
              <div
                className="retro-dropdown-entry"
                onClick={() => {
                  playClickSound();
                  setActiveMenu(null);
                }}
              >
                <span><u>N</u>ew</span>
              </div>
              <div
                className="retro-dropdown-entry"
                onClick={() => {
                  playClickSound();
                  setActiveMenu(null);
                }}
              >
                <span><u>S</u>ave</span>
                <span style={{ color: "#808080", fontSize: "10px" }}>Ctrl+S</span>
              </div>
              <div className="retro-dropdown-divider" />
              <div
                className="retro-dropdown-entry"
                onClick={() => {
                  playClickSound();
                  onClose(window.id);
                  setActiveMenu(null);
                }}
              >
                <span><u>C</u>lose</span>
                <span style={{ color: "#808080", fontSize: "10px" }}>Alt+F4</span>
              </div>
            </div>
          )}
        </div>

        {/* Edit */}
        <div
          className={`retro-menu-item ${activeMenu === "edit" ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            playClickSound();
            setActiveMenu(activeMenu === "edit" ? null : "edit");
          }}
        >
          <span><u>E</u>dit</span>
          {activeMenu === "edit" && (
            <div className="retro-menu-dropdown">
              <div className="retro-dropdown-entry" onClick={() => setActiveMenu(null)}>
                <span><u>C</u>ut</span>
                <span style={{ color: "#808080", fontSize: "10px" }}>Ctrl+X</span>
              </div>
              <div className="retro-dropdown-entry" onClick={() => setActiveMenu(null)}>
                <span><u>C</u>opy</span>
                <span style={{ color: "#808080", fontSize: "10px" }}>Ctrl+C</span>
              </div>
              <div className="retro-dropdown-entry" onClick={() => setActiveMenu(null)}>
                <span><u>P</u>aste</span>
                <span style={{ color: "#808080", fontSize: "10px" }}>Ctrl+V</span>
              </div>
              <div className="retro-dropdown-divider" />
              <div className="retro-dropdown-entry" onClick={() => setActiveMenu(null)}>
                <span>Select <u>A</u>ll</span>
                <span style={{ color: "#808080", fontSize: "10px" }}>Ctrl+A</span>
              </div>
            </div>
          )}
        </div>

        {/* View */}
        <div
          className={`retro-menu-item ${activeMenu === "view" ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            playClickSound();
            setActiveMenu(activeMenu === "view" ? null : "view");
          }}
        >
          <span><u>V</u>iew</span>
          {activeMenu === "view" && (
            <div className="retro-menu-dropdown">
              <div
                className="retro-dropdown-entry"
                onClick={() => {
                  toggleMaximize();
                  setActiveMenu(null);
                }}
              >
                <span><u>F</u>ull Screen</span>
                <span style={{ color: "#808080", fontSize: "10px" }}>F11</span>
              </div>
              <div
                className="retro-dropdown-entry"
                onClick={() => {
                  playClickSound();
                  setActiveMenu(null);
                }}
              >
                <span><u>R</u>efresh</span>
                <span style={{ color: "#808080", fontSize: "10px" }}>F5</span>
              </div>
            </div>
          )}
        </div>

        {/* Help */}
        <div
          className={`retro-menu-item ${activeMenu === "help" ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            playClickSound();
            setActiveMenu(activeMenu === "help" ? null : "help");
          }}
        >
          <span><u>H</u>elp</span>
          {activeMenu === "help" && (
            <div className="retro-menu-dropdown">
              <div
                className="retro-dropdown-entry"
                onClick={() => {
                  playAsteriskSound();
                  alert(`Windows 98 Portfolio Edition\nVersion 4.10.1998\n\nAman Hossain Portfolio - Inspired by win98-web`);
                  setActiveMenu(null);
                }}
              >
                <span><u>A</u>bout Windows 98...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Explorer Toolbar */}
      <div className="retro-toolbar">
        <button
          className="retro-tool-btn"
          title="Back"
          onClick={() => playClickSound()}
        >
          <BackIcon />
          <span>Back</span>
        </button>
        <button
          className="retro-tool-btn"
          title="Forward"
          onClick={() => playClickSound()}
        >
          <ForwardIcon />
          <span>Forward</span>
        </button>
        <button
          className="retro-tool-btn"
          title="Up"
          onClick={() => playClickSound()}
        >
          <UpIcon />
          <span>Up</span>
        </button>

        <div className="retro-tool-divider" />

        <button
          className="retro-tool-btn"
          title="Cut"
          onClick={() => playClickSound()}
        >
          <CutIcon />
        </button>
        <button
          className="retro-tool-btn"
          title="Copy"
          onClick={() => playClickSound()}
        >
          <CopyIcon />
        </button>
        <button
          className="retro-tool-btn"
          title="Paste"
          onClick={() => playClickSound()}
        >
          <PasteIcon />
        </button>

        <div className="retro-tool-divider" />

        <button
          className="retro-tool-btn"
          title="Undo"
          onClick={() => playClickSound()}
        >
          <UndoIcon />
        </button>
        <button
          className="retro-tool-btn"
          title="Delete"
          onClick={() => playClickSound()}
        >
          <DeleteIcon />
        </button>

        <div className="retro-tool-divider" />

        <button
          className="retro-tool-btn"
          title="Properties"
          onClick={() => {
            playAsteriskSound();
            alert(`Properties of ${window.title}\nType: Portfolio Window System\nStatus: Online`);
          }}
        >
          <PropertiesIcon />
          <span>Properties</span>
        </button>
        <button
          className="retro-tool-btn"
          title="Views"
          onClick={() => playClickSound()}
        >
          <ViewsIcon />
          <span>Views</span>
        </button>
      </div>

      {/* Address Bar */}
      <div className="retro-address-bar">
        <span><u>A</u>ddress</span>
        <div className="retro-address-input-wrapper">
          <img src="/icons/windows98-icons/png/directory_open_file_mydocs-4.png" width="14" height="14" alt="folder" />
          <input
            type="text"
            readOnly
            value={getWindowPath()}
          />
        </div>
        <button
          className="retro-btn"
          style={{ minWidth: 32, padding: "1px 6px", height: 20 }}
          onClick={() => playClickSound()}
        >
          Go
        </button>
      </div>

      {/* Window Body */}
      <div className="retro-window-body">
        {window.component}
      </div>

      {/* Bottom Status Bar */}
      <div className="retro-status-bar">
        <div className="retro-status-panel" style={{ flex: 1 }}>
          <img src="/icons/windows98-icons/png/msg_information-0.png" width="12" height="12" alt="info" />
          <span>Ready</span>
        </div>
        <div className="retro-status-panel" style={{ width: 90 }}>
          <span>3.42 MB</span>
        </div>
        <div className="retro-status-panel" style={{ width: 110 }}>
          <img src="/icons/windows98-icons/png/computer_explorer-5.png" width="12" height="12" alt="My Computer" />
          <span>My Computer</span>
        </div>
      </div>

      {/* Resize Grip (Bottom Right) */}
      {!window.isMaximized && (
        <div
          style={{
            position: "absolute",
            bottom: 2,
            right: 2,
            width: 14,
            height: 14,
            cursor: "nwse-resize",
            zIndex: 10,
          }}
          onPointerDown={handleResizePointerDown}
          onPointerMove={handleResizePointerMove}
          onPointerUp={handleResizePointerUp}
        />
      )}
    </div>
  );
}
