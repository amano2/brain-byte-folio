import React from "react";
import { profile } from "../../data/profile";

export default function ContactWindow() {
  return (
    <div style={{ padding: "4px", height: "100%", display: "flex", flexDirection: "column", background: "#c0c0c0", fontSize: "12px" }}>
      {/* Toolbar */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "8px", borderBottom: "1px solid #808080", paddingBottom: "4px" }}>
        <a href={`mailto:${profile.email}`} style={{ textDecoration: "none", color: "inherit" }}>
          <button className="retro-btn" style={{ padding: "4px" }}>
            <img src="/icons/windows98-icons/png/message_envelope_open-0.png" width="24" alt="Send" style={{ display: "block" }} />
            <span style={{ fontSize: "10px" }}>Send</span>
          </button>
        </a>
      </div>
      
      {/* Form Fields */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "8px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: "60px", color: "#666" }}>To:</div>
          <div style={{ flex: 1, background: "white", padding: "2px 4px", border: "1px solid #808080", boxShadow: "inset 1px 1px #0a0a0a" }}>
            {profile.email}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: "60px", color: "#666" }}>Subject:</div>
          <input 
            type="text" 
            defaultValue="Hello Aman!" 
            style={{ flex: 1, padding: "2px 4px", border: "1px solid #808080", boxShadow: "inset 1px 1px #0a0a0a", outline: "none", fontFamily: "inherit" }} 
          />
        </div>
      </div>
      
      {/* Body Area */}
      <textarea 
        style={{ 
          flex: 1, 
          width: "100%", 
          padding: "8px", 
          border: "1px solid #808080", 
          boxShadow: "inset 1px 1px #0a0a0a", 
          resize: "none",
          fontFamily: "inherit",
          outline: "none"
        }}
        defaultValue="Type your message here..."
      />
      
      {/* Status Bar */}
      <div style={{ display: "flex", gap: "16px", marginTop: "8px", paddingTop: "4px", borderTop: "1px solid #808080" }}>
        <a href={profile.github.url} target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "blue", display: "flex", alignItems: "center", gap: "4px" }}>
          <img src="/icons/windows98-icons/png/connected_world-0.png" width="16" alt="GitHub" />
          GitHub
        </a>
        <a href={profile.linkedin.url} target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "blue", display: "flex", alignItems: "center", gap: "4px" }}>
          <img src="/icons/windows98-icons/png/address_book-0.png" width="16" alt="LinkedIn" />
          LinkedIn
        </a>
      </div>
    </div>
  );
}
