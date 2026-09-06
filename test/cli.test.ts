import {
  describe,
  expect,
  it,
} from "vitest";

import { run } from "../src/cli";

describe("Martian Robots challenge", () => {
  it("produces the expected output for the supplied sample", () => {
    const input = [
      "5 3",
      "1 1 E",
      "RFRFRFRF",
      "3 2 N",
      "FRRFLLFFRRFLL",
      "0 3 W",
      "LLFFFLFLFL",
    ].join("\n");

    const expectedOutput = [
      "1 1 E",
      "3 3 N LOST",
      "2 3 S",
    ].join("\n");

    expect(run(input)).toBe(expectedOutput);
  });

  it("handles a long instruction sequence in a large world", () => {
    const instructions = [
      "F".repeat(24),
      "R",
      "F".repeat(24),
      "R",
      "F".repeat(24),
      "R",
      "F".repeat(24),
    ].join("");

    const input = [
      "50 50",
      "0 0 N",
      instructions,
    ].join("\n");

    expect(instructions.length).toBeLessThan(100);
    expect(run(input)).toBe("0 0 W");
  });

  it("applies scents from earlier robots to later ones", () => {
    const input = [
      "5 3",
      "3 3 N",
      "F",
      "3 3 N",
      "FRRF",
    ].join("\n");

    const expectedOutput = [
      "3 3 N LOST",
      "3 2 S",
    ].join("\n");

    expect(run(input)).toBe(expectedOutput);
  });

  it("handles a long rotation-only instruction string", () => {
    const instructions = "LR".repeat(49);

    const input = [
      "50 50",
      "25 25 N",
      instructions,
    ].join("\n");

    expect(instructions.length).toBeLessThan(100);
    expect(run(input)).toBe("25 25 N");
  });
});
