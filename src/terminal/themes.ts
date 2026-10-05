export interface ThemeTokens {
  id: string;
  name: string;
  bg: string;
  fg: string;
  prompt: string;
  path: string;
  accent: string;
  secondary: string;
  muted: string;
  error: string;
  border: string;
  headerBg: string;
  cursor: string;
  codeBg: string;
}

export const themes: Record<string, ThemeTokens> = {
  matrix: {
    id: "matrix",
    name: "Matrix (Default)",
    bg: "#0d1117",
    fg: "#e5e7eb",
    prompt: "#00ff66",
    path: "#38bdf8",
    accent: "#00ff66",
    secondary: "#22d3ee",
    muted: "rgba(229, 231, 235, 0.6)",
    error: "#f87171",
    border: "#1f2937",
    headerBg: "#161b22",
    cursor: "#00ff66",
    codeBg: "rgba(0, 255, 102, 0.05)"
  },
  dracula: {
    id: "dracula",
    name: "Dracula",
    bg: "#282a36",
    fg: "#f8f8f2",
    prompt: "#50fa7b",
    path: "#8be9fd",
    accent: "#bd93f9",
    secondary: "#ff79c6",
    muted: "rgba(248, 248, 242, 0.6)",
    error: "#ff5555",
    border: "#44475a",
    headerBg: "#21222c",
    cursor: "#bd93f9",
    codeBg: "rgba(189, 147, 249, 0.08)"
  },
  ubuntu: {
    id: "ubuntu",
    name: "Ubuntu",
    bg: "#300a24",
    fg: "#ffffff",
    prompt: "#4af626",
    path: "#ffffff",
    accent: "#e95420",
    secondary: "#77216f",
    muted: "rgba(255, 255, 255, 0.65)",
    error: "#df382c",
    border: "#5e2750",
    headerBg: "#3c0f2f",
    cursor: "#e95420",
    codeBg: "rgba(233, 84, 32, 0.08)"
  },
  "solarized-dark": {
    id: "solarized-dark",
    name: "Solarized Dark",
    bg: "#002b36",
    fg: "#93a1a1",
    prompt: "#859900",
    path: "#268bd2",
    accent: "#2aa198",
    secondary: "#b58900",
    muted: "rgba(147, 161, 161, 0.6)",
    error: "#dc322f",
    border: "#073642",
    headerBg: "#00212b",
    cursor: "#2aa198",
    codeBg: "rgba(42, 161, 152, 0.08)"
  },
  light: {
    id: "light",
    name: "Clean Light",
    bg: "#f8fafc",
    fg: "#0f172a",
    prompt: "#0284c7",
    path: "#6366f1",
    accent: "#2563eb",
    secondary: "#0891b2",
    muted: "rgba(15, 23, 42, 0.6)",
    error: "#ef4444",
    border: "#cbd5e1",
    headerBg: "#e2e8f0",
    cursor: "#2563eb",
    codeBg: "rgba(37, 99, 235, 0.06)"
  }
};

const THEME_STORAGE_KEY = "portfolio_terminal_theme";

export function getSavedTheme(): string {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved && themes[saved]) {
      return saved;
    }
  } catch {
    // fallback if localStorage blocked
  }
  return "matrix";
}

export function saveTheme(themeId: string): void {
  try {
    if (themes[themeId]) {
      localStorage.setItem(THEME_STORAGE_KEY, themeId);
    }
  } catch {
    // ignore storage error
  }
}

export function applyTheme(themeId: string): void {
  const theme = themes[themeId] || themes.matrix;
  const root = document.documentElement;

  root.style.setProperty("--term-bg", theme.bg);
  root.style.setProperty("--term-fg", theme.fg);
  root.style.setProperty("--term-prompt", theme.prompt);
  root.style.setProperty("--term-path", theme.path);
  root.style.setProperty("--term-accent", theme.accent);
  root.style.setProperty("--term-secondary", theme.secondary);
  root.style.setProperty("--term-muted", theme.muted);
  root.style.setProperty("--term-error", theme.error);
  root.style.setProperty("--term-border", theme.border);
  root.style.setProperty("--term-header-bg", theme.headerBg);
  root.style.setProperty("--term-cursor", theme.cursor);
  root.style.setProperty("--term-code-bg", theme.codeBg);
}
