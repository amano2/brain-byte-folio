import { Command, OutputBlock, CommandContext } from "../types";
import { skillGroups } from "../../data/skills";

export const skillsCommand: Command = {
  name: "skills",
  aliases: ["techstack", "stack"],
  description: "Display technical skills across 6 specialized categories",
  usage: "skills [category]",
  category: "content",
  run: (args: string[], _flags, _ctx: CommandContext): OutputBlock[] => {
    if (args.length > 0) {
      const query = args[0].toLowerCase();
      const group = skillGroups.find(
        (g) =>
          g.id.toLowerCase() === query ||
          g.category.toLowerCase().includes(query)
      );

      if (!group) {
        const available = skillGroups.map((g) => `'skills ${g.id}'`).join(", ");
        return [
          {
            type: "error",
            message: `Unknown skill category '${args[0]}'. Available categories: ${available}`
          }
        ];
      }

      return [
        {
          type: "text",
          text: `SKILL CATEGORY: ${group.category.toUpperCase()}`,
          className: "text-[var(--term-accent)] font-bold"
        },
        {
          type: "text",
          text: group.description,
          className: "text-xs text-[var(--term-muted)] mb-2"
        },
        {
          type: "text",
          text: group.skills.map((s) => `[ ${s} ]`).join("  "),
          className: "text-sm text-[var(--term-secondary)] font-semibold"
        }
      ];
    }

    // List all 6 categories
    const output: OutputBlock[] = [
      {
        type: "text",
        text: "TECHNICAL SKILLS MATRIX // 6 SPECIALIZED DOMAINS",
        className: "text-[var(--term-accent)] font-bold"
      },
      {
        type: "text",
        text: "Tip: Filter by category with 'skills <category>' (e.g. 'skills frameworks', 'skills industry').",
        className: "text-xs text-[var(--term-muted)] mb-1"
      }
    ];

    skillGroups.forEach((group) => {
      output.push({
        type: "text",
        text: `\n// ${group.category.toUpperCase()} (${group.skills.length})`,
        className: "text-xs text-[var(--term-accent)] font-bold tracking-wider"
      });
      output.push({
        type: "text",
        text: group.skills.map((s) => `[ ${s} ]`).join("  "),
        className: "text-xs text-[var(--term-fg)]"
      });
    });

    return output;
  },
  autocomplete: (_args, _flags, _ctx) => {
    return skillGroups.map((g) => g.id);
  }
};
