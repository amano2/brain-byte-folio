import { Command, OutputBlock, CommandContext } from "../types";
import { profile } from "../../data/profile";

export const educationCommand: Command = {
  name: "education",
  aliases: ["edu", "degrees", "college"],
  description: "Display academic degrees and CGPA performance",
  usage: "education",
  category: "content",
  run: (_args, _flags, _ctx: CommandContext): OutputBlock[] => {
    return [
      {
        type: "text",
        text: "ACADEMIC QUALIFICATIONS // KIIT UNIVERSITY",
        className: "text-[var(--term-accent)] font-bold"
      },
      {
        type: "table",
        headers: ["Degree", "Institution / Collaboration", "Period", "CGPA"],
        rows: profile.education.map((e) => [
          e.degree,
          e.institution,
          e.period,
          `CGPA: ${e.cgpa}`
        ])
      },
      ...profile.education
        .filter((e) => e.notes)
        .map((e): OutputBlock => ({
          type: "text",
          text: `[${e.degree}] ${e.notes}`,
          className: "text-xs text-[var(--term-muted)] pl-2"
        }))
    ];
  }
};

export const certsCommand: Command = {
  name: "certs",
  aliases: ["certifications", "certificates"],
  description: "Display verified professional certifications",
  usage: "certs",
  category: "content",
  run: (_args, _flags, _ctx: CommandContext): OutputBlock[] => {
    return [
      {
        type: "text",
        text: "VERIFIED CERTIFICATIONS",
        className: "text-[var(--term-accent)] font-bold"
      },
      {
        type: "table",
        headers: ["Certification", "Issuing Organization", "Year"],
        rows: profile.certifications.map((c) => [
          c.name,
          c.issuer,
          c.period || "2024"
        ])
      }
    ];
  }
};
