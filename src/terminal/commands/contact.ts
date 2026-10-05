import { Command, OutputBlock, CommandContext } from "../types";
import { profile } from "../../data/profile";

export const contactCommand: Command = {
  name: "contact",
  aliases: ["email", "reach"],
  description: "Display contact methods or copy email with --copy",
  usage: "contact [--copy]",
  category: "content",
  run: async (_args, flags, ctx: CommandContext): Promise<OutputBlock[]> => {
    if (flags.copy || flags.c) {
      if (ctx.copyToClipboard) {
        await ctx.copyToClipboard(profile.email);
      }
      return [
        {
          type: "text",
          text: `[OK] Email copied to clipboard: ${profile.email}`,
          className: "text-[var(--term-accent)] font-bold"
        }
      ];
    }

    return [
      {
        type: "text",
        text: "GET IN TOUCH // AMAN HOSSAIN",
        className: "text-[var(--term-accent)] font-bold"
      },
      {
        type: "links",
        links: [
          {
            label: `Email: ${profile.email}`,
            url: `mailto:${profile.email}`,
            description: "Direct inquiry (Run 'contact --copy' to copy address)"
          },
          {
            label: `LinkedIn: ${profile.linkedin.name}`,
            url: profile.linkedin.url,
            description: "Professional network profile"
          },
          {
            label: `GitHub: @${profile.github.username}`,
            url: profile.github.url,
            description: "Open source repositories & commits"
          }
        ]
      }
    ];
  }
};

export const resumeCommand: Command = {
  name: "resume",
  aliases: ["cv"],
  description: "Open official resume in a new browser tab",
  usage: "resume",
  category: "content",
  run: (_args, _flags, ctx: CommandContext): OutputBlock[] => {
    if (ctx.openLink) {
      ctx.openLink(profile.resumeUrl);
    }

    return [
      {
        type: "text",
        text: "Opening Aman Hossain's resume in a new tab...",
        className: "text-[var(--term-accent)] font-bold"
      },
      {
        type: "links",
        links: [
          {
            label: "Open Resume (Google Docs)",
            url: profile.resumeUrl,
            description: "Curriculum Vitae"
          }
        ]
      }
    ];
  }
};

export const socialCommand: Command = {
  name: "social",
  description: "Display social and developer profile links",
  usage: "social",
  category: "content",
  run: (_args, _flags, _ctx: CommandContext): OutputBlock[] => {
    return [
      {
        type: "text",
        text: "ONLINE PROFILES",
        className: "text-[var(--term-accent)] font-bold"
      },
      {
        type: "links",
        links: [
          {
            label: `GitHub (@${profile.github.username})`,
            url: profile.github.url,
            description: "Repositories, open source contributions"
          },
          {
            label: `LinkedIn (${profile.linkedin.name})`,
            url: profile.linkedin.url,
            description: "Professional profile"
          }
        ]
      }
    ];
  }
};
