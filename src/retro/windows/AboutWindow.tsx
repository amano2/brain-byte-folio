import React, { useState } from "react";
import { profile } from "../../data/profile";

export default function AboutWindow() {
  const [activeTab, setActiveTab] = useState<"general" | "details">("general");

  return (
    <div style={{ padding: "4px", height: "100%", display: "flex", flexDirection: "column" }}>
      <div className="retro-tabs-nav">
        <div className={`retro-tab ${activeTab === "general" ? "active" : ""}`} onClick={() => setActiveTab("general")}>
          General
        </div>
        <div className={`retro-tab ${activeTab === "details" ? "active" : ""}`} onClick={() => setActiveTab("details")}>
          Details
        </div>
      </div>
      
      <div className="retro-tab-content">
        <div style={{ display: "flex", gap: "16px" }}>
          <img src="/icons/windows98-icons/png/computer_explorer-5.png" alt="Computer" width="32" height="32" />
          <div>
            <h3 style={{ margin: "0 0 4px 0", fontSize: "16px" }}>{profile.name}</h3>
            <p style={{ margin: "0", fontSize: "13px", color: "#666" }}>{profile.role}</p>
          </div>
        </div>
        
        <hr style={{ margin: "12px 0", borderTop: "1px solid #808080", borderBottom: "1px solid #fff" }} />
        
        {activeTab === "general" && (
          <div style={{ fontSize: "13px", lineHeight: "1.5" }}>
            <p style={{ marginTop: 0 }}>{profile.bio}</p>
            <div style={{ marginTop: "16px" }}>
              <strong>Focus Areas:</strong>
              <ul style={{ paddingLeft: "20px", marginTop: "4px" }}>
                {profile.focus.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "details" && (
          <div style={{ fontSize: "13px", lineHeight: "1.5" }}>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>GitHub:</strong> <a href={profile.github.url} target="_blank" rel="noreferrer" style={{ color: "blue" }}>{profile.github.username}</a></p>
            <p><strong>LinkedIn:</strong> <a href={profile.linkedin.url} target="_blank" rel="noreferrer" style={{ color: "blue" }}>{profile.linkedin.name}</a></p>
          </div>
        )}
      </div>
    </div>
  );
}
