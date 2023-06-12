// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isNonNegativeNumber } from "./deps.ts";
import type { MapLike, SetLike } from "./types.ts";

export class FIFOMap<K, V> implements MapLike<K, V> {
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

  set(key: K, value: V): this {
    if (this.has(key)) {
      this.#cache.set(key, value);

      return this;
    }
    if (this.#maxSize <= this.#cache.size) this.#cache.delete(this.#firstKey!);
    if (this.#maxSize > this.size) this.#cache.set(key, value);

    return this;
  }

  get(key: K): V | undefined {
    return this.#cache.get(key);
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

  get #firstKey(): K | undefined {
    return this.#cache.keys().next().value;
  }
}

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
    this.#cache.clear();
  }

  get size(): number {
    return this.#cache.size;
  }

  get #first(): T | undefined {
    return this.#cache.values().next().value;
  }
}
