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
});
