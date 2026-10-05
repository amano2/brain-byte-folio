import React, { useState } from "react";
import { skillGroups } from "../../data/skills";

export default function SkillsWindow() {
  const [activeTabId, setActiveTabId] = useState(skillGroups[0].id);

  const activeGroup = skillGroups.find(g => g.id === activeTabId);

  return (
    <div style={{ padding: "4px", height: "100%", display: "flex", flexDirection: "column" }}>
      <div className="retro-tabs-nav" style={{ flexWrap: "wrap" }}>
        {skillGroups.map(group => (
          <div 
            key={group.id}
            className={`retro-tab ${activeTabId === group.id ? "active" : ""}`} 
            onClick={() => setActiveTabId(group.id)}
            style={{ fontSize: "11px", padding: "2px 6px" }}
          >
            {group.category}
          </div>
        ))}
      </div>
      
      <div className="retro-tab-content" style={{ overflowY: "auto" }}>
        {activeGroup && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <img src="/icons/windows98-icons/png/chart1-1.png" width="32" alt="skills" />
              <div>
                <h3 style={{ margin: "0 0 4px 0", fontSize: "16px" }}>{activeGroup.category}</h3>
                <p style={{ margin: "0", fontSize: "12px", color: "#666" }}>{activeGroup.description}</p>
              </div>
            </div>
            
            <div style={{ padding: "8px", border: "1px solid #808080", boxShadow: "inset 1px 1px #0a0a0a, inset -1px -1px #fff", background: "#f0f0f0" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {activeGroup.skills.map(skill => (
                  <div key={skill} style={{
                    background: "#c0c0c0",
                    border: "1px solid",
                    borderColor: "#fff #808080 #808080 #fff",
                    padding: "4px 8px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  }}>
                    <div style={{ width: "6px", height: "6px", background: "#000080", borderRadius: "50%" }}></div>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
