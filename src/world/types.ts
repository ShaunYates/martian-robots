import type { Position } from "../robot";

export interface RobotResult {
  position: Position;
  lost: boolean;
}