export type Orientation = "N" | "E" | "S" | "W";

export type Instruction = "L" | "R" | "F";

export interface Position {
  x: number;
  y: number;
  orientation: Orientation;
}