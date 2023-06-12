// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { assertCapacity } from "./utils.ts";
import type { MapLike, SetLike } from "./types.ts";

/** `Map` with an upper limit, objects like. When the upper limit is reached, replaces the entry with FIFO algorithm.
 * @example
 * ```ts
 * import { FIFOMap } from "https://deno.land/x/cache_policy@$VERSION/fifo.ts";
 *
 * declare const maxNumOfEntries: number;
 * const map = new FIFOMap(maxNumOfEntries);
 * ```
 */
export class FIFOMap<K, V> implements MapLike<K, V> {
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

  set(key: K, value: V): this {
    if (!this.#capacity) return this;
    if (this.has(key)) {
      this.#cache.set(key, value);

      return this;
    }
    if (this.#capacity <= this.#cache.size) this.#cache.delete(this.#firstKey!);

    this.#cache.set(key, value);

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

/** `Set` with an upper limit, objects like. When the upper limit is reached, replaces the value with FIFO algorithm.
 * @example
 * ```ts
 * import { FIFOSet } from "https://deno.land/x/cache_policy@$VERSION/fifo.ts";
 *
 * declare const maxNumOfValues: number;
 * const set = new FIFOSet(maxNumOfValues);
 * ```
 */
export class FIFOSet<T> implements SetLike<T> {
  #cache: Set<T>;
  #capacity: number;
  constructor(maxNumOfValues: number) {
    assertCapacity(maxNumOfValues);

    const capacity = Math.floor(maxNumOfValues);

    this.#cache = new Set<T>();
    this.#capacity = capacity;
  }

  has(value: T): boolean {
    return this.#cache.has(value);
  }

  add(value: T): this {
    if (this.#cache.has(value)) return this;
    if (this.#cache.size >= this.#capacity) this.#cache.delete(this.#first!);
    if (this.#cache.size < this.#capacity) this.#cache.add(value);

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
