import {
    describe,
    expect,
    it,
  } from "vitest";
  
  import { parseInput } from "../../src/io";
  
  describe("challenge input parser", () => {
    it("parses the supplied challenge input", () => {
      const input = `
        5 3
        1 1 E
        RFRFRFRF
        3 2 N
        FRRFLLFFRRFLL
        0 3 W
        LLFFFLFLFL
      `;
  
      expect(parseInput(input)).toEqual({
        world: {
          maxX: 5,
          maxY: 3,
        },
        robots: [
          {
            initialPosition: {
              x: 1,
              y: 1,
              orientation: "E",
            },
            instructions: [
              "R",
              "F",
              "R",
              "F",
              "R",
              "F",
              "R",
              "F",
            ],
          },
          {
            initialPosition: {
              x: 3,
              y: 2,
              orientation: "N",
            },
            instructions: [
              "F",
              "R",
              "R",
              "F",
              "L",
              "L",
              "F",
              "F",
              "R",
              "R",
              "F",
              "L",
              "L",
            ],
          },
          {
            initialPosition: {
              x: 0,
              y: 3,
              orientation: "W",
            },
            instructions: [
              "L",
              "L",
              "F",
              "F",
              "F",
              "L",
              "F",
              "L",
              "F",
              "L",
            ],
          },
        ],
      });
    });
  
    it("supports Windows line endings", () => {
      const input = "5 3\r\n1 1 E\r\nF";
  
      expect(parseInput(input)).toEqual({
        world: {
          maxX: 5,
          maxY: 3,
        },
        robots: [
          {
            initialPosition: {
              x: 1,
              y: 1,
              orientation: "E",
            },
            instructions: ["F"],
          },
        ],
      });
    });
  });