import React from "react";
import { profile } from "../../data/profile";

interface ResearchWindowProps {
  onOpenBlog: (articleId: string) => void;
  onClose: () => void;
}

export default function ResearchWindow({ onOpenBlog, onClose }: ResearchWindowProps) {
  return (
    <div style={{ padding: "12px", height: "100%", display: "flex", flexDirection: "column", background: "#c0c0c0", fontSize: "12px" }}>
      <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        <img src="/icons/windows98-icons/png/msg_information-0.png" width="32" height="32" alt="Info" />
        <div>
          <h2 style={{ margin: "0 0 8px 0", fontSize: "14px" }}>{profile.research.title}</h2>
          <p style={{ margin: "0 0 4px 0" }}><strong>Authors:</strong> {profile.research.coAuthors.join(", ")}</p>
          <p style={{ margin: "0 0 4px 0" }}><strong>Institution:</strong> {profile.research.institution}</p>
          <p style={{ margin: "0 0 12px 0", fontStyle: "italic" }}>{profile.research.collaboration}</p>
        </div>
      </div>

      <fieldset style={{ border: "1px solid #808080", padding: "8px", margin: "0 0 16px 0", boxShadow: "inset 1px 1px #fff, inset -1px -1px #0a0a0a" }}>
        <legend style={{ padding: "0 4px" }}>Abstract Summary</legend>
        <p style={{ margin: 0, lineHeight: "1.4" }}>{profile.research.summary}</p>
      </fieldset>

      <fieldset style={{ border: "1px solid #808080", padding: "8px", margin: "0 0 16px 0", boxShadow: "inset 1px 1px #fff, inset -1px -1px #0a0a0a" }}>
        <legend style={{ padding: "0 4px" }}>Key Results</legend>
        <p style={{ margin: 0, fontWeight: "bold", color: "green" }}>{profile.research.keyResults}</p>
      </fieldset>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "auto" }}>
        <button 
          className="retro-btn" 
          style={{ padding: "4px 12px" }}
          onClick={() => onOpenBlog(profile.research.blogId)}
        >
          Read Full Analysis
        </button>
        <button 
          className="retro-btn" 
          style={{ padding: "4px 16px" }}
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
}
