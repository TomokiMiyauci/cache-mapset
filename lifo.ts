// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isNonNegativeNumber } from "./deps.ts";
import type { MapLike, SetLike } from "./types.ts";

export class LIFOMap<K, V> implements MapLike<K, V> {
  #cache: Map<K, V>;
  #maxSize: number;

  constructor(maxNumOfEntries: number) {
    if (!isNonNegativeNumber(maxNumOfEntries)) {
      throw RangeError("maxNumOfEntries must be non-negative");
    }

    const maxSize = Math.floor(maxNumOfEntries);

    this.#maxSize = maxSize;
    this.#cache = new Map<K, V>();
  }

  has(key: K): boolean {
    return this.#cache.has(key);
  }

  get(key: K): V | undefined {
    return this.#cache.get(key);
  }

  set(key: K, value: V): this {
    if (this.#cache.has(key)) {
      this.#cache.set(key, value);

      return this;
    }
    if (this.#maxSize <= this.#cache.size) this.#cache.delete(this.#latestKey!);
    if (this.#maxSize > this.size) this.#cache.set(key, value);

    return this;
  }

  delete(key: K): boolean {
    return this.#cache.delete(key);
  }

  clear(): void {
    this.#cache.clear();
  }

  get size(): number {
    return this.#cache.size;
  }

  get #latestKey(): K | undefined {
    return [...this.#cache.keys()].pop();
  }
}

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
