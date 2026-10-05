import { Command, OutputBlock, CommandContext } from "../types";
import { profile } from "../../data/profile";

export const aboutCommand: Command = {
  name: "about",
  aliases: ["bio", "info"],
  description: "Display background, education, and technical focus",
  usage: "about",
  category: "content",
  run: (_args, _flags, _ctx: CommandContext): OutputBlock[] => {
    return [
      {
        type: "text",
        text: `ABOUT ${profile.name.toUpperCase()} // ${profile.title}`,
        className: "text-[var(--term-accent)] font-bold"
      },
      {
        type: "text",
        text: profile.bio
      },
      {
        type: "text",
        text: "CORE FOCUS AREAS:\n" +
          profile.focus.map((f) => `  * ${f}`).join("\n"),
        className: "text-xs text-[var(--term-secondary)] my-1"
      },
      {
        type: "text",
        text: "ACADEMICS:\n" +
          profile.education
            .map(
              (e) =>
                `  * ${e.degree} — ${e.institution} (CGPA: ${e.cgpa}, ${e.period})`
            )
            .join("\n"),
        className: "text-xs text-[var(--term-fg)]"
      },
      {
        type: "text",
        text: "\nExplore next: Try 'projects' to view flagship work, 'skills' for technical proficiencies, or 'research' for the AgentTrace paper.",
        className: "text-xs text-[var(--term-muted)] italic"
      }
    ];
  }
};

export const whoamiCommand: Command = {
  name: "whoami",
  description: "Display identity and current session privileges",
  usage: "whoami",
  category: "system",
  run: (_args, _flags, _ctx: CommandContext): OutputBlock[] => {
    return [
      {
        type: "text",
        text: `guest@aman-portfolio: ${profile.name} — ${profile.role} (Read-Only Guest Session)`,
        className: "text-[var(--term-accent)]"
      }
    ];
  }
};
