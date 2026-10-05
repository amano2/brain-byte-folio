import { describe, it, expect } from "vitest";
import { levenshteinDistance, findClosestCommand } from "../levenshtein";

describe("Levenshtein Distance & Suggestions", () => {
  it("calculates exact distance between strings", () => {
    expect(levenshteinDistance("help", "help")).toBe(0);
    expect(levenshteinDistance("help", "helo")).toBe(1);
    expect(levenshteinDistance("about", "abut")).toBe(1);
    expect(levenshteinDistance("project", "projects")).toBe(1);
  });

  it("suggests closest candidate within distance threshold", () => {
    const candidates = ["help", "projects", "skills", "about", "contact", "theme"];

    expect(findClosestCommand("hel", candidates)).toBe("help");
    expect(findClosestCommand("skils", candidates)).toBe("skills");
    expect(findClosestCommand("abou", candidates)).toBe("about");
    expect(findClosestCommand("theem", candidates)).toBe("theme");
  });

  it("returns null when no candidate is within max distance", () => {
    const candidates = ["help", "projects", "skills"];
    expect(findClosestCommand("completely_different", candidates, 2)).toBeNull();
  });
});
