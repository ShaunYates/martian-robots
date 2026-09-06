import {
    navigate,
    type Instruction,
    type Position,
  } from "../robot";
  
  import { World } from "./world";
  import type { RobotResult } from "./types";
  
  export function runRobot(
    world: World,
    initialPosition: Position,
    instructions: readonly Instruction[],
  ): RobotResult {
    let position = initialPosition;
  
    for (const instruction of instructions) {
      const nextPosition = navigate(position, [instruction]);
  
      if (!world.contains(nextPosition)) {
        if (world.hasScent(position)) {
          continue;
        }
  
        world.leaveScent(position);
  
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