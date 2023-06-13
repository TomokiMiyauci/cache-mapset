// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { assertCapacity } from "./utils.ts";
import { assertThrows, describe, it } from "./_dev_deps.ts";

describe("assertCapacity", () => {
  it("should throw error if the input is negative", () => {
    assertThrows(() => assertCapacity(-1));
  });
});
