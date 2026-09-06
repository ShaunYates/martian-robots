import { describe, expect, it } from "vitest";

import type { Position } from "../../src/robot";
import {
  runRobot,
  World,
} from "../../src/world";

describe("Martian world", () => {
  it("allows a robot to move within the world", () => {
    const world = new World(5, 3);

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
    const world = new World(5, 3);

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
    const world = new World(5, 3);

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
    const world = new World(5, 3);

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
    const world = new World(5, 3);

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

  it("ignores an instruction that would leave the world from a scented position", () => {
    const world = new World(5, 3);

    const position: Position = {
      x: 3,
      y: 3,
      orientation: "N",
    };

    const firstRobot = runRobot(world, position, ["F"]);

    expect(firstRobot).toEqual({
      position: {
        x: 3,
        y: 3,
        orientation: "N",
      },
      lost: true,
    });

    const secondRobot = runRobot(
      world,
      position,
      ["F", "R", "F"],
    );

    expect(secondRobot).toEqual({
      position: {
        x: 4,
        y: 3,
        orientation: "E",
      },
      lost: false,
    });
  });

  it("associates a scent with the grid position rather than orientation", () => {
    const world = new World(5, 3);
  
    runRobot(
      world,
      {
        x: 0,
        y: 0,
        orientation: "W",
      },
      ["F"],
    );
  
    expect(
      runRobot(
        world,
        {
          x: 0,
          y: 0,
          orientation: "S",
        },
        ["F"],
      ),
    ).toEqual({
      position: {
        x: 0,
        y: 0,
        orientation: "S",
      },
      lost: false,
    });
  });
});