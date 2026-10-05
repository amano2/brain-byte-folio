import { Command, OutputBlock, CommandContext } from "../types";
import {
  normalizePath,
  formatPath,
  getNode,
  getChildNames,
  vfsRoot,
  FSDirectory,
  FSNode
} from "../filesystem";

export const lsCommand: Command = {
  name: "ls",
  aliases: ["dir"],
  description: "List contents of the current or specified virtual directory",
  usage: "ls [path]",
  category: "fs",
  run: (args: string[], _flags, ctx: CommandContext): OutputBlock[] => {
    const target = args[0] || "";
    const segments = normalizePath(target, ctx.currentPath);
    const node = getNode(segments);

    if (!node) {
      return [
        {
          type: "error",
          message: `ls: cannot access '${target}': No such file or directory`
        }
      ];
    }

    if (node.type === "file") {
      return [{ type: "text", text: node.name }];
    }

    const items = Object.values(node.children);
    if (items.length === 0) {
      return [{ type: "text", text: "(empty directory)", className: "text-xs text-[var(--term-muted)] italic" }];
    }

    return [
      {
        type: "text",
        text: items
          .map((item) => {
            if (item.type === "directory") {
              return `📁 ${item.name}/`;
            }
            return `📄 ${item.name}`;
          })
          .join("    "),
        className: "text-sm text-[var(--term-accent)] font-semibold"
      }
    ];
  },
  autocomplete: (args, _flags, ctx) => {
    const target = args[0] || "";
    const segments = normalizePath(target, ctx.currentPath);
    return getChildNames(segments);
  }
};

export const cdCommand: Command = {
  name: "cd",
  description: "Change current working directory in the virtual filesystem",
  usage: "cd [path]",
  category: "fs",
  run: (args: string[], _flags, ctx: CommandContext): OutputBlock[] => {
    const target = args[0] || "~";
    const segments = normalizePath(target, ctx.currentPath);
    const node = getNode(segments);

    if (!node) {
      return [
        {
          type: "error",
          message: `cd: no such file or directory: ${target}`
        }
      ];
    }

    if (node.type !== "directory") {
      return [
        {
          type: "error",
          message: `cd: not a directory: ${target}`
        }
      ];
    }

    const newPath = formatPath(segments);
    ctx.setCurrentPath(newPath);
    return [];
  },
  autocomplete: (args, _flags, ctx) => {
    const target = args[0] || "";
    const segments = normalizePath(target, ctx.currentPath);
    return getChildNames(segments).filter((name) => name.endsWith("/"));
  }
};

export const catCommand: Command = {
  name: "cat",
  description: "Display contents of a file in the virtual filesystem",
  usage: "cat <path>",
  category: "fs",
  run: (args: string[], _flags, ctx: CommandContext): OutputBlock[] => {
    if (args.length === 0) {
      return [
        {
          type: "error",
          message: "cat: missing file operand. Try 'cat about.txt' or 'cat projects/plant-web.md'."
        }
      ];
    }

    const target = args[0];
    const segments = normalizePath(target, ctx.currentPath);
    const node = getNode(segments);

    if (!node) {
      return [
        {
          type: "error",
          message: `cat: ${target}: No such file or directory`
        }
      ];
    }

    if (node.type === "directory") {
      return [
        {
          type: "error",
          message: `cat: ${target}: Is a directory`
        }
      ];
    }

    if (node.name.endsWith(".md")) {
      return [{ type: "markdown", content: node.content }];
    }

    return [{ type: "text", text: node.content, className: "whitespace-pre-wrap text-xs text-[var(--term-fg)]" }];
  },
  autocomplete: (args, _flags, ctx) => {
    const target = args[0] || "";
    const segments = normalizePath(target, ctx.currentPath);
    return getChildNames(segments);
  }
};

export const pwdCommand: Command = {
  name: "pwd",
  description: "Print the current virtual working directory",
  usage: "pwd",
  category: "fs",
  run: (_args, _flags, ctx: CommandContext): OutputBlock[] => {
    return [
      {
        type: "text",
        text: ctx.currentPath.replace("~", "/home/guest"),
        className: "text-[var(--term-accent)] font-semibold"
      }
    ];
  }
};

function renderTree(dir: FSDirectory, prefix = ""): string[] {
  const lines: string[] = [];
  const entries = Object.values(dir.children);

  entries.forEach((item, index) => {
    const isLast = index === entries.length - 1;
    const pointer = isLast ? "└── " : "├── ";
    const childPrefix = prefix + (isLast ? "    " : "│   ");

    if (item.type === "directory") {
      lines.push(`${prefix}${pointer}📁 ${item.name}/`);
      lines.push(...renderTree(item, childPrefix));
    } else {
      lines.push(`${prefix}${pointer}📄 ${item.name}`);
    }
  });

  return lines;
}

export const treeCommand: Command = {
  name: "tree",
  description: "Display visual directory tree structure",
  usage: "tree [path]",
  category: "fs",
  run: (args: string[], _flags, ctx: CommandContext): OutputBlock[] => {
    const target = args[0] || "";
    const segments = normalizePath(target, ctx.currentPath);
    const node = getNode(segments);

    if (!node || node.type !== "directory") {
      return [
        {
          type: "error",
          message: `tree: '${target}': No such directory`
        }
      ];
    }

    const lines = [`📁 ${formatPath(segments)}`, ...renderTree(node)];
    return [
      {
        type: "text",
        text: lines.join("\n"),
        className: "font-mono text-xs text-[var(--term-fg)] whitespace-pre"
      }
    ];
  }
};
