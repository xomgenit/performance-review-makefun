// Performance review entry emitter.
//
// Writes the one-line entry for the "Funniest One-Line Performance Review"
// make.fun bounty into entry.txt inside the grader's output directory.

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const REVIEW_LINE =
  "Exceeds expectations at typing 'please' and 'thanks'; developing at saying which of my answers was wrong.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "out";

// The sealed scorer accepts UTF-8 text of 1 to 140 characters that is not
// only whitespace. Mirror that gate here so a bad line fails loudly at
// emit time instead of silently scoring zero.
const GATE_MIN = 1;
const GATE_MAX = 140;

function passesGate(line: string): boolean {
  const chars = [...line].length;
  return chars >= GATE_MIN && chars <= GATE_MAX && line.trim().length > 0;
}

async function emitReview(): Promise<void> {
  if (!passesGate(REVIEW_LINE)) {
    throw new Error(`entry fails the ${GATE_MIN}-${GATE_MAX} char gate`);
  }
  await mkdir(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  await writeFile(target, REVIEW_LINE, "utf8");
  console.log(`wrote ${REVIEW_LINE.length} chars to ${target}`);
}

emitReview().catch((err) => {
  console.error(err);
  process.exit(1);
});
