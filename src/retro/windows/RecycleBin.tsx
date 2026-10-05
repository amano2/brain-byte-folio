import React from "react";

interface RecycleBinProps {
  onClose: () => void;
}

export default function RecycleBin({ onClose }: RecycleBinProps) {
  return (
    <div style={{ padding: "16px", height: "100%", display: "flex", flexDirection: "column", background: "#c0c0c0", fontSize: "12px", alignItems: "center", justifyContent: "center" }}>
      <img src="/icons/windows98-icons/png/recycle_bin_empty-4.png" width="48" height="48" alt="Recycle Bin" style={{ marginBottom: "16px" }} />
      <p style={{ textAlign: "center", margin: "0 0 24px 0" }}>The Recycle Bin is empty. No bad code here! 🧹</p>
      
      <button 
        className="retro-btn" 
        style={{ padding: "4px 24px" }}
        onClick={onClose}
      >
        OK
      </button>
    </div>
  );
}
