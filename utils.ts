// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isNonNegativeNumber } from "./deps.ts";

/** Assert capacity is valid. */
export function assertCapacity(capacity: number): asserts capacity {
  if (!isNonNegativeNumber(capacity)) {
    throw RangeError("capacity must be non-negative");
  }
}
