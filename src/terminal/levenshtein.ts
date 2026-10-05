/**
 * Calculates the Levenshtein distance between two strings.
 */
export function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1].toLowerCase() === b[j - 1].toLowerCase()) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],     // deletion
          dp[i][j - 1],     // insertion
          dp[i - 1][j - 1]  // substitution
        );
      }
    }
  }

  return dp[m][n];
}

/**
 * Finds the closest candidate command within maxDistance (default 2).
 */
export function findClosestCommand(
  input: string,
  candidates: string[],
  maxDistance = 2
): string | null {
  if (!input) return null;
  const cleanInput = input.trim().toLowerCase();

  let closest: string | null = null;
  let minDistance = maxDistance + 1;

  for (const candidate of candidates) {
    const dist = levenshteinDistance(cleanInput, candidate.toLowerCase());
    if (dist <= maxDistance && dist < minDistance) {
      minDistance = dist;
      closest = candidate;
    }
  }

  return closest;
}
