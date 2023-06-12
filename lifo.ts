// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isNonNegativeNumber } from "./deps.ts";
import type { SetLike } from "./types.ts";

export class LIFOSet<T> implements SetLike<T> {
  #cache: T[];
  #maxSize: number;

  constructor(maxNumOfValues: number) {
    const maxSize = Math.floor(maxNumOfValues);

    if (!isNonNegativeNumber(maxSize)) {
      throw RangeError("maxNumOfValues must be non-negative");
    }

    this.#cache = [];
    this.#maxSize = maxSize;
  }

  has(value: T): boolean {
    return this.#cache.includes(value);
  }

  add(value: T): this {
    if (this.#cache.includes(value)) return this;
    if (this.#maxSize <= this.#cache.length) {
      this.#cache.shift();
    }
    if (this.#maxSize > this.size) this.#cache.unshift(value);

    return this;
  }

  delete(value: T): boolean {
    const index = this.#cache.findIndex((el) => el === value);

    if (index >= 0) {
      this.#cache.splice(index, 1);

      return true;
    }

    return false;
  }

  clear(): void {
    this.#cache.length = 0;
  }

  get size(): number {
    return this.#cache.length;
  }
}
