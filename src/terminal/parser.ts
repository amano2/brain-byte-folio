import { ParsedInput } from "./types";

/**
 * Tokenizes a shell-like command string respecting single and double quotes.
 */
export function tokenize(input: string): string[] {
  const tokens: string[] = [];
  let current = "";
  let inSingleQuote = false;
  let inDoubleQuote = false;
  let escaped = false;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (escaped) {
      current += char;
      escaped = false;
      continue;
    }

    if (char === "\\") {
      escaped = true;
      continue;
    }

    if (char === "'" && !inDoubleQuote) {
      inSingleQuote = !inSingleQuote;
      continue;
    }

    if (char === '"' && !inSingleQuote) {
      inDoubleQuote = !inDoubleQuote;
      continue;
    }

    if (char === " " && !inSingleQuote && !inDoubleQuote) {
      if (current.length > 0) {
        tokens.push(current);
        current = "";
      }
      continue;
    }

    current += char;
  }

  if (current.length > 0) {
    tokens.push(current);
  }

  return tokens;
}

/**
 * Parses raw input string into command, positional arguments, and flags.
 * Supports:
 *   --flag
 *   --flag=value
 *   --flag value
 *   -f
 *   -f=value
 *   -f value
 */
export function parseInput(rawInput: string): ParsedInput {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return { raw: rawInput, cmd: "", args: [], flags: {} };
  }

  const tokens = tokenize(trimmed);
  if (tokens.length === 0) {
    return { raw: rawInput, cmd: "", args: [], flags: {} };
  }

  const cmd = tokens[0].toLowerCase();
  const rawArgs = tokens.slice(1);
  const args: string[] = [];
  const flags: Record<string, string | boolean> = {};

  for (let i = 0; i < rawArgs.length; i++) {
    const token = rawArgs[i];

    if (token.startsWith("--")) {
      const withoutPrefix = token.slice(2);
      if (withoutPrefix.includes("=")) {
        const [key, ...rest] = withoutPrefix.split("=");
        flags[key.toLowerCase()] = rest.join("=");
      } else {
        // Look ahead for value
        const nextToken = rawArgs[i + 1];
        if (nextToken && !nextToken.startsWith("-")) {
          flags[withoutPrefix.toLowerCase()] = nextToken;
          i++; // consume next token
        } else {
          flags[withoutPrefix.toLowerCase()] = true;
        }
      }
    } else if (token.startsWith("-") && token.length > 1) {
      const withoutPrefix = token.slice(1);
      if (withoutPrefix.includes("=")) {
        const [key, ...rest] = withoutPrefix.split("=");
        flags[key.toLowerCase()] = rest.join("=");
      } else {
        const nextToken = rawArgs[i + 1];
        if (nextToken && !nextToken.startsWith("-") && withoutPrefix.length === 1) {
          flags[withoutPrefix.toLowerCase()] = nextToken;
          i++;
        } else {
          flags[withoutPrefix.toLowerCase()] = true;
        }
      }
    } else {
      args.push(token);
    }
  }

  return {
    raw: rawInput,
    cmd,
    args,
    flags
  };
}

/**
 * Resolves history expansion syntax:
 *   `!!` -> repeats the last command
 *   `!n` -> runs the n-th history command (1-indexed)
 */
export function resolveHistoryExpansion(input: string, history: string[]): string {
  const trimmed = input.trim();
  if (trimmed === "!!") {
    if (history.length === 0) return "";
    return history[history.length - 1];
  }

  if (/^!\d+$/.test(trimmed)) {
    const num = parseInt(trimmed.slice(1), 10);
    if (num > 0 && num <= history.length) {
      return history[num - 1];
    }
  }

  return input;
}
