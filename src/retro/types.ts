import React from "react";

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  w: number;
  h: number;
}

export interface RetroWindow {
  id: string;
  title: string;
  icon?: React.ReactNode;
  component: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: Position;
  size: Size;
  zIndex: number;
}

export interface DesktopIconType {
  id: string;
  label: string;
  icon: React.ReactNode;
  windowId: string;
}

export interface StartMenuItem {
  label: string;
  icon?: React.ReactNode;
  action: "open-window" | "link" | "shutdown";
  target?: string;
  divider?: boolean;
}
