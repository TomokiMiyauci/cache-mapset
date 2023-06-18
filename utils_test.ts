// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.

import { toIntegerOrInfinity } from "./utils.ts";
import { assertEquals, describe, it } from "./_dev_deps.ts";

describe("toIntegerOrInfinity", () => {
  it("should return integer or infinity", () => {
    const table: [number, number][] = [
      [0, 0],
      [-0, 0],
      [1, 1],
      [1.1, 1],
      [1.99999999999999, 1],
      [-1.1, -1],
      [-1.10000111, -1],
      [-1.9999999, -1],
      [Infinity, Infinity],
      [-Infinity, -Infinity],
      [NaN, 0],
    ];

    table.forEach(([input, expected]) => {
      assertEquals(toIntegerOrInfinity(input), expected);
    });
  });
});
