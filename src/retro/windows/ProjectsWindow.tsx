import React, { useState } from "react";
import { projects } from "../../data/projects";

export default function ProjectsWindow() {
  const [selectedId, setSelectedId] = useState(projects[0].id);

  const selectedProject = projects.find(p => p.id === selectedId);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", fontSize: "13px" }}>
      
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {/* Left pane: Tree view */}
        <div style={{ width: "200px", background: "white", borderRight: "1px solid #c0c0c0", overflowY: "auto", boxShadow: "inset -1px -1px #fff, inset 1px 1px #808080", padding: "4px" }}>
          {projects.map(p => (
            <div
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              style={{
                padding: "2px 4px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                cursor: "pointer",
                background: selectedId === p.id ? "#000080" : "transparent",
                color: selectedId === p.id ? "white" : "black",
              }}
            >
              <img src={selectedId === p.id ? "/icons/windows98-icons/png/directory_open_file_mydocs-4.png" : "/icons/windows98-icons/png/directory_closed-0.png"} width="16" alt="folder" />
              <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</span>
            </div>
          ))}
        </div>

        {/* Right pane: Content view */}
        <div style={{ flex: 1, background: "white", padding: "16px", overflowY: "auto", boxShadow: "inset -1px -1px #fff, inset 1px 1px #808080" }}>
          {selectedProject ? (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <img src="/icons/windows98-icons/png/executable-0.png" width="32" alt="app" />
                <h2 style={{ margin: 0, fontSize: "16px" }}>{selectedProject.title}</h2>
              </div>
              <p style={{ fontStyle: "italic", color: "#666", marginTop: 0 }}>{selectedProject.subtitle}</p>
              
              <div style={{ margin: "16px 0", background: "#f0f0f0", padding: "8px", border: "1px solid #c0c0c0" }}>
                {selectedProject.description}
              </div>
              
              <strong>Highlights:</strong>
              <ul style={{ paddingLeft: "20px", marginTop: "4px" }}>
                {selectedProject.highlights.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
              
              <div style={{ display: "flex", gap: "8px", marginTop: "16px", flexWrap: "wrap" }}>
                {selectedProject.tags.map(tag => (
                  <span key={tag} style={{ background: "#000080", color: "white", padding: "2px 6px", fontSize: "11px" }}>
                    {tag}
                  </span>
                ))}
              </div>
              
              <div style={{ marginTop: "24px" }}>
                <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer">
                  <button className="retro-btn" style={{ padding: "4px 12px" }}>
                    <img src="/icons/windows98-icons/png/connected_world-0.png" width="16" style={{ marginRight: "4px" }} alt="web" />
                    Open in GitHub
                  </button>
                </a>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
