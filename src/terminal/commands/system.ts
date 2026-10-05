import { Command, OutputBlock, CommandContext } from "../types";
import { themes } from "../themes";
import { profile } from "../../data/profile";

const PAGE_LOAD_TIME = Date.now();

export const themeCommand: Command = {
  name: "theme",
  aliases: ["colors", "color"],
  description: "List themes or switch the active color palette",
  usage: "theme [matrix|dracula|ubuntu|solarized-dark|light]",
  category: "system",
  run: (args: string[], _flags, ctx: CommandContext): OutputBlock[] => {
    const availableThemes = Object.keys(themes);

    if (args.length > 0) {
      const target = args[0].toLowerCase();
      if (!themes[target]) {
        return [
          {
            type: "error",
            message: `Theme '${args[0]}' not recognized. Available themes: ${availableThemes.join(", ")}`
          }
        ];
      }

      ctx.setTheme(target);
      return [
        {
          type: "text",
          text: `[OK] Theme switched to '${target}'. Preference saved to localStorage.`,
          className: "text-[var(--term-accent)] font-bold"
        }
      ];
    }

    return [
      {
        type: "text",
        text: "AVAILABLE THEMES (5)",
        className: "text-[var(--term-accent)] font-bold"
      },
      {
        type: "table",
        headers: ["Theme ID", "Name", "Active"],
        rows: availableThemes.map((id) => [
          `'theme ${id}'`,
          themes[id].name,
          id === ctx.currentTheme ? "● (current)" : ""
        ])
      },
      {
        type: "text",
        text: "Tip: Run 'theme <id>' or click a theme ID above to apply it instantly.",
        className: "text-xs text-[var(--term-muted)] mt-1"
      }
    ];
  },
  autocomplete: () => Object.keys(themes)
};

export const neofetchCommand: Command = {
  name: "neofetch",
  aliases: ["fetch", "sysinfo"],
  description: "Display system summary and developer specifications",
  usage: "neofetch",
  category: "system",
  run: (_args, _flags, ctx: CommandContext): OutputBlock[] => {
    const uptimeSec = Math.floor((Date.now() - PAGE_LOAD_TIME) / 1000);
    const mins = Math.floor(uptimeSec / 60);
    const secs = uptimeSec % 60;
    const uptimeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;

    const info = [
      { label: "OS", val: "AmanOS / Portfolio CLI v2.4 (x86_64)" },
      { label: "Host", val: "KIIT University x LTIMindtree" },
      { label: "Kernel", val: "React 18.3 + Vite 5.4 + TypeScript 5.8" },
      { label: "Uptime", val: uptimeStr },
      { label: "Shell", val: "portfolio-sh v1.0" },
      { label: "Theme", val: themes[ctx.currentTheme]?.name || ctx.currentTheme },
      { label: "Terminal", val: "HTML5 Canvas & Typed DOM" },
      { label: "Developer", val: profile.name },
      { label: "Role", val: profile.title },
      { label: "Education", val: "M.Tech Data Science (7.76) & B.Tech CSE (7.91)" },
      { label: "Flagship", val: "AgentTrace (Hallucination Detection +24.4% SOTA)" }
    ];

    const asciiLogo = `
   /\\_/\\  
  ( o.o ) 
   > ^ <  
  AMAN.DEV
`;

    const infoFormatted = info
      .map((item) => `  \x1b[32m${item.label.padEnd(12, " ")}\x1b[0m : ${item.val}`)
      .join("\n");

    const colorBlocks = "███ ███ ███ ███ ███ ███ ███ ███";

    return [
      {
        type: "ascii",
        art: asciiLogo,
        color: "var(--term-accent)"
      },
      {
        type: "text",
        text: info.map((item) => `${item.label.padEnd(14, " ")}: ${item.val}`).join("\n"),
        className: "text-xs font-mono text-[var(--term-fg)] leading-relaxed"
      },
      {
        type: "text",
        text: colorBlocks,
        className: "text-xs text-[var(--term-accent)] tracking-widest my-1"
      }
    ];
  }
};

export const historyCommand: Command = {
  name: "history",
  description: "Show command history for current session",
  usage: "history",
  category: "system",
  run: (_args, _flags, ctx: CommandContext): OutputBlock[] => {
    if (ctx.history.length === 0) {
      return [{ type: "text", text: "No commands in session history.", className: "text-xs text-[var(--term-muted)]" }];
    }

    const lines = ctx.history.map((cmd, idx) => `  ${String(idx + 1).padStart(3, " ")}  ${cmd}`);
    return [
      {
        type: "text",
        text: "COMMAND HISTORY (Use ↑ / ↓ arrow keys to cycle):",
        className: "text-[var(--term-accent)] font-bold text-xs"
      },
      {
        type: "text",
        text: lines.join("\n"),
        className: "text-xs font-mono text-[var(--term-fg)]"
      }
    ];
  }
};

export const echoCommand: Command = {
  name: "echo",
  description: "Print arguments to standard output",
  usage: "echo <text>",
  category: "system",
  run: (args: string[]): OutputBlock[] => {
    return [{ type: "text", text: args.join(" ") }];
  }
};

export const dateCommand: Command = {
  name: "date",
  description: "Print current date and time",
  usage: "date",
  category: "system",
  run: (): OutputBlock[] => {
    return [
      {
        type: "text",
        text: new Date().toString(),
        className: "text-[var(--term-secondary)] font-mono text-xs"
      }
    ];
  }
};

export const sudoCommand: Command = {
  name: "sudo",
  description: "Execute a command with superuser privileges",
  usage: "sudo <command>",
  category: "fun",
  run: (): OutputBlock[] => {
    return [
      {
        type: "text",
        text: "guest is not in the sudoers file. This incident will be reported.",
        className: "text-[var(--term-error)] font-bold"
      }
    ];
  }
};

export const exitCommand: Command = {
  name: "exit",
  aliases: ["quit", "q"],
  description: "Exit the terminal session",
  usage: "exit",
  category: "fun",
  run: (): OutputBlock[] => {
    return [
      {
        type: "text",
        text: "There is no escape. Try 'contact' instead :)",
        className: "text-[var(--term-accent)] italic"
      }
    ];
  }
};

export const hackermodeCommand: Command = {
  name: "hackermode",
  aliases: ["matrix", "rain"],
  description: "Activate Matrix digital rain canvas overlay (5s)",
  usage: "hackermode",
  category: "fun",
  run: (_args, _flags, ctx: CommandContext): OutputBlock[] => {
    if (ctx.setHackermode) {
      ctx.setHackermode(true);
    }
    return [
      {
        type: "text",
        text: "Initializing Matrix digital rain overlay... (click anywhere to dismiss)",
        className: "text-[var(--term-accent)] font-bold"
      }
    ];
  }
};

export const gamesCommand: Command = {
  name: "games",
  aliases: ["snake", "game", "play"],
  description: "Play retro terminal Snake game (press Q to exit)",
  usage: "games",
  category: "fun",
  run: (_args, _flags, ctx: CommandContext): OutputBlock[] => {
    if (ctx.setGameActive) {
      ctx.setGameActive(true);
    }
    return [
      {
        type: "text",
        text: "Launching Terminal Snake... Controls: Arrow keys / WASD. Press 'Q' or Esc to quit.",
        className: "text-[var(--term-secondary)] font-bold"
      }
    ];
  }
};
