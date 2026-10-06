import React, { useState } from "react";
import { profile } from "../../data/profile";

export default function AboutWindow() {
  const [activeTab, setActiveTab] = useState<"general" | "details">("general");

  return (
    <div style={{ padding: "4px", height: "100%", display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
      <div className="retro-tabs-nav">
        <div className={`retro-tab ${activeTab === "general" ? "active" : ""}`} onClick={() => setActiveTab("general")}>
          General
        </div>
        <div className={`retro-tab ${activeTab === "details" ? "active" : ""}`} onClick={() => setActiveTab("details")}>
          Details
        </div>
      </div>
      
      <div className="retro-tab-content" style={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <img
            src="/icons/windows98-icons/png/computer_explorer-5.png"
            alt="Computer"
            width="32"
            height="32"
            style={{ flexShrink: 0, imageRendering: "pixelated" }}
          />
          <div>
            <h3 style={{ margin: "0 0 2px 0", fontSize: "14px", fontWeight: "bold", color: "#000000" }}>{profile.name}</h3>
            <p style={{ margin: "0", fontSize: "11px", color: "#444" }}>{profile.role}</p>
          </div>
        </div>
        
        <hr style={{ margin: "10px 0", border: 0, borderTop: "1px solid #808080", borderBottom: "1px solid #fff" }} />
        
        {activeTab === "general" && (
          <div style={{ fontSize: "12px", lineHeight: "1.5", color: "#000000" }}>
            <p style={{ margin: "0 0 12px 0" }}>{profile.bio}</p>
            <div>
              <strong style={{ display: "block", marginBottom: "4px" }}>Focus Areas:</strong>
              <ul style={{ paddingLeft: "20px", margin: "4px 0 8px 0" }}>
                {profile.focus.map((f, i) => (
                  <li key={i} style={{ marginBottom: "3px" }}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "details" && (
          <div style={{ fontSize: "12px", lineHeight: "1.6", color: "#000000" }}>
            <p style={{ margin: "0 0 8px 0" }}>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${profile.email}`} style={{ color: "#0000ee", textDecoration: "underline" }}>
                {profile.email}
              </a>
            </p>
            <p style={{ margin: "0 0 8px 0" }}>
              <strong>GitHub:</strong>{" "}
              <a href={profile.github.url} target="_blank" rel="noreferrer" style={{ color: "#0000ee", textDecoration: "underline" }}>
                {profile.github.username}
              </a>
            </p>
            <p style={{ margin: "0 0 8px 0" }}>
              <strong>LinkedIn:</strong>{" "}
              <a href={profile.linkedin.url} target="_blank" rel="noreferrer" style={{ color: "#0000ee", textDecoration: "underline" }}>
                {profile.linkedin.name}
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
