import type { Orientation } from "./types";

const leftTurns: Record<Orientation, Orientation> = {
  N: "W",
  W: "S",
  S: "E",
  E: "N",
};

const rightTurns: Record<Orientation, Orientation> = {
  N: "E",
  E: "S",
  S: "W",
  W: "N",
};

export function turnLeft(orientation: Orientation): Orientation {
  return leftTurns[orientation];
}

export function turnRight(orientation: Orientation): Orientation {
  return rightTurns[orientation];
}