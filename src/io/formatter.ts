import type { RobotResult } from "../world";

function formatRobotResult(result: RobotResult): string {
  const { x, y, orientation } = result.position;

  const position = `${x} ${y} ${orientation}`;

  return result.lost
    ? `${position} LOST`
    : position;
}

export function formatOutput(
  results: readonly RobotResult[],
): string {
  return results
    .map(formatRobotResult)
    .join("\n");
}