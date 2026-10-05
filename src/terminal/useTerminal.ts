import { useState, useEffect, useCallback, useRef } from "react";
import { TerminalHistoryEntry, CommandContext, OutputBlock } from "./types";
import { parseInput, resolveHistoryExpansion } from "./parser";
import { registry } from "./registry";
import { findClosestCommand } from "./levenshtein";
import { getSavedTheme, saveTheme, applyTheme } from "./themes";

const HISTORY_STORAGE_KEY = "portfolio_terminal_cmd_history";

function loadSessionHistory(): string[] {
  try {
    const raw = sessionStorage.getItem(HISTORY_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // sessionStorage fallback
  }
  return [];
}

function saveSessionHistory(history: string[]): void {
  try {
    sessionStorage.setItem(
      HISTORY_STORAGE_KEY,
      JSON.stringify(history.slice(-100)) // keep last 100
    );
  } catch {
    // ignore
  }
}

export function useTerminal() {
  const [entries, setEntries] = useState<TerminalHistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>(loadSessionHistory);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [currentPath, setCurrentPath] = useState("~");
  const [currentTheme, setCurrentThemeState] = useState(getSavedTheme);
  const [readingProgress, setReadingProgress] = useState<number | null>(null);
  const [hackermodeActive, setHackermodeActive] = useState(false);
  const [gameActive, setGameActive] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastTabPressRef = useRef<number>(0);

  // Apply theme on mount and when changed
  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  const setTheme = useCallback((themeId: string) => {
    saveTheme(themeId);
    setCurrentThemeState(themeId);
    applyTheme(themeId);
  }, []);

  const clearHistory = useCallback(() => {
    setEntries([]);
  }, []);

  const copyToClipboard = useCallback(async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // fallback
    }
    return false;
  }, []);

  const openLink = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  // Context passed to commands
  const getContext = useCallback(
    (): CommandContext => ({
      setTheme,
      currentTheme,
      currentPath,
      setCurrentPath,
      clearHistory,
      executeCommand: (cmd: string) => {
        execute(cmd);
      },
      history: commandHistory,
      openLink,
      copyToClipboard,
      setReadingProgress,
      setHackermode: (active: boolean) => setHackermodeActive(active),
      setGameActive: (active: boolean) => setGameActive(active)
    }),
    [
      setTheme,
      currentTheme,
      currentPath,
      clearHistory,
      commandHistory,
      openLink,
      copyToClipboard
    ]
  );

  // Execute a command
  const execute = useCallback(
    async (rawCommand: string) => {
      const resolved = resolveHistoryExpansion(rawCommand, commandHistory);
      const trimmed = resolved.trim();

      if (!trimmed) {
        return;
      }

      // Add to command history
      const nextHistory = [...commandHistory, resolved];
      setCommandHistory(nextHistory);
      saveSessionHistory(nextHistory);
      setHistoryIndex(-1);

      const parsed = parseInput(resolved);

      // Handle 'clear' directly
      if (parsed.cmd === "clear") {
        clearHistory();
        setInput("");
        return;
      }

      const cmd = registry.get(parsed.cmd);
      let output: OutputBlock[] = [];

      if (cmd) {
        try {
          const result = await cmd.run(parsed.args, parsed.flags, getContext());
          output = result;
        } catch (err: unknown) {
          const errMsg = err instanceof Error ? err.message : String(err);
          output = [{ type: "error", message: `Command error: ${errMsg}` }];
        }
      } else {
        const suggestion = findClosestCommand(parsed.cmd, registry.getAllNames());
        output = [
          {
            type: "error",
            message: `command not found: ${parsed.cmd}`,
            suggestion: suggestion || undefined
          }
        ];
      }

      const entryId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setEntries((prev) => [
        ...prev,
        {
          id: entryId,
          command: resolved,
          timestamp: Date.now(),
          path: currentPath,
          output
        }
      ]);

      setInput("");
    },
    [commandHistory, currentPath, clearHistory, getContext]
  );

  // Handle Tab Autocompletion
  const handleTab = useCallback(() => {
    const now = Date.now();
    const isDoubleTab = now - lastTabPressRef.current < 500;
    lastTabPressRef.current = now;

    const trimmed = input.trimStart();
    const tokens = trimmed.split(/\s+/);

    if (tokens.length <= 1) {
      const partial = tokens[0] || "";
      const matches = registry
        .getAllNames()
        .filter((name) => name.startsWith(partial.toLowerCase()))
        .sort();

      if (matches.length === 1) {
        setInput(matches[0] + " ");
      } else if (matches.length > 1) {
        // Find longest common prefix
        let common = matches[0];
        for (let i = 1; i < matches.length; i++) {
          while (!matches[i].startsWith(common)) {
            common = common.slice(0, -1);
          }
        }
        if (common.length > partial.length) {
          setInput(common);
        } else if (isDoubleTab) {
          // Display candidates
          setEntries((prev) => [
            ...prev,
            {
              id: `${Date.now()}`,
              command: input,
              timestamp: Date.now(),
              path: currentPath,
              output: [
                {
                  type: "text",
                  text: matches.join("   "),
                  className: "text-[var(--term-accent)] text-xs"
                }
              ]
            }
          ]);
        }
      }
      return;
    }

    // Argument autocompletion
    const cmdName = tokens[0].toLowerCase();
    const cmd = registry.get(cmdName);
    if (cmd && cmd.autocomplete) {
      const parsed = parseInput(trimmed);
      const candidates = cmd.autocomplete(parsed.args, parsed.flags, getContext());
      const currentToken = tokens[tokens.length - 1];
      const matches = candidates.filter((c) =>
        c.toLowerCase().startsWith(currentToken.toLowerCase())
      );

      if (matches.length === 1) {
        tokens[tokens.length - 1] = matches[0];
        setInput(tokens.join(" ") + " ");
      } else if (matches.length > 1 && isDoubleTab) {
        setEntries((prev) => [
          ...prev,
          {
            id: `${Date.now()}`,
            command: input,
            timestamp: Date.now(),
            path: currentPath,
            output: [
              {
                type: "text",
                text: matches.join("   "),
                className: "text-[var(--term-secondary)] text-xs"
              }
            ]
          }
        ]);
      }
    }
  }, [input, currentPath, getContext]);

  // Handle keyboard events in input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Tab completion
    if (e.key === "Tab") {
      e.preventDefault();
      handleTab();
      return;
    }

    // History navigation Up
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInput(commandHistory[nextIdx]);
      return;
    }

    // History navigation Down
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      if (historyIndex >= commandHistory.length - 1) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[nextIdx]);
      }
      return;
    }

    // Enter to execute
    if (e.key === "Enter") {
      e.preventDefault();
      execute(input);
      return;
    }

    // Ctrl shortcuts
    if (e.ctrlKey) {
      if (e.key === "l" || e.key === "L") {
        e.preventDefault();
        clearHistory();
        return;
      }
      if (e.key === "c" || e.key === "C") {
        e.preventDefault();
        setEntries((prev) => [
          ...prev,
          {
            id: `${Date.now()}`,
            command: `${input}^C`,
            timestamp: Date.now(),
            path: currentPath,
            output: []
          }
        ]);
        setInput("");
        setHistoryIndex(-1);
        return;
      }
      if (e.key === "a" || e.key === "A") {
        e.preventDefault();
        if (inputRef.current) {
          inputRef.current.setSelectionRange(0, 0);
        }
        return;
      }
      if (e.key === "e" || e.key === "E") {
        e.preventDefault();
        if (inputRef.current) {
          const len = inputRef.current.value.length;
          inputRef.current.setSelectionRange(len, len);
        }
        return;
      }
    }
  };

  // Scroll to bottom on new output
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  return {
    entries,
    input,
    setInput,
    currentPath,
    currentTheme,
    setTheme,
    readingProgress,
    hackermodeActive,
    setHackermodeActive,
    gameActive,
    setGameActive,
    execute,
    handleKeyDown,
    handleTab,
    inputRef,
    scrollRef
  };
}
