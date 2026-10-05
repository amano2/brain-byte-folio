import React from "react";
import SnakeGame from "../../terminal/easter/SnakeGame";

export default function SnakeWindow() {
  return (
    <div style={{ height: "100%", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
      {/* We reuse the SnakeGame component, but we don't need its close button since the retro window handles that */}
      <SnakeGame onClose={() => {}} />
    </div>
  );
}
