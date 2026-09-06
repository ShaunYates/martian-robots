import { turnLeft, turnRight } from "./orientation";
import type { Instruction, Orientation, Position } from "./types";

const movement: Record<Orientation, { x: number; y: number }> = {
  N: { x: 0, y: 1 },
  E: { x: 1, y: 0 },
  S: { x: 0, y: -1 },
  W: { x: -1, y: 0 },
};

function moveForward(position: Position): Position {
  const offset = movement[position.orientation];

  return {
    ...position,
    x: position.x + offset.x,
    y: position.y + offset.y,
  };
}

function executeInstruction(
  position: Position,
  instruction: Instruction,
): Position {
  switch (instruction) {
    case "L":
      return {
        ...position,
        orientation: turnLeft(position.orientation),
      };

    case "R":
      return {
        ...position,
        orientation: turnRight(position.orientation),
      };

    case "F":
      return moveForward(position);
  }
}

export function navigate(
  initialPosition: Position,
  instructions: readonly Instruction[],
): Position {
  return instructions.reduce(executeInstruction, initialPosition);
}