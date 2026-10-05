import { Command, OutputBlock, CommandContext } from "../types";
import { profile } from "../../data/profile";

export const researchCommand: Command = {
  name: "research",
  aliases: ["paper", "agenttrace"],
  description: "Display research publications & AgentTrace paper details",
  usage: "research",
  category: "content",
  run: (_args, _flags, _ctx: CommandContext): OutputBlock[] => {
    const res = profile.research;
    return [
      {
        type: "text",
        text: `RESEARCH PUBLICATION // ${res.collaboration.toUpperCase()}`,
        className: "text-[var(--term-accent)] font-bold text-sm"
      },
      {
        type: "text",
        text: res.title,
        className: "text-sm text-[var(--term-secondary)] font-bold my-1"
      },
      {
        type: "text",
        text: `Authors: ${res.coAuthors.join(", ")}`,
        className: "text-xs text-[var(--term-muted)]"
      },
      {
        type: "text",
        text: `Affiliation: ${res.institution} (${res.collaboration})`,
        className: "text-xs text-[var(--term-muted)] mb-2"
      },
      {
        type: "text",
        text: `SUMMARY:\n${res.summary}`,
        className: "text-xs text-[var(--term-fg)] leading-relaxed"
      },
      {
        type: "text",
        text: `\nBENCHMARK HIGHLIGHTS:\n* ${res.keyResults}`,
        className: "text-xs text-[var(--term-accent)] font-semibold"
      },
      {
        type: "text",
        text: `\nRead the full technical breakdown inline by typing: 'read ${res.blogId}'`,
        className: "text-xs text-[var(--term-secondary)] font-bold"
      }
    ];
  }
};
