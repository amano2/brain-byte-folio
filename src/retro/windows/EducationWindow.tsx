import React from "react";
import { profile } from "../../data/profile";

export default function EducationWindow() {
  return (
    <div style={{ padding: "8px", height: "100%", overflowY: "auto", background: "white", boxShadow: "inset -1px -1px #fff, inset 1px 1px #808080" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
        <img src="/icons/windows98-icons/png/certificate-0.png" width="32" alt="Education" />
        <h2 style={{ margin: 0, fontSize: "16px" }}>Education & Certifications</h2>
      </div>
      
      <div style={{ padding: "2px" }}>
        {profile.education.map((edu, idx) => (
          <div key={idx} style={{ marginBottom: "16px", padding: "12px", border: "2px groove #c0c0c0", background: "#fdfdfd" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <h3 style={{ margin: "0 0 4px 0", fontSize: "14px", color: "#000080" }}>{edu.degree}</h3>
              <span style={{ fontSize: "11px", fontWeight: "bold", background: "#c0c0c0", padding: "2px 6px", border: "1px solid #808080" }}>{edu.period}</span>
            </div>
            <p style={{ margin: "0 0 8px 0", fontSize: "13px", fontWeight: "bold" }}>{edu.institution}</p>
            <p style={{ margin: "0 0 4px 0", fontSize: "12px", color: "green", fontWeight: "bold" }}>CGPA: {edu.cgpa}</p>
            {edu.notes && <p style={{ margin: 0, fontSize: "11px", fontStyle: "italic", color: "#666" }}>{edu.notes}</p>}
          </div>
        ))}
      </div>
      
      <h3 style={{ fontSize: "14px", borderBottom: "1px solid #c0c0c0", paddingBottom: "4px", marginTop: "24px" }}>Certifications</h3>
      
      <div style={{ padding: "2px" }}>
        {profile.certifications.map((cert, idx) => (
          <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px", background: "#f0f0f0", border: "1px solid #c0c0c0", marginBottom: "8px" }}>
            <img src="/icons/windows98-icons/png/check-0.png" width="16" alt="Check" />
            <div>
              <div style={{ fontSize: "13px", fontWeight: "bold" }}>{cert.name}</div>
              <div style={{ fontSize: "11px", color: "#666" }}>{cert.issuer} {cert.period ? `(${cert.period})` : ""}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
