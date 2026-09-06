import type { Position } from "../robot";

export interface World {
  // min will always be 0, 0
  maxX: number;
  maxY: number;
}

export interface RobotResult {
  position: Position;
  lost: boolean;
}