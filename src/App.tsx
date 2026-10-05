import React, { useState } from "react";
import { BrowserRouter, Route, Routes, useParams, useLocation } from "react-router-dom";
import Terminal from "./terminal/Terminal";
import RetroDesktop from "./retro/RetroDesktop";

function TerminalRouteWrapper() {
  const { id } = useParams<{ id?: string }>();
  const location = useLocation();

  const [viewMode, setViewMode] = useState<"terminal" | "retro">(() => {
    try {
      const stored = localStorage.getItem("portfolio_view_mode");
      if (stored === "simple" || stored === "retro") return "retro";
      return "terminal";
    } catch {
      return "terminal";
    }
  });

  const toggleViewMode = () => {
    const next = viewMode === "terminal" ? "retro" : "terminal";
    setViewMode(next);
    try {
      localStorage.setItem("portfolio_view_mode", next);
    } catch {
      // ignore
    }
  };

  // Determine initial command based on deep link route
  let initialCommand: string | undefined = undefined;
  if (id) {
    initialCommand = `read ${id}`;
  } else if (location.pathname === "/blog") {
    initialCommand = "blog";
  } else if (location.pathname !== "/") {
    initialCommand = `echo "404: Path '${location.pathname}' not found. Type 'help' to see available commands."`;
  }

  if (viewMode === "retro") {
    return (
      <RetroDesktop
        onToggleTerminal={toggleViewMode}
        selectedArticleId={id}
      />
    );
  }

  return (
    <Terminal
      onToggleSimpleView={toggleViewMode}
      initialCommand={initialCommand}
    />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TerminalRouteWrapper />} />
        <Route path="/blog" element={<TerminalRouteWrapper />} />
        <Route path="/blog/:id" element={<TerminalRouteWrapper />} />
        <Route path="*" element={<TerminalRouteWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}
