import { Command, OutputBlock, CommandContext } from "../types";
import { registry } from "../registry";

export const helpCommand: Command = {
  name: "help",
  aliases: ["h", "man", "?"],
  description: "List available commands or get detailed help for a specific command",
  usage: "help [command]",
  category: "system",
  run: (args: string[], _flags, _ctx: CommandContext): OutputBlock[] => {
    if (args.length > 0) {
      const targetName = args[0].toLowerCase();
      const cmd = registry.get(targetName);
      if (!cmd) {
        return [
          {
            type: "error",
            message: `No manual entry for '${targetName}'. Run 'help' to list all commands.`
          }
        ];
      }

      return [
        {
          type: "text",
          text: `COMMAND: ${cmd.name}\n` +
            (cmd.aliases && cmd.aliases.length > 0 ? `ALIASES: ${cmd.aliases.join(", ")}\n` : "") +
            `USAGE:   ${cmd.usage}\n` +
            `ABOUT:   ${cmd.description}\n`,
          className: "text-[var(--term-accent)] font-semibold"
        }
      ];
    }

    const all = registry.getAll();
    const categories: Record<string, Command[]> = {
      content: [],
      fs: [],
      system: [],
      fun: []
    };

    all.forEach((cmd) => {
      const cat = cmd.category || "system";
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(cmd);
    });

    const rows: (string | string[])[][] = [];
    const catLabels: Record<string, string> = {
      content: "CONTENT & PORTFOLIO",
      fs: "VIRTUAL FILESYSTEM",
      system: "SYSTEM & UTILITIES",
      fun: "EASTER EGGS & GAMES"
    };

    return [
      {
        type: "text",
        text: "AMAN.DEV COMMAND INTERFACE — AVAILABLE COMMANDS",
        className: "text-[var(--term-accent)] font-bold text-sm"
      },
      {
        type: "text",
        text: "Type 'help <command>' for detailed usage (e.g. 'help projects' or 'help blog'). Click any highlighted command to execute it.",
        className: "text-xs text-[var(--term-muted)]"
      },
      ...Object.entries(categories).map(([catKey, cmds]): OutputBlock => {
        return {
          type: "table",
          caption: catLabels[catKey] || catKey.toUpperCase(),
          headers: ["Command", "Aliases", "Description"],
          rows: cmds.map((c) => [
            `'${c.name}'`,
            c.aliases && c.aliases.length > 0 ? c.aliases.join(", ") : "-",
            c.description
          ])
        };
      })
    ];
  },
  autocomplete: (_args, _flags, _ctx) => {
    return registry.getAllNames();
  }
};
