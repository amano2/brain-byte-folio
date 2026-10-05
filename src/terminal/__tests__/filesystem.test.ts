import { describe, it, expect } from "vitest";
import {
  normalizePath,
  formatPath,
  getNode,
  getChildNames,
  buildVirtualFileSystem
} from "../filesystem";

describe("Virtual Filesystem (VFS)", () => {
  const vfs = buildVirtualFileSystem();

  describe("normalizePath", () => {
    it("normalizes root path '~'", () => {
      expect(normalizePath("~")).toEqual([]);
      expect(normalizePath("/")).toEqual([]);
    });

    it("normalizes child directories", () => {
      expect(normalizePath("projects", "~")).toEqual(["projects"]);
      expect(normalizePath("~/projects")).toEqual(["projects"]);
      expect(normalizePath("/projects")).toEqual(["projects"]);
    });

    it("resolves parent '..' navigations", () => {
      expect(normalizePath("..", "~/projects")).toEqual([]);
      expect(normalizePath("~/projects/..")).toEqual([]);
      expect(normalizePath("../blog", "~/projects")).toEqual(["blog"]);
    });

    it("resolves current directory '.'", () => {
      expect(normalizePath("./about.txt", "~")).toEqual(["about.txt"]);
    });
  });

  describe("getNode and VFS Structure", () => {
    it("contains about.txt and contact.txt at root", () => {
      const aboutNode = getNode(["about.txt"], vfs);
      expect(aboutNode).not.toBeNull();
      expect(aboutNode?.type).toBe("file");
      if (aboutNode?.type === "file") {
        expect(aboutNode.content).toContain("Aman Hossain");
      }

      const contactNode = getNode(["contact.txt"], vfs);
      expect(contactNode).not.toBeNull();
      expect(contactNode?.type).toBe("file");
    });

    it("contains all 3 projects in projects directory", () => {
      const projDir = getNode(["projects"], vfs);
      expect(projDir?.type).toBe("directory");
      if (projDir?.type === "directory") {
        expect(projDir.children["plant-web.md"]).toBeDefined();
        expect(projDir.children["agentic-copilot-trust-layer.md"]).toBeDefined();
        expect(projDir.children["genai-forecasting-assistant.md"]).toBeDefined();
      }
    });

    it("contains blog articles in blog directory", () => {
      const blogDir = getNode(["blog"], vfs);
      expect(blogDir?.type).toBe("directory");
      if (blogDir?.type === "directory") {
        expect(blogDir.children["agenttrace-hallucination-detection.md"]).toBeDefined();
      }
    });

    it("lists child names correctly", () => {
      const rootNames = getChildNames([], vfs);
      expect(rootNames).toContain("projects/");
      expect(rootNames).toContain("blog/");
      expect(rootNames).toContain("skills/");
      expect(rootNames).toContain("about.txt");
    });
  });
});
