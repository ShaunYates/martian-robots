import type {
    Instruction,
    Position,
  } from "../robot";
  
  export interface RobotProgram {
    initialPosition: Position;
    instructions: readonly Instruction[];
  }
  
  export interface SimulationInput {
    world: {
      maxX: number;
      maxY: number;
    };
    robots: readonly RobotProgram[];
  }