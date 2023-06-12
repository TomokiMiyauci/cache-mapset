// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { assertCapacity } from "./utils.ts";
import type { MapLike, SetLike } from "./types.ts";

export class LIFOMap<K, V> implements MapLike<K, V> {
  #cache: Map<K, V>;
  #capacity: number;

  constructor(maxNumOfEntries: number) {
    assertCapacity(maxNumOfEntries);

    const capacity = Math.floor(maxNumOfEntries);

    this.#capacity = capacity;
    this.#cache = new Map<K, V>();
  }

  has(key: K): boolean {
    return this.#cache.has(key);
  }

  get(key: K): V | undefined {
    return this.#cache.get(key);
  }

  set(key: K, value: V): this {
    if (!this.#capacity) return this;
    if (this.#cache.has(key)) {
      this.#cache.set(key, value);

      return this;
    }
    if (this.#capacity <= this.#cache.size) {
      this.#cache.delete(this.#latestKey!);
    }

    this.#cache.set(key, value);

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
  #capacity: number;

  constructor(maxNumOfValues: number) {
    assertCapacity(maxNumOfValues);

    const capacity = Math.floor(maxNumOfValues);

    this.#cache = [];
    this.#capacity = capacity;
  }

  has(value: T): boolean {
    return this.#cache.includes(value);
  }

  add(value: T): this {
    if (!this.#capacity) return this;
    if (this.#cache.includes(value)) return this;
    if (this.#capacity <= this.#cache.length) {
      this.#cache.shift();
    }

    this.#cache.unshift(value);

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
