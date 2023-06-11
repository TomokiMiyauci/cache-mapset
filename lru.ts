// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isNonNegativeNumber } from "./deps.ts";
import type { MapLike } from "./types.ts";

export class LRUMap<K, V> implements MapLike<K, V> {
  #cache: Map<K, V>;
  #maxSize: number;

  constructor(maxNumOfEntries: number) {
    const maxSize = Math.floor(maxNumOfEntries);

    if (!isNonNegativeNumber(maxSize)) {
      throw RangeError("maxNumOfEntries must be non-negative");
    }

    this.#maxSize = maxSize;
    this.#cache = new Map<K, V>();
  }

  has(key: K): boolean {
    return this.#cache.has(key);
  }

  get(key: K): V | undefined {
    const has = this.#cache.has(key);
    const value = this.#cache.get(key);

    if (has) this.#rollup(key, value!);

    return value;
  }

  set(key: K, value: V): this {
    if (this.has(key)) return this.#rollup(key, value);
    if (this.#maxSize <= this.#cache.size) this.#cache.delete(this.#oldestKey!);
    if (this.#maxSize > this.size) this.#cache.set(key, value);

    return this;
  }

  delete(key: K): boolean {
    return this.#cache.delete(key);
  }

  clear(): void {
    for (const key of this.#cache.keys()) this.#cache.delete(key);
  }

  get size(): number {
    return this.#cache.size;
  }

  get #oldestKey(): K | undefined {
    return this.#cache.keys().next().value;
  }

  #rollup(key: K, value: V): this {
    this.#cache.delete(key);
    this.#cache.set(key, value);

    return this;
  }
}
