import React from "react";

export type OutputBlock =
  | { type: "text"; text: string; className?: string }
  | { type: "table"; headers: string[]; rows: (string | React.ReactNode)[][]; caption?: string }
  | { type: "links"; links: Array<{ label: string; url: string; description?: string }> }
  | { type: "markdown"; content: string }
  | { type: "ascii"; art: string; color?: string }
  | { type: "error"; message: string; suggestion?: string }
  | { type: "component"; component: React.ReactNode };

export interface CommandContext {
  setTheme: (theme: string) => void;
  currentTheme: string;
  currentPath: string;
  setCurrentPath: (path: string) => void;
  clearHistory: () => void;
  executeCommand: (cmd: string) => void;
  history: string[];
  openLink?: (url: string) => void;
  copyToClipboard?: (text: string) => Promise<boolean>;
  setReadingProgress?: (progress: number | null) => void;
  toggleSimpleView?: () => void;
  setHackermode?: (active: boolean) => void;
  setGameActive?: (active: boolean) => void;
}

export interface Command {
  name: string;
  aliases?: string[];
  description: string;
  usage: string;
  category: "content" | "fs" | "system" | "fun";
  run: (
    args: string[],
    flags: Record<string, string | boolean>,
    ctx: CommandContext
  ) => OutputBlock[] | Promise<OutputBlock[]>;
  autocomplete?: (
    args: string[],
    flags: Record<string, string | boolean>,
    ctx: CommandContext
  ) => string[];
}

export interface TerminalHistoryEntry {
  id: string;
  command: string;
  timestamp: number;
  path: string;
  output: OutputBlock[];
}

export interface ParsedInput {
  raw: string;
  cmd: string;
  args: string[];
  flags: Record<string, string | boolean>;
}
