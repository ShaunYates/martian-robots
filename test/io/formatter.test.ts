import {
    describe,
    expect,
    it,
  } from "vitest";
  
  import { formatOutput } from "../../src/io";
  
  describe("challenge output formatter", () => {
    it("formats robot results", () => {
      const output = formatOutput([
        {
          position: {
            x: 1,
            y: 1,
            orientation: "E",
          },
          lost: false,
        },
        {
          position: {
            x: 3,
            y: 3,
            orientation: "N",
          },
          lost: true,
        },
        {
          position: {
            x: 2,
            y: 3,
            orientation: "S",
          },
          lost: false,
        },
      ]);
  
      expect(output).toBe(
        [
          "1 1 E",
          "3 3 N LOST",
          "2 3 S",
        ].join("\n"),
      );
    });
  });