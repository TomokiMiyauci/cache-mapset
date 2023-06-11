// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isNonNegativeNumber } from "./deps.ts";
import type { SetLike } from "./types.ts";

export class FIFOSet<T> implements SetLike<T> {
  #cache: Set<T>;
  #maxSize: number;
  constructor(maxNumOfValues: number) {
    const maxSize = Math.floor(maxNumOfValues);

    if (!isNonNegativeNumber(maxSize)) {
      throw RangeError("maxNumOfValues must be non-negative");
    }

    this.#cache = new Set<T>();
    this.#maxSize = maxSize;
  }

  has(value: T): boolean {
    return this.#cache.has(value);
  }

  add(value: T): this {
    if (this.#cache.has(value)) return this;
    if (this.#cache.size >= this.#maxSize) this.#cache.delete(this.#first!);
    if (this.#cache.size < this.#maxSize) this.#cache.add(value);

    return this;
  }

  delete(value: T): boolean {
    return this.#cache.delete(value);
  }

  clear(): void {
    for (const value of this.#cache.values()) this.#cache.delete(value);
  }

  get size(): number {
    return this.#cache.size;
  }

  get #first(): T | undefined {
    return this.#cache.values().next().value;
  }
}
