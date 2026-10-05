import React from "react";
import { profile } from "../../data/profile";

export default function ResumeWindow() {
  return (
    <div style={{ padding: "0px", height: "100%", display: "flex", flexDirection: "column", background: "white" }}>
      {/* Menu bar */}
      <div style={{ display: "flex", background: "#c0c0c0", padding: "2px 4px", fontSize: "12px", borderBottom: "1px solid #808080" }}>
        <span style={{ padding: "0 6px" }}><u>F</u>ile</span>
        <span style={{ padding: "0 6px" }}><u>E</u>dit</span>
        <span style={{ padding: "0 6px" }}><u>S</u>earch</span>
        <span style={{ padding: "0 6px" }}><u>H</u>elp</span>
      </div>

      <div style={{ flex: 1, padding: "16px", overflowY: "auto", fontFamily: "'Courier New', Courier, monospace", fontSize: "14px", lineHeight: "1.6" }}>
        <h1 style={{ marginTop: 0, textAlign: "center", borderBottom: "2px double #000", paddingBottom: "8px" }}>RESUME - {profile.name.toUpperCase()}</h1>
        
        <p style={{ textAlign: "center" }}>
          {profile.role}
          <br/>
          {profile.email}
        </p>

        <p style={{ marginTop: "24px" }}>
          This document is stored securely on Google Docs.
        </p>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "32px" }}>
          <a href={profile.resumeUrl} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
            <button className="retro-btn" style={{ padding: "8px 24px", fontSize: "14px" }}>
              <img src="/icons/windows98-icons/png/file_lines-0.png" width="24" alt="doc" style={{ marginRight: "8px", verticalAlign: "middle" }} />
              Open Official Resume
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
