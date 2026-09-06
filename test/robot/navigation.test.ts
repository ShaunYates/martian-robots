import { describe, expect, it } from "vitest";
import {
  navigate,
  type Orientation,
  type Position,
} from "../../src/robot";
  
  describe("robot navigation", () => {
    describe("rotation", () => {
      it.each([
        ["N", "W"],
        ["W", "S"],
        ["S", "E"],
        ["E", "N"],
      ] as const)(
        "turns left from %s to %s",
        (orientation, expectedOrientation) => {
          const position: Position = {
            x: 1,
            y: 1,
            orientation,
          };
  
          expect(navigate(position, ["L"])).toEqual({
            x: 1,
            y: 1,
            orientation: expectedOrientation,
          });
        },
      );
  
      it.each([
        ["N", "E"],
        ["E", "S"],
        ["S", "W"],
        ["W", "N"],
      ] as const)(
        "turns right from %s to %s",
        (orientation, expectedOrientation) => {
          const position: Position = {
            x: 1,
            y: 1,
            orientation,
          };
  
          expect(navigate(position, ["R"])).toEqual({
            x: 1,
            y: 1,
            orientation: expectedOrientation,
          });
        },
      );
    });
  
    describe("forward movement", () => {
      it.each([
        ["N", 1, 2],
        ["E", 2, 1],
        ["S", 1, 0],
        ["W", 0, 1],
      ] as const)(
        "moves forward when facing %s",
        (
          orientation: Orientation,
          expectedX: number,
          expectedY: number,
        ) => {
          const position: Position = {
            x: 1,
            y: 1,
            orientation,
          };
  
          expect(navigate(position, ["F"])).toEqual({
            x: expectedX,
            y: expectedY,
            orientation,
          });
        },
      );
    });
  
    describe("instruction sequences", () => {
      it("executes instructions in order", () => {
        const position: Position = {
          x: 1,
          y: 1,
          orientation: "E",
        };
  
        expect(
          navigate(position, ["R", "F", "R", "F", "R", "F", "R", "F"]),
        ).toEqual({
          x: 1,
          y: 1,
          orientation: "E",
        });
      });
  
      it("returns the initial position when no instructions are provided", () => {
        const position: Position = {
          x: 2,
          y: 3,
          orientation: "N",
        };
  
        expect(navigate(position, [])).toEqual(position);
      });
    });
  });