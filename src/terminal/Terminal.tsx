import React, { useEffect } from "react";
import { useTerminal } from "./useTerminal";
import Banner from "./render/Banner";
import Output from "./render/Output";
import { themes } from "./themes";
import MatrixRain from "./easter/MatrixRain";
import SnakeGame from "./easter/SnakeGame";
import { Palette, Layout, CornerDownLeft } from "lucide-react";
import "./commands";

interface TerminalProps {
  onToggleSimpleView?: () => void;
  initialCommand?: string;
}

export default function Terminal({ onToggleSimpleView, initialCommand }: TerminalProps) {
  const {
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
  } = useTerminal();

  // Execute initial command if provided (e.g. from deep link "/blog/:id")
  useEffect(() => {
    if (initialCommand) {
      execute(initialCommand);
    }
  }, [initialCommand, execute]);

  // Click-to-focus terminal input
  const handleWindowClick = (e: React.MouseEvent) => {
    // Only focus if not clicking interactive elements or text selection
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) return;

    const target = e.target as HTMLElement;
    if (
      target.tagName === "BUTTON" ||
      target.tagName === "A" ||
      target.tagName === "INPUT" ||
      target.tagName === "SELECT"
    ) {
      return;
    }
    inputRef.current?.focus();
  };

  const cycleTheme = () => {
    const themeKeys = Object.keys(themes);
    const currentIndex = themeKeys.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    setTheme(themeKeys[nextIndex]);
  };

  return (
    <div
      onClick={handleWindowClick}
      className="min-h-screen w-full flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 bg-[var(--term-bg)] text-[var(--term-fg)] font-mono transition-colors duration-200"
    >
      {/* Matrix Rain Easter Egg */}
      {hackermodeActive && (
        <MatrixRain onClose={() => setHackermodeActive(false)} />
      )}

      {/* Retro Snake Game */}
      {gameActive && <SnakeGame onClose={() => setGameActive(false)} />}

      {/* Main Terminal Window Frame */}
      <div className="w-full max-w-5xl flex-1 flex flex-col rounded-xl border border-[var(--term-border)] bg-[var(--term-bg)] shadow-2xl overflow-hidden relative min-h-[85vh] max-h-[92vh]">
        {/* Reading Progress Indicator */}
        {readingProgress !== null && (
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-black/40 z-30">
            <div
              className="h-full bg-[var(--term-accent)] transition-all duration-150"
              style={{ width: `${Math.min(100, Math.max(0, readingProgress))}%` }}
            />
          </div>
        )}

        {/* Window Chrome Header Bar */}
        <header className="px-4 py-3 bg-[var(--term-header-bg)] border-b border-[var(--term-border)] flex items-center justify-between select-none">
          {/* macOS 3 dots */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm" />
          </div>

          {/* Window Title */}
          <div className="text-xs font-mono font-semibold text-[var(--term-muted)] truncate max-w-[200px] sm:max-w-md">
            aman@portfolio: {currentPath}
          </div>

          {/* Action buttons (Theme cycle, Simple view toggle) */}
          <div className="flex items-center gap-2 text-xs">
            {/* Theme switcher */}
            <button
              type="button"
              onClick={cycleTheme}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-[var(--term-border)] text-[var(--term-muted)] hover:text-[var(--term-fg)] hover:border-[var(--term-accent)] transition-all cursor-pointer"
              title={`Current Theme: ${themes[currentTheme]?.name || currentTheme}. Click to cycle.`}
            >
              <Palette className="w-3.5 h-3.5 text-[var(--term-accent)]" />
              <span className="hidden sm:inline capitalize">{currentTheme}</span>
            </button>

            {/* Simple View Toggle */}
            {onToggleSimpleView && (
              <button
                type="button"
                onClick={onToggleSimpleView}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-[var(--term-border)] text-[var(--term-muted)] hover:text-[var(--term-fg)] hover:border-[var(--term-secondary)] transition-all cursor-pointer"
                title="Switch to Simple Non-Terminal View"
              >
                <Layout className="w-3.5 h-3.5 text-[var(--term-secondary)]" />
                <span className="hidden sm:inline">Simple View</span>
              </button>
            )}
          </div>
        </header>

        {/* Scrollable Output Region */}
        <div
          ref={scrollRef}
          role="log"
          aria-live="polite"
          className="flex-1 p-3 sm:p-5 overflow-y-auto space-y-4 font-mono text-sm leading-relaxed"
        >
          {/* Welcome Banner */}
          <Banner onCommandClick={(cmd) => execute(cmd)} />

          {/* History entries */}
          {entries.map((entry) => (
            <div key={entry.id} className="space-y-1.5">
              {/* Previous prompt line */}
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <span className="text-[var(--term-prompt)] font-bold">
                  guest@aman-portfolio
                </span>
                <span className="text-[var(--term-muted)]">:</span>
                <span className="text-[var(--term-path)] font-semibold">
                  {entry.path}
                </span>
                <span className="text-[var(--term-muted)]">$</span>
                <span className="text-[var(--term-fg)] font-semibold break-all">
                  {entry.command}
                </span>
              </div>

              {/* Command Output */}
              <Output
                blocks={entry.output}
                onCommandClick={(cmd) => execute(cmd)}
              />
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[var(--term-prompt)] font-bold text-xs sm:text-sm whitespace-nowrap">
              guest@aman-portfolio
            </span>
            <span className="text-[var(--term-muted)]">:</span>
            <span className="text-[var(--term-path)] font-semibold text-xs sm:text-sm whitespace-nowrap">
              {currentPath}
            </span>
            <span className="text-[var(--term-muted)]">$</span>
            <div className="relative flex-1 flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                aria-label="Terminal command input"
                className="w-full bg-transparent text-[var(--term-fg)] font-mono text-base sm:text-sm outline-none border-none p-0 focus:ring-0"
                style={{ caretColor: "var(--term-cursor)" }}
              />
            </div>
          </div>
        </div>

        {/* Mobile Quick Command Bar */}
        <footer className="p-2 bg-[var(--term-header-bg)] border-t border-[var(--term-border)] flex items-center gap-2 overflow-x-auto select-none">
          <span className="text-[10px] text-[var(--term-muted)] uppercase tracking-wider pl-1 hidden sm:inline">
            Shortcuts:
          </span>

          <div className="flex items-center gap-1.5 flex-nowrap">
            {[
              "help",
              "about",
              "skills",
              "projects",
              "education",
              "certs",
              "blog",
              "contact",
              "clear"
            ].map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => execute(cmd)}
                className="px-2.5 py-1 text-xs rounded border border-[var(--term-border)] bg-[var(--term-bg)] text-[var(--term-accent)] hover:bg-[var(--term-code-bg)] whitespace-nowrap transition-colors cursor-pointer"
              >
                {cmd}
              </button>
            ))}

            {/* Virtual Tab completion key */}
            <button
              type="button"
              onClick={handleTab}
              className="px-3 py-1 text-xs font-bold rounded border border-[var(--term-border)] bg-[var(--term-bg)] text-[var(--term-secondary)] hover:bg-[var(--term-code-bg)] whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1"
              title="Virtual Tab Autocomplete"
            >
              <span>&#8677; Tab</span>
            </button>

            {/* Run / Enter key */}
            <button
              type="button"
              onClick={() => execute(input)}
              className="px-3 py-1 text-xs font-bold rounded border border-[var(--term-border)] bg-[var(--term-accent)] text-black hover:opacity-90 whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1"
              title="Execute Command"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
              <span>Run</span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
