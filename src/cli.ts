import { readFileSync } from "node:fs";

import {
  formatOutput,
  parseInput,
} from "./io";

import {
  runRobot,
  World,
  type RobotResult,
} from "./world";

export function run(input: string): string {
  const simulation = parseInput(input);

  const world = new World(
    simulation.world.maxX,
    simulation.world.maxY,
  );

  const results: RobotResult[] = [];

  for (const robot of simulation.robots) {
    const result = runRobot(
      world,
      robot.initialPosition,
      robot.instructions,
    );

    results.push(result);
  }

  return formatOutput(results);
}

if (require.main === module) {
  const input = readFileSync(0, "utf8");
  process.stdout.write(`${run(input)}\n`);
}
