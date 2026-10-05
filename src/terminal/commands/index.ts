import { registry } from "../registry";
import { helpCommand } from "./help";
import { aboutCommand, whoamiCommand } from "./about";
import { educationCommand, certsCommand } from "./education";
import { skillsCommand } from "./skills";
import { projectsCommand, openCommand } from "./projects";
import { researchCommand } from "./research";
import { contactCommand, resumeCommand, socialCommand } from "./contact";
import { blogCommand, readCommand } from "./blog";
import { lsCommand, cdCommand, catCommand, pwdCommand, treeCommand } from "./fs";
import {
  themeCommand,
  neofetchCommand,
  historyCommand,
  echoCommand,
  dateCommand,
  sudoCommand,
  exitCommand,
  hackermodeCommand,
  gamesCommand
} from "./system";

export function registerAllCommands(): void {
  // Content & Identity
  registry.register(helpCommand);
  registry.register(aboutCommand);
  registry.register(whoamiCommand);
  registry.register(educationCommand);
  registry.register(certsCommand);
  registry.register(skillsCommand);
  registry.register(projectsCommand);
  registry.register(openCommand);
  registry.register(researchCommand);
  registry.register(contactCommand);
  registry.register(resumeCommand);
  registry.register(socialCommand);

  // Blog & Reading
  registry.register(blogCommand);
  registry.register(readCommand);

  // Virtual Filesystem
  registry.register(lsCommand);
  registry.register(cdCommand);
  registry.register(catCommand);
  registry.register(pwdCommand);
  registry.register(treeCommand);

  // System & Fun
  registry.register(themeCommand);
  registry.register(neofetchCommand);
  registry.register(historyCommand);
  registry.register(echoCommand);
  registry.register(dateCommand);
  registry.register(sudoCommand);
  registry.register(exitCommand);
  registry.register(hackermodeCommand);
  registry.register(gamesCommand);
}

// Auto-register on import
registerAllCommands();
