import { useState, useCallback } from "react";
import { RetroWindow } from "./types";

export function useWindowManager(initialWindows: Omit<RetroWindow, "isOpen" | "isMinimized" | "isMaximized" | "zIndex" | "position" | "size">[]) {
  const [windows, setWindows] = useState<RetroWindow[]>(() => {
    return initialWindows.map((win, index) => ({
      ...win,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 50 + index * 20, y: 50 + index * 20 },
      size: { w: 600, h: 400 },
      zIndex: index + 1,
    }));
  });

  const getTopZIndex = useCallback(() => {
    return Math.max(0, ...windows.map((w) => w.zIndex));
  }, [windows]);

  const openWindow = useCallback((id: string) => {
    setWindows((prev) => {
      const topZ = Math.max(0, ...prev.map((w) => w.zIndex)) + 1;
      return prev.map((w) => {
        if (w.id === id) {
          return { ...w, isOpen: true, isMinimized: false, zIndex: topZ };
        }
        return w;
      });
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w)));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)));
  }, []);

  const restoreWindow = useCallback((id: string) => {
    setWindows((prev) => {
      const topZ = Math.max(0, ...prev.map((w) => w.zIndex)) + 1;
      return prev.map((w) => (w.id === id ? { ...w, isMinimized: false, isMaximized: false, zIndex: topZ } : w));
    });
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows((prev) => {
      const topZ = Math.max(0, ...prev.map((w) => w.zIndex)) + 1;
      return prev.map((w) => (w.id === id ? { ...w, isMaximized: true, isMinimized: false, zIndex: topZ } : w));
    });
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows((prev) => {
      const w = prev.find((w) => w.id === id);
      if (w && w.zIndex === Math.max(0, ...prev.map((pw) => pw.zIndex))) {
        return prev; // already focused
      }
      const topZ = Math.max(0, ...prev.map((pw) => pw.zIndex)) + 1;
      return prev.map((pw) => (pw.id === id ? { ...pw, zIndex: topZ, isMinimized: false } : pw));
    });
  }, []);

  const updatePosition = useCallback((id: string, x: number, y: number) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, position: { x, y } } : w)));
  }, []);

  const updateSize = useCallback((id: string, w: number, h: number) => {
    setWindows((prev) => prev.map((win) => (win.id === id ? { ...win, size: { w, h } } : win)));
  }, []);

  return {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    restoreWindow,
    maximizeWindow,
    focusWindow,
    updatePosition,
    updateSize,
  };
}
