import type { Position } from "../robot";

export class World {
  private readonly scents = new Set<string>();

  constructor(
    public readonly maxX: number,
    public readonly maxY: number,
  ) {}

  contains(position: Position): boolean {
    return (
      position.x >= 0 &&
      position.x <= this.maxX &&
      position.y >= 0 &&
      position.y <= this.maxY
    );
  }

  public hasScent(position: Position): boolean {
    return this.scents.has(this.scentKey(position));
  }

  public leaveScent(position: Position): void {
    this.scents.add(this.scentKey(position));
  }

  private scentKey(position: Position): string {
    return `${position.x}:${position.y}`;
  }
}