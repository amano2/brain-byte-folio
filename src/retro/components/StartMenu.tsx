import React, { useEffect, useRef, useState } from "react";
import { playClickSound, playAsteriskSound } from "../utils/soundEffects";

interface StartMenuProps {
  onClose: () => void;
  onToggleTerminal: () => void;
  onOpenWindow: (id: string) => void;
  onShutDownRequest: () => void;
  onDisplayPropertiesRequest: () => void;
}

export default function StartMenu({
  onClose,
  onToggleTerminal,
  onOpenWindow,
  onShutDownRequest,
  onDisplayPropertiesRequest,
}: StartMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleItemClick = (windowId: string) => {
    playClickSound();
    onOpenWindow(windowId);
    onClose();
  };

  return (
    <div ref={menuRef} className="retro-start-menu" onClick={(e) => e.stopPropagation()}>
      {/* Authentic Windows 98 Vertical Gradient Banner */}
      <div className="retro-start-menu-sidebar">
        <div className="retro-start-menu-sidebar-text">
          <span>Windows</span><span className="flag-98">98</span>
        </div>
      </div>

      {/* Start Menu Items */}
      <div className="retro-start-menu-items">
        {/* Programs Submenu */}
        <div
          className="retro-start-menu-item"
          onMouseEnter={() => setActiveSubmenu("programs")}
        >
          <div className="retro-start-menu-item-left">
            <img src="/icons/windows98-icons/png/directory_open_file_mydocs-4.png" alt="Programs" width="22" height="22" />
            <span><u>P</u>rograms</span>
          </div>
          <span style={{ fontSize: "9px" }}>▶</span>

          {activeSubmenu === "programs" && (
            <div className="retro-start-submenu" style={{ top: 0 }}>
              <div className="retro-start-menu-item" onClick={() => handleItemClick("about")}>
                <div className="retro-start-menu-item-left">
                  <img src="/icons/windows98-icons/png/computer_explorer-5.png" alt="About" width="20" height="20" />
                  <span>About Me</span>
                </div>
              </div>
              <div className="retro-start-menu-item" onClick={() => handleItemClick("projects")}>
                <div className="retro-start-menu-item-left">
                  <img src="/icons/windows98-icons/png/directory_open_file_mydocs-4.png" alt="Projects" width="20" height="20" />
                  <span>Projects</span>
                </div>
              </div>
              <div className="retro-start-menu-item" onClick={() => handleItemClick("skills")}>
                <div className="retro-start-menu-item-left">
                  <img src="/icons/windows98-icons/png/chart1-1.png" alt="Skills" width="20" height="20" />
                  <span>Skills</span>
                </div>
              </div>
              <div className="retro-start-menu-item" onClick={() => handleItemClick("education")}>
                <div className="retro-start-menu-item-left">
                  <img src="/icons/windows98-icons/png/certificate-0.png" alt="Education" width="20" height="20" />
                  <span>Education</span>
                </div>
              </div>
              <div className="retro-start-menu-item" onClick={() => handleItemClick("contact")}>
                <div className="retro-start-menu-item-left">
                  <img src="/icons/windows98-icons/png/message_envelope_open-0.png" alt="Contact" width="20" height="20" />
                  <span>Contact Form</span>
                </div>
              </div>
              <div className="retro-start-menu-item" onClick={() => handleItemClick("snake")}>
                <div className="retro-start-menu-item-left">
                  <img src="/icons/windows98-icons/png/joystick-0.png" alt="Snake Game" width="20" height="20" />
                  <span>Snake Game</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Documents Submenu */}
        <div
          className="retro-start-menu-item"
          onMouseEnter={() => setActiveSubmenu("documents")}
        >
          <div className="retro-start-menu-item-left">
            <img src="/icons/windows98-icons/png/directory_open_file_mydocs-0.png" alt="Documents" width="22" height="22" />
            <span><u>D</u>ocuments</span>
          </div>
          <span style={{ fontSize: "9px" }}>▶</span>

          {activeSubmenu === "documents" && (
            <div className="retro-start-submenu" style={{ top: 24 }}>
              <div className="retro-start-menu-item" onClick={() => handleItemClick("resume")}>
                <div className="retro-start-menu-item-left">
                  <img src="/icons/windows98-icons/png/file_lines-0.png" alt="Resume" width="20" height="20" />
                  <span>Resume.txt</span>
                </div>
              </div>
              <div className="retro-start-menu-item" onClick={() => handleItemClick("research")}>
                <div className="retro-start-menu-item-left">
                  <img src="/icons/windows98-icons/png/msg_information-0.png" alt="Research" width="20" height="20" />
                  <span>Research Papers</span>
                </div>
              </div>
              <div className="retro-start-menu-item" onClick={() => handleItemClick("blog")}>
                <div className="retro-start-menu-item-left">
                  <img src="/icons/windows98-icons/png/notepad-0.png" alt="Blog" width="20" height="20" />
                  <span>Articles & Notes</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Settings Submenu */}
        <div
          className="retro-start-menu-item"
          onMouseEnter={() => setActiveSubmenu("settings")}
        >
          <div className="retro-start-menu-item-left">
            <img src="/icons/windows98-icons/png/settings_gear-0.png" alt="Settings" width="22" height="22" />
            <span><u>S</u>ettings</span>
          </div>
          <span style={{ fontSize: "9px" }}>▶</span>

          {activeSubmenu === "settings" && (
            <div className="retro-start-submenu" style={{ top: 48 }}>
              <div
                className="retro-start-menu-item"
                onClick={() => {
                  playClickSound();
                  onDisplayPropertiesRequest();
                  onClose();
                }}
              >
                <div className="retro-start-menu-item-left">
                  <img src="/icons/windows98-icons/png/themes-0.png" alt="Display Properties" width="20" height="20" />
                  <span>Display Properties...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Help */}
        <div
          className="retro-start-menu-item"
          onMouseEnter={() => setActiveSubmenu(null)}
          onClick={() => {
            playAsteriskSound();
            alert("Windows 98 Portfolio Help:\n\n- Double-click desktop icons or use the Start menu to open windows.\n- Click and drag windows to move or resize them.\n- Use the Quick Launch bar or Start Menu to switch to Terminal mode anytime!");
            onClose();
          }}
        >
          <div className="retro-start-menu-item-left">
            <img src="/icons/windows98-icons/png/help_book_cool-0.png" alt="Help" width="22" height="22" />
            <span><u>H</u>elp</span>
          </div>
        </div>

        <div className="retro-start-menu-divider" />

        {/* MS-DOS Prompt (Switch to Terminal) */}
        <div
          className="retro-start-menu-item"
          onMouseEnter={() => setActiveSubmenu(null)}
          onClick={() => {
            playClickSound();
            onToggleTerminal();
            onClose();
          }}
        >
          <div className="retro-start-menu-item-left">
            <img src="/icons/windows98-icons/png/console_prompt-0.png" alt="MS-DOS Prompt" width="22" height="22" />
            <span><u>M</u>S-DOS Prompt (Terminal)</span>
          </div>
        </div>

        <div className="retro-start-menu-divider" />

        {/* Log Off */}
        <div
          className="retro-start-menu-item"
          onMouseEnter={() => setActiveSubmenu(null)}
          onClick={() => {
            playAsteriskSound();
            alert("Logged off Aman Hossain.\nSession saved.");
            onClose();
          }}
        >
          <div className="retro-start-menu-item-left">
            <img src="/icons/windows98-icons/png/users_key-0.png" alt="Log Off" width="22" height="22" />
            <span><u>L</u>og Off Aman...</span>
          </div>
        </div>

        {/* Shut Down */}
        <div
          className="retro-start-menu-item"
          onMouseEnter={() => setActiveSubmenu(null)}
          onClick={() => {
            playClickSound();
            onShutDownRequest();
            onClose();
          }}
        >
          <div className="retro-start-menu-item-left">
            <img src="/icons/windows98-icons/png/shut_down_normal-2.png" alt="Shut Down" width="22" height="22" />
            <span>Sh<u>u</u>t Down...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
