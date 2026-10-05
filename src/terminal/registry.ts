import { Command } from "./types";

class CommandRegistry {
  private commands = new Map<string, Command>();
  private aliasMap = new Map<string, string>();

  public register(cmd: Command): void {
    const primaryName = cmd.name.toLowerCase();
    this.commands.set(primaryName, cmd);

    if (cmd.aliases) {
      for (const alias of cmd.aliases) {
        this.aliasMap.set(alias.toLowerCase(), primaryName);
      }
    }
  }

  public get(nameOrAlias: string): Command | undefined {
    const key = nameOrAlias.toLowerCase();
    if (this.commands.has(key)) {
      return this.commands.get(key);
    }
    const resolvedName = this.aliasMap.get(key);
    if (resolvedName && this.commands.has(resolvedName)) {
      return this.commands.get(resolvedName);
    }
    return undefined;
  }

  public getAll(): Command[] {
    return Array.from(this.commands.values());
  }

  public getAllNames(): string[] {
    const names = new Set<string>();
    for (const name of this.commands.keys()) {
      names.add(name);
    }
    for (const alias of this.aliasMap.keys()) {
      names.add(alias);
    }
    return Array.from(names);
  }
}

export const registry = new CommandRegistry();
