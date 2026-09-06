import { describe, expect, it } from "vitest";

import type { Position } from "../../src/robot";
import {
  runRobot,
  type World,
} from "../../src/world";

describe("Martian world", () => {
  const world: World = {
    maxX: 5,
    maxY: 3,
  };

  it("allows a robot to move within the world", () => {
    const position: Position = {
      x: 1,
      y: 1,
      orientation: "N",
    };

    expect(runRobot(world, position, ["F"])).toEqual({
      position: {
        x: 1,
        y: 2,
        orientation: "N",
      },
      lost: false,
    });
  });

  it("allows a robot to occupy the upper-right boundary", () => {
    const position: Position = {
      x: 4,
      y: 3,
      orientation: "E",
    };

    expect(runRobot(world, position, ["F"])).toEqual({
      position: {
        x: 5,
        y: 3,
        orientation: "E",
      },
      lost: false,
    });
  });

  it("marks a robot as lost when it moves beyond the upper boundary", () => {
    const position: Position = {
      x: 3,
      y: 3,
      orientation: "N",
    };

    expect(runRobot(world, position, ["F"])).toEqual({
      position: {
        x: 3,
        y: 3,
        orientation: "N",
      },
      lost: true,
    });
  });

  it("marks a robot as lost when it moves below the lower boundary", () => {
    const position: Position = {
      x: 0,
      y: 0,
      orientation: "W",
    };

    expect(runRobot(world, position, ["F"])).toEqual({
      position: {
        x: 0,
        y: 0,
        orientation: "W",
      },
      lost: true,
    });
  });

  it("does not execute remaining instructions after a robot is lost", () => {
    const position: Position = {
      x: 5,
      y: 3,
      orientation: "N",
    };

    expect(runRobot(world, position, ["F", "R", "R"])).toEqual({
      position: {
        x: 5,
        y: 3,
        orientation: "N",
      },
      lost: true,
    });
  });
});