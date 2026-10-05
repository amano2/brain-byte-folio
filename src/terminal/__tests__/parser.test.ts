import { describe, it, expect } from "vitest";
import { tokenize, parseInput, resolveHistoryExpansion } from "../parser";

describe("Terminal Parser", () => {
  describe("tokenize", () => {
    it("splits single commands", () => {
      expect(tokenize("help")).toEqual(["help"]);
    });

    it("splits command with arguments", () => {
      expect(tokenize("projects 1")).toEqual(["projects", "1"]);
    });

    it("preserves double-quoted strings", () => {
      expect(tokenize('echo "hello world"')).toEqual(["echo", "hello world"]);
    });

    it("preserves single-quoted strings", () => {
      expect(tokenize("echo 'multi-agent system'")).toEqual(["echo", "multi-agent system"]);
    });

    it("handles multiple spaces gracefully", () => {
      expect(tokenize("  blog   search   agentic   ")).toEqual(["blog", "search", "agentic"]);
    });
  });

  describe("parseInput", () => {
    it("parses empty input", () => {
      expect(parseInput("")).toEqual({ raw: "", cmd: "", args: [], flags: {} });
      expect(parseInput("   ")).toEqual({ raw: "   ", cmd: "", args: [], flags: {} });
    });

    it("parses command and positional arguments", () => {
      const res = parseInput("projects 2");
      expect(res.cmd).toBe("projects");
      expect(res.args).toEqual(["2"]);
      expect(res.flags).toEqual({});
    });

    it("parses boolean flags (--copy, -c)", () => {
      const res = parseInput("contact --copy");
      expect(res.cmd).toBe("contact");
      expect(res.flags.copy).toBe(true);

      const res2 = parseInput("contact -c");
      expect(res2.flags.c).toBe(true);
    });

    it("parses valued flags (--tag=ai, --tag ai)", () => {
      const res1 = parseInput("blog --tag=Python");
      expect(res1.cmd).toBe("blog");
      expect(res1.flags.tag).toBe("Python");

      const res2 = parseInput("blog --tag Agentic");
      expect(res2.cmd).toBe("blog");
      expect(res2.flags.tag).toBe("Agentic");
    });
  });

  describe("resolveHistoryExpansion", () => {
    const history = ["help", "projects", "theme dracula"];

    it("expands '!!' to the last command", () => {
      expect(resolveHistoryExpansion("!!", history)).toBe("theme dracula");
    });

    it("expands '!n' to command at 1-based index n", () => {
      expect(resolveHistoryExpansion("!1", history)).toBe("help");
      expect(resolveHistoryExpansion("!2", history)).toBe("projects");
    });

    it("returns original input if not an expansion", () => {
      expect(resolveHistoryExpansion("about", history)).toBe("about");
    });
  });
});
