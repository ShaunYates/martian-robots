# Martian Robots

A TypeScript implementation of the Red Badger Martian Robots coding challenge.

The application simulates robots moving around a bounded rectangular world using sequences of `L`, `R`, and `F` instructions.

Robots that move beyond the edge of the world are lost and leave a scent at their last valid position. Future robots attempting to leave the world from a scented position ignore that instruction.

## Requirements

- Node.js 20+
- npm

If Node is not installed:
- macOS: `brew install node`
- otherwise: https://nodejs.org/

## Setup

Install dependencies:

```bash
npm i
```

## Running the application

A `sample.txt` file containing the supplied challenge input is included in the root of the repository:

```text
5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL
```

Run the application with:

```bash
make run
```

This will both build and run the application.

Expected output:

```text
1 1 E
3 3 N LOST
2 3 S
```

The application reads from standard input, so another input file can be used in the same way:

```bash
npm start < another-input.txt
```

## Testing

The project uses Vitest.

Run the test suite:

```bash
npm test
```

Tests are split across the same main responsibilities as the application:

```text
test/
├── io/
├── robot/
└── world/
└── cli.test.ts
```

## Project structure

```text
src/
├── io/
├── robot/
├── world/
└── cli.ts
```

### Robot

The `robot` module owns navigation behaviour such as rotation, forward movement, and instruction execution.

### World

The `world` module owns the bounded grid, lost robot behaviour, and scents.

### IO

The `io` module handles parsing the challenge input and formatting the resulting robot positions.

### cli.ts

Ties the other modules together and processes robots sequentially using the same world instance.

## Technical choices

### TypeScript

TypeScript was chosen because the problem has a small domain that benefits from explicit types for concepts such as orientations, instructions, positions, and results. I also had not touched Typescript in a while but find it easy to get simple programs working, so thought it would be a good choice.

For example:

```typescript
type Orientation = "N" | "E" | "S" | "W";
type Instruction = "L" | "R" | "F";
```

This keeps invalid domain values out of the core application while remaining concise.

### Vitest

Vitest provides a lightweight TypeScript-friendly test setup and a familiar Jest-style API without requiring additional runtime configuration. (I had planned to use Jest but seems `ts-jest` does not work with the newest Typescript version, perhaps I am wrong about this though)

### Design

The implementation intentionally separates robot navigation from world rules.

A robot determines its next position, while the world determines whether that position is valid. This keeps boundary and scent behaviour out of the core navigation logic.

Scents belong to the world rather than individual robots because they must affect robots processed later in the simulation.

## Assumptions

- The lower-left world coordinate is `(0, 0)`.
- The supplied upper-right coordinate is inclusive.
- Robots are processed sequentially.
- A lost robot does not execute its remaining instructions.
- A scent belongs to a grid coordinate rather than an orientation.
- Input follows the format defined by the challenge.