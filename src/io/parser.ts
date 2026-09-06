import type {
    Instruction,
    Orientation,
  } from "../robot";
  
  import type {
    RobotProgram,
    SimulationInput,
  } from "./types";
  
  const orientations = new Set<string>(["N", "E", "S", "W"]);
  const instructions = new Set<string>(["L", "R", "F"]);
  
  function parseNumber(value: string | undefined): number {
    if (value === undefined) {
      throw new Error("Expected coordinate");
    }
  
    const parsed = Number(value);
  
    if (!Number.isInteger(parsed)) {
      throw new Error(`Invalid coordinate: ${value}`);
    }
  
    return parsed;
  }
  
  function parseOrientation(value: string | undefined): Orientation {
    if (value === undefined || !orientations.has(value)) {
      throw new Error(`Invalid orientation: ${value ?? ""}`);
    }
  
    return value as Orientation;
  }
  
  function parseInstructions(value: string): Instruction[] {
    return [...value].map((instruction) => {
      if (!instructions.has(instruction)) {
        throw new Error(`Invalid instruction: ${instruction}`);
      }
  
      return instruction as Instruction;
    });
  }
  
  function parseRobot(
    positionLine: string,
    instructionLine: string,
  ): RobotProgram {
    const [x, y, orientation] = positionLine.split(/\s+/);
  
    return {
      initialPosition: {
        x: parseNumber(x),
        y: parseNumber(y),
        orientation: parseOrientation(orientation),
      },
      instructions: parseInstructions(instructionLine),
    };
  }
  
  export function parseInput(input: string): SimulationInput {
    const lines = input
      .trim()
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  
    const boundsLine = lines[0];
  
    if (boundsLine === undefined) {
      throw new Error("Input is empty");
    }
  
    const [maxX, maxY] = boundsLine.split(/\s+/);
  
    const robots: RobotProgram[] = [];
  
    for (let index = 1; index < lines.length; index += 2) {
      const positionLine = lines[index];
      const instructionLine = lines[index + 1];
  
      if (positionLine === undefined || instructionLine === undefined) {
        throw new Error("Expected position and instruction lines for robot");
      }
  
      robots.push(parseRobot(positionLine, instructionLine));
    }
  
    return {
      world: {
        maxX: parseNumber(maxX),
        maxY: parseNumber(maxY),
      },
      robots,
    };
  }