import React, { useEffect, useState, useRef } from "react";
import { useWindowManager } from "./useWindowManager";
import Window from "./components/Window";
import DesktopIcon from "./components/DesktopIcon";
import Taskbar from "./components/Taskbar";
import ShutDownDialog from "./components/ShutDownDialog";
import DisplayPropertiesDialog from "./components/DisplayPropertiesDialog";
import { DesktopIconType, RetroWindow } from "./types";
import { playStartupSound, playClickSound } from "./utils/soundEffects";
import "./retro.css";

import AboutWindow from "./windows/AboutWindow";
import ProjectsWindow from "./windows/ProjectsWindow";
import SkillsWindow from "./windows/SkillsWindow";
import EducationWindow from "./windows/EducationWindow";
import ContactWindow from "./windows/ContactWindow";
import BlogWindow from "./windows/BlogWindow";
import ResumeWindow from "./windows/ResumeWindow";
import ResearchWindow from "./windows/ResearchWindow";
import SnakeWindow from "./windows/SnakeWindow";
import RecycleBin from "./windows/RecycleBin";

interface RetroDesktopProps {
  onToggleTerminal: () => void;
  selectedArticleId?: string;
}

interface ContextMenuState {
  visible: boolean;
  x: number;
  y: number;
}

interface SelectionBox {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  active: boolean;
}

export default function RetroDesktop({ onToggleTerminal, selectedArticleId }: RetroDesktopProps) {
  const [wallpaper, setWallpaper] = useState("wallpaper-teal");
  const [shutDownOpen, setShutDownOpen] = useState(false);
  const [displayPropsOpen, setDisplayPropsOpen] = useState(false);
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({ visible: false, x: 0, y: 0 });
  const [selectionBox, setSelectionBox] = useState<SelectionBox>({ startX: 0, startY: 0, currentX: 0, currentY: 0, active: false });
  const desktopRef = useRef<HTMLDivElement>(null);

  // Play startup sound on initial interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      playStartupSound();
      window.removeEventListener("pointerdown", handleFirstInteraction);
    };
    window.addEventListener("pointerdown", handleFirstInteraction, { once: true });
    return () => window.removeEventListener("pointerdown", handleFirstInteraction);
  }, []);

  const getInitialWindows = (): Omit<RetroWindow, "isOpen" | "isMinimized" | "isMaximized" | "zIndex" | "position" | "size">[] => [
    { id: "about", title: "About Me", icon: <img src="/icons/windows98-icons/png/computer_explorer-5.png" width="16" height="16" alt="icon" style={{ imageRendering: "pixelated" }} />, component: <AboutWindow /> },
    { id: "projects", title: "My Projects", icon: <img src="/icons/windows98-icons/png/directory_open_file_mydocs-4.png" width="16" height="16" alt="icon" style={{ imageRendering: "pixelated" }} />, component: <ProjectsWindow /> },
    { id: "skills", title: "Skills", icon: <img src="/icons/windows98-icons/png/chart1-1.png" width="16" height="16" alt="icon" style={{ imageRendering: "pixelated" }} />, component: <SkillsWindow /> },
    { id: "education", title: "Education", icon: <img src="/icons/windows98-icons/png/certificate-0.png" width="16" height="16" alt="icon" style={{ imageRendering: "pixelated" }} />, component: <EducationWindow /> },
    { id: "contact", title: "Contact", icon: <img src="/icons/windows98-icons/png/message_envelope_open-0.png" width="16" height="16" alt="icon" style={{ imageRendering: "pixelated" }} />, component: <ContactWindow /> },
    { id: "blog", title: "Notepad - Blog", icon: <img src="/icons/windows98-icons/png/notepad-0.png" width="16" height="16" alt="icon" style={{ imageRendering: "pixelated" }} />, component: <BlogWindow initialArticleId={selectedArticleId} /> },
    { id: "resume", title: "Resume.txt", icon: <img src="/icons/windows98-icons/png/file_lines-0.png" width="16" height="16" alt="icon" style={{ imageRendering: "pixelated" }} />, component: <ResumeWindow /> },
    { id: "research", title: "Research Papers", icon: <img src="/icons/windows98-icons/png/msg_information-0.png" width="16" height="16" alt="icon" style={{ imageRendering: "pixelated" }} />, component: <ResearchWindow onOpenBlog={() => openWindow("blog")} onClose={() => closeWindow("research")} /> },
    { id: "snake", title: "Snake", icon: <img src="/icons/windows98-icons/png/joystick-0.png" width="16" height="16" alt="icon" style={{ imageRendering: "pixelated" }} />, component: <SnakeWindow /> },
    { id: "recycle", title: "Recycle Bin", icon: <img src="/icons/windows98-icons/png/recycle_bin_empty-4.png" width="16" height="16" alt="icon" style={{ imageRendering: "pixelated" }} />, component: <RecycleBin onClose={() => closeWindow("recycle")} /> },
  ];

  const desktopIcons: DesktopIconType[] = [
    { id: "icon-about", label: "My Computer", icon: <img src="/icons/windows98-icons/png/computer_explorer-5.png" alt="My Computer" />, windowId: "about" },
    { id: "icon-projects", label: "My Projects", icon: <img src="/icons/windows98-icons/png/directory_open_file_mydocs-4.png" alt="Projects" />, windowId: "projects" },
    { id: "icon-skills", label: "Skills", icon: <img src="/icons/windows98-icons/png/chart1-1.png" alt="Skills" />, windowId: "skills" },
    { id: "icon-education", label: "Education", icon: <img src="/icons/windows98-icons/png/certificate-0.png" alt="Education" />, windowId: "education" },
    { id: "icon-contact", label: "Contact", icon: <img src="/icons/windows98-icons/png/message_envelope_open-0.png" alt="Contact" />, windowId: "contact" },
    { id: "icon-blog", label: "Blog", icon: <img src="/icons/windows98-icons/png/notepad-0.png" alt="Blog" />, windowId: "blog" },
    { id: "icon-resume", label: "Resume.txt", icon: <img src="/icons/windows98-icons/png/file_lines-0.png" alt="Resume" />, windowId: "resume" },
    { id: "icon-research", label: "Research", icon: <img src="/icons/windows98-icons/png/msg_information-0.png" alt="Research" />, windowId: "research" },
    { id: "icon-snake", label: "Snake Game", icon: <img src="/icons/windows98-icons/png/joystick-0.png" alt="Snake" />, windowId: "snake" },
    { id: "icon-recycle", label: "Recycle Bin", icon: <img src="/icons/windows98-icons/png/recycle_bin_empty-4.png" alt="Recycle Bin" />, windowId: "recycle" },
  ];

  const {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    restoreWindow,
    maximizeWindow,
    focusWindow,
    updatePosition,
    updateSize,
  } = useWindowManager(getInitialWindows());

  // Deep link blog
  useEffect(() => {
    if (selectedArticleId) {
      openWindow("blog");
    }
  }, [selectedArticleId, openWindow]);

  const topZIndex = Math.max(0, ...windows.map((w) => w.zIndex));

  // Desktop Pointer Events for Rubber-band Marquee Selection
  const handleDesktopPointerDown = (e: React.PointerEvent) => {
    if (e.button === 2) return; // Ignore right-click
    setSelectedIconId(null);
    setContextMenu({ visible: false, x: 0, y: 0 });

    if (e.target === desktopRef.current || (e.target as HTMLElement).classList.contains("retro-desktop-grid")) {
      setSelectionBox({
        startX: e.clientX,
        startY: e.clientY,
        currentX: e.clientX,
        currentY: e.clientY,
        active: true,
      });
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    }
  };

  const handleDesktopPointerMove = (e: React.PointerEvent) => {
    if (selectionBox.active) {
      setSelectionBox((prev) => ({
        ...prev,
        currentX: e.clientX,
        currentY: e.clientY,
      }));
    }
  };

  const handleDesktopPointerUp = (e: React.PointerEvent) => {
    if (selectionBox.active) {
      setSelectionBox((prev) => ({ ...prev, active: false }));
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    }
  };

  // Right Click Context Menu
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: Math.min(e.clientY, window.innerHeight - 150),
    });
  };

  // Calculate box geometry
  const boxLeft = Math.min(selectionBox.startX, selectionBox.currentX);
  const boxTop = Math.min(selectionBox.startY, selectionBox.currentY);
  const boxWidth = Math.abs(selectionBox.currentX - selectionBox.startX);
  const boxHeight = Math.abs(selectionBox.currentY - selectionBox.startY);

  return (
    <div
      ref={desktopRef}
      className={`retro-desktop ${wallpaper}`}
      onPointerDown={handleDesktopPointerDown}
      onPointerMove={handleDesktopPointerMove}
      onPointerUp={handleDesktopPointerUp}
      onContextMenu={handleContextMenu}
    >
      {/* Rubber-band Marquee Selection Rectangle */}
      {selectionBox.active && boxWidth > 3 && boxHeight > 3 && (
        <div
          className="retro-selection-box"
          style={{
            left: boxLeft,
            top: boxTop,
            width: boxWidth,
            height: boxHeight,
          }}
        />
      )}

      {/* Desktop Icons Grid */}
      <div
        className="retro-desktop-grid"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          padding: "10px",
          flexWrap: "wrap",
          height: "calc(100vh - 36px)",
          alignContent: "flex-start",
          width: "auto",
        }}
      >
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon}
            onOpen={openWindow}
            isSelected={selectedIconId === icon.id}
            onSelect={(id) => setSelectedIconId(id)}
          />
        ))}
      </div>

      {/* Retro Windows */}
      {windows.map((win) => (
        <Window
          key={win.id}
          window={win}
          isActive={!win.isMinimized && win.zIndex === topZIndex && topZIndex > 0}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={maximizeWindow}
          onRestore={restoreWindow}
          onFocus={focusWindow}
          onUpdatePosition={updatePosition}
          onUpdateSize={updateSize}
        />
      ))}

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        onFocusWindow={focusWindow}
        onRestoreWindow={restoreWindow}
        onMinimizeWindow={minimizeWindow}
        onToggleTerminal={onToggleTerminal}
        onOpenWindow={openWindow}
        onShutDownRequest={() => setShutDownOpen(true)}
        onDisplayPropertiesRequest={() => setDisplayPropsOpen(true)}
      />

      {/* Desktop Context Menu */}
      {contextMenu.visible && (
        <div
          className="retro-context-menu"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="retro-context-item"
            onClick={() => {
              playClickSound();
              setContextMenu({ visible: false, x: 0, y: 0 });
            }}
          >
            <span><u>A</u>rrange Icons</span>
            <span style={{ fontSize: "9px" }}>▶</span>
          </div>
          <div
            className="retro-context-item"
            onClick={() => {
              playClickSound();
              setContextMenu({ visible: false, x: 0, y: 0 });
            }}
          >
            <span><u>L</u>ine Up Icons</span>
          </div>
          <div
            className="retro-context-item"
            onClick={() => {
              playClickSound();
              setContextMenu({ visible: false, x: 0, y: 0 });
            }}
          >
            <span><u>R</u>efresh</span>
          </div>
          <div className="retro-dropdown-divider" />
          <div
            className="retro-context-item"
            onClick={() => {
              playClickSound();
              onToggleTerminal();
              setContextMenu({ visible: false, x: 0, y: 0 });
            }}
          >
            <span>MS-<u>D</u>OS Prompt</span>
          </div>
          <div className="retro-dropdown-divider" />
          <div
            className="retro-context-item"
            onClick={() => {
              playClickSound();
              setDisplayPropsOpen(true);
              setContextMenu({ visible: false, x: 0, y: 0 });
            }}
          >
            <span><u>P</u>roperties...</span>
          </div>
        </div>
      )}

      {/* Shut Down Windows Modal */}
      {shutDownOpen && (
        <ShutDownDialog
          onClose={() => setShutDownOpen(false)}
          onToggleTerminal={onToggleTerminal}
        />
      )}

      {/* Display Properties Modal */}
      {displayPropsOpen && (
        <DisplayPropertiesDialog
          currentWallpaper={wallpaper}
          onApplyWallpaper={(wp) => setWallpaper(wp)}
          onClose={() => setDisplayPropsOpen(false)}
        />
      )}
    </div>
  );
}
