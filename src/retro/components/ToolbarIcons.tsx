import React from "react";

// Pixel-perfect Windows 98 Explorer Toolbar Icons
export const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
    <circle cx="9" cy="9" r="8" fill="#1084d0" stroke="#000080" strokeWidth="1" />
    <path d="M9 4L4 9L9 14V11H14V7H9V4Z" fill="#ffffff" stroke="#000080" strokeWidth="0.8" />
  </svg>
);

export const ForwardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
    <circle cx="9" cy="9" r="8" fill="#1084d0" stroke="#000080" strokeWidth="1" />
    <path d="M9 4L14 9L9 14V11H4V7H9V4Z" fill="#ffffff" stroke="#000080" strokeWidth="0.8" />
  </svg>
);

export const UpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
    {/* Yellow Folder */}
    <path d="M2 5H7L9 7H16V15H2V5Z" fill="#f4cb42" stroke="#8a6c14" strokeWidth="1" />
    <path d="M2 7H16V15H2V7Z" fill="#f8dc72" />
    {/* Green Up Arrow */}
    <path d="M9 1L5 5H8V9H10V5H13L9 1Z" fill="#00aa00" stroke="#005500" strokeWidth="0.8" />
  </svg>
);

export const CutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
    {/* Scissors */}
    <circle cx="4.5" cy="13.5" r="2.5" stroke="#404040" strokeWidth="1.2" fill="#c0c0c0" />
    <circle cx="13.5" cy="13.5" r="2.5" stroke="#404040" strokeWidth="1.2" fill="#c0c0c0" />
    <line x1="5.5" y1="12" x2="13" y2="3" stroke="#404040" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="12.5" y1="12" x2="5" y2="3" stroke="#404040" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="9" cy="8" r="1" fill="#000000" />
  </svg>
);

export const CopyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
    {/* Back document */}
    <rect x="5.5" y="1.5" width="10" height="12" fill="#ffffff" stroke="#000000" strokeWidth="1" />
    <line x1="8" y1="4" x2="13" y2="4" stroke="#000080" strokeWidth="1" />
    <line x1="8" y1="6" x2="13" y2="6" stroke="#808080" strokeWidth="1" />
    <line x1="8" y1="8" x2="13" y2="8" stroke="#808080" strokeWidth="1" />
    {/* Front document */}
    <rect x="2.5" y="4.5" width="10" height="12" fill="#ffffff" stroke="#000000" strokeWidth="1" />
    <line x1="5" y1="7" x2="10" y2="7" stroke="#000080" strokeWidth="1" />
    <line x1="5" y1="9" x2="10" y2="9" stroke="#808080" strokeWidth="1" />
    <line x1="5" y1="11" x2="10" y2="11" stroke="#808080" strokeWidth="1" />
    <line x1="5" y1="13" x2="8" y2="13" stroke="#808080" strokeWidth="1" />
  </svg>
);

export const PasteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
    {/* Clipboard backing */}
    <rect x="3.5" y="3.5" width="11" height="13" rx="1" fill="#9c6d3b" stroke="#5a3d1c" strokeWidth="1" />
    {/* Clip top */}
    <rect x="7" y="1.5" width="4" height="3" fill="#c0c0c0" stroke="#404040" strokeWidth="1" />
    {/* Paper sheet */}
    <rect x="5.5" y="5.5" width="7" height="9" fill="#ffffff" stroke="#404040" strokeWidth="0.8" />
    <line x1="7" y1="7.5" x2="10.5" y2="7.5" stroke="#000080" strokeWidth="0.8" />
    <line x1="7" y1="9.5" x2="10.5" y2="9.5" stroke="#808080" strokeWidth="0.8" />
    <line x1="7" y1="11.5" x2="9.5" y2="11.5" stroke="#808080" strokeWidth="0.8" />
  </svg>
);

export const UndoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
    <path
      d="M14 13C14 8.5 10.5 6 6 6V3L1 7.5L6 12V9C9.5 9 12 10.5 12 13H14Z"
      fill="#1084d0"
      stroke="#000080"
      strokeWidth="0.8"
    />
  </svg>
);

export const DeleteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
    {/* Document */}
    <rect x="2.5" y="2.5" width="10" height="13" fill="#ffffff" stroke="#808080" strokeWidth="1" />
    <line x1="4.5" y1="5.5" x2="9.5" y2="5.5" stroke="#c0c0c0" strokeWidth="1" />
    <line x1="4.5" y1="8" x2="8" y2="8" stroke="#c0c0c0" strokeWidth="1" />
    {/* Red Cross */}
    <line x1="10" y1="9" x2="16" y2="15" stroke="#d00000" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="16" y1="9" x2="10" y2="15" stroke="#d00000" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const PropertiesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
    {/* Sheet */}
    <rect x="2.5" y="1.5" width="10" height="13" fill="#ffffff" stroke="#000000" strokeWidth="1" />
    <line x1="5" y1="4.5" x2="9.5" y2="4.5" stroke="#808080" strokeWidth="1" />
    <line x1="5" y1="7" x2="9.5" y2="7" stroke="#808080" strokeWidth="1" />
    <line x1="5" y1="9.5" x2="8" y2="9.5" stroke="#808080" strokeWidth="1" />
    {/* Blue info badge */}
    <circle cx="12.5" cy="12.5" r="4.5" fill="#000080" stroke="#ffffff" strokeWidth="0.8" />
    <text x="12.5" y="15" fill="#ffffff" fontSize="8" fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle">i</text>
  </svg>
);

export const ViewsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
    <rect x="2.5" y="2.5" width="5.5" height="5.5" fill="#ffffff" stroke="#000000" strokeWidth="1" />
    <rect x="10" y="2.5" width="5.5" height="5.5" fill="#ffffff" stroke="#000000" strokeWidth="1" />
    <rect x="2.5" y="10" width="5.5" height="5.5" fill="#ffffff" stroke="#000000" strokeWidth="1" />
    <rect x="10" y="10" width="5.5" height="5.5" fill="#ffffff" stroke="#000000" strokeWidth="1" />
  </svg>
);
