import React from "react";
import { profile } from "../../data/profile";

interface ResearchWindowProps {
  onOpenBlog: (articleId: string) => void;
  onClose: () => void;
}

export default function ResearchWindow({ onOpenBlog, onClose }: ResearchWindowProps) {
  return (
    <div
      style={{
        padding: "12px 14px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#c0c0c0",
        fontFamily: '"MS Sans Serif", Tahoma, Arial, sans-serif',
        fontSize: "11px",
        boxSizing: "border-box",
        overflowY: "auto",
      }}
    >
      {/* Header with unskewed 32x32 icon and cleanly aligned metadata */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "14px" }}>
        <img
          src="/icons/windows98-icons/png/msg_information-0.png"
          width="32"
          height="32"
          alt="Info"
          style={{
            width: "32px",
            height: "32px",
            minWidth: "32px",
            minHeight: "32px",
            maxWidth: "32px",
            maxHeight: "32px",
            flexShrink: 0,
            alignSelf: "flex-start",
            objectFit: "contain",
            imageRendering: "pixelated",
            marginTop: "2px",
          }}
        />
        <div style={{ flex: 1 }}>
          <h2
            style={{
              margin: "0 0 6px 0",
              fontSize: "13px",
              fontWeight: "bold",
              color: "#000000",
              lineHeight: "1.4",
            }}
          >
            {profile.research.title}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "3px", fontSize: "11px", color: "#000000" }}>
            <div>
              <strong style={{ color: "#000080" }}>Authors:</strong> {profile.research.coAuthors.join(", ")}
            </div>
            <div>
              <strong style={{ color: "#000080" }}>Institution:</strong> {profile.research.institution}
            </div>
            <div style={{ fontStyle: "italic", color: "#333333", marginTop: "1px" }}>
              {profile.research.collaboration}
            </div>
          </div>
        </div>
      </div>

      {/* Abstract Fieldset */}
      <fieldset className="retro-fieldset" style={{ marginBottom: "10px", background: "#ffffff", padding: "10px 12px" }}>
        <legend style={{ padding: "0 6px", fontWeight: "bold", color: "#000080" }}>Abstract Summary</legend>
        <p style={{ margin: 0, lineHeight: "1.5", fontSize: "11px", color: "#000000" }}>{profile.research.summary}</p>
      </fieldset>

      {/* Key Results Fieldset */}
      <fieldset className="retro-fieldset" style={{ marginBottom: "14px", background: "#ffffff", padding: "10px 12px" }}>
        <legend style={{ padding: "0 6px", fontWeight: "bold", color: "#000080" }}>Key Results</legend>
        <p style={{ margin: 0, fontWeight: "bold", color: "#007700", fontSize: "11px", lineHeight: "1.5" }}>
          ✓ {profile.research.keyResults}
        </p>
      </fieldset>

      {/* Dialog Action Buttons */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "auto", paddingTop: "6px" }}>
        <button
          className="retro-btn"
          style={{ minWidth: 120, height: 23, fontSize: "11px" }}
          onClick={() => onOpenBlog(profile.research.blogId)}
        >
          Read Full Analysis
        </button>
        <button
          className="retro-btn"
          style={{ minWidth: 75, height: 23, fontSize: "11px" }}
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
}
