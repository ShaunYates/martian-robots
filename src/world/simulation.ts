import {
    navigate,
    type Instruction,
    type Position,
  } from "../robot";
  
  import type { RobotResult, World } from "./types";
  
  function isWithinWorld(world: World, position: Position): boolean {
    return (
      position.x >= 0 &&
      position.x <= world.maxX &&
      position.y >= 0 &&
      position.y <= world.maxY
    );
  }
  
  export function runRobot(
    world: World,
    initialPosition: Position,
    instructions: readonly Instruction[],
  ): RobotResult {
    let position = initialPosition;
  
    for (const instruction of instructions) {
      const nextPosition = navigate(position, [instruction]);
  
      if (!isWithinWorld(world, nextPosition)) {
        return {
          position,
          lost: true,
        };
      }
  
      position = nextPosition;
    }
  
    return {
      position,
      lost: false,
    };
  }