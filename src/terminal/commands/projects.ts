import { Command, OutputBlock, CommandContext } from "../types";
import { projects, Project } from "../../data/projects";

function renderProjectDetail(proj: Project): OutputBlock[] {
  return [
    {
      type: "text",
      text: `PROJECT #${proj.num}: ${proj.title.toUpperCase()}`,
      className: "text-[var(--term-accent)] font-bold text-base"
    },
    {
      type: "text",
      text: `Subtitle: ${proj.subtitle}`,
      className: "text-xs text-[var(--term-secondary)] mb-1"
    },
    {
      type: "text",
      text: proj.description,
      className: "text-xs text-[var(--term-fg)] leading-relaxed"
    },
    {
      type: "text",
      text: "\nKEY HIGHLIGHTS:\n" + proj.highlights.map((h) => `  * ${h}`).join("\n"),
      className: "text-xs text-[var(--term-muted)]"
    },
    {
      type: "text",
      text: "\nTECH STACK:\n  " + proj.tags.map((t) => `[${t}]`).join(" "),
      className: "text-xs text-[var(--term-accent)] font-semibold"
    },
    {
      type: "links",
      links: [
        {
          label: "GitHub Repository",
          url: proj.githubUrl,
          description: `Source code & documentation for ${proj.title}`
        }
      ]
    },
    {
      type: "text",
      text: `Command shortcut: run 'open ${proj.num}' to launch this repository directly.`,
      className: "text-xs text-[var(--term-muted)] italic"
    }
  ];
}

export const projectsCommand: Command = {
  name: "projects",
  aliases: ["proj", "work", "portfolio"],
  description: "List flagship projects or inspect project details",
  usage: "projects [1|2|3|name]",
  category: "content",
  run: (args: string[], _flags, _ctx: CommandContext): OutputBlock[] => {
    if (args.length > 0) {
      const query = args[0].toLowerCase();
      const proj = projects.find(
        (p) =>
          String(p.num) === query ||
          p.id.toLowerCase() === query ||
          p.title.toLowerCase().includes(query)
      );

      if (!proj) {
        return [
          {
            type: "error",
            message: `Project '${args[0]}' not found. Available numbers: 1, 2, 3.`
          }
        ];
      }

      return renderProjectDetail(proj);
    }

    // List all projects
    const blocks: OutputBlock[] = [
      {
        type: "text",
        text: "FLAGSHIP ENGINEERING PROJECTS (3)",
        className: "text-[var(--term-accent)] font-bold"
      },
      {
        type: "text",
        text: "Type 'projects <n>' or 'open <n>' to inspect details and source code.",
        className: "text-xs text-[var(--term-muted)] mb-2"
      }
    ];

    projects.forEach((p) => {
      blocks.push({
        type: "text",
        text: `[${p.num}] ${p.title}`,
        className: "text-sm text-[var(--term-secondary)] font-bold mt-2"
      });
      blocks.push({
        type: "text",
        text: `    ${p.subtitle}`,
        className: "text-xs text-[var(--term-muted)]"
      });
      blocks.push({
        type: "text",
        text: `    Stack: ${p.tags.join(" · ")}`,
        className: "text-xs text-[var(--term-fg)]"
      });
      blocks.push({
        type: "text",
        text: `    Actions: 'projects ${p.num}' (inspect) | 'open ${p.num}' (github)`,
        className: "text-[11px] text-[var(--term-accent)] mb-1"
      });
    });

    return blocks;
  },
  autocomplete: (_args, _flags, _ctx) => {
    return [
      "1",
      "2",
      "3",
      "plant-web",
      "agentic-copilot-trust-layer",
      "genai-forecasting-assistant"
    ];
  }
};

export const openCommand: Command = {
  name: "open",
  description: "Open project GitHub repository in a new browser tab",
  usage: "open <1|2|3|project-id>",
  category: "content",
  run: (args: string[], _flags, ctx: CommandContext): OutputBlock[] => {
    if (args.length === 0) {
      return [
        {
          type: "error",
          message: "Please specify a project number to open. E.g.: 'open 1', 'open 2', 'open 3'."
        }
      ];
    }

    const query = args[0].toLowerCase();
    const proj = projects.find(
      (p) =>
        String(p.num) === query ||
        p.id.toLowerCase() === query ||
        p.title.toLowerCase().includes(query)
    );

    if (!proj) {
      return [
        {
          type: "error",
          message: `Project '${args[0]}' not found. Available numbers: 1, 2, 3.`
        }
      ];
    }

    if (ctx.openLink) {
      ctx.openLink(proj.githubUrl);
    }

    return [
      {
        type: "text",
        text: `Opening repository for '${proj.title}' in a new tab...`,
        className: "text-[var(--term-accent)] font-bold"
      },
      {
        type: "links",
        links: [
          {
            label: proj.githubUrl,
            url: proj.githubUrl,
            description: proj.subtitle
          }
        ]
      }
    ];
  },
  autocomplete: (_args, _flags, _ctx) => {
    return ["1", "2", "3"];
  }
};
