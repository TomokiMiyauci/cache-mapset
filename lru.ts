// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { assertCapacity } from "./utils.ts";
import type { MapLike, SetLike } from "./types.ts";

/** `Map` with an upper limit, objects like. When the upper limit is reached, replaces the entry with LRU algorithm.
 * @example
 * ```ts
 * import { LRUMap } from "https://deno.land/x/cache_mapset@$VERSION/lru.ts";
 *
 * declare const maxNumOfEntries: number;
 * const map = new LRUMap(maxNumOfEntries);
 * ```
 */
export class LRUMap<K, V> implements MapLike<K, V> {
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
    const has = this.#cache.has(key);
    const value = this.#cache.get(key);

    if (has) this.#rollup(key, value!);

    return value;
  }

  set(key: K, value: V): this {
    if (!this.#capacity) return this;
    if (this.#cache.has(key)) return this.#rollup(key, value);
    if (this.#capacity <= this.#cache.size) {
      this.#cache.delete(this.#oldestKey!);
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

  get #oldestKey(): K | undefined {
    return this.#cache.keys().next().value;
  }

  #rollup(key: K, value: V): this {
    this.#cache.delete(key);
    this.#cache.set(key, value);

    return this;
  }
}

/** `Set` with an upper limit, objects like. When the upper limit is reached, replaces the value with LRU algorithm.
 * @example
 * ```ts
 * import { LRUSet } from "https://deno.land/x/cache_mapset@$VERSION/lru.ts";
 *
 * declare const maxNumOfValues: number;
 * const set = new LRUSet(maxNumOfValues);
 * ```
 */
export class LRUSet<T> implements SetLike<T> {
  #cache: Set<T>;
  #capacity: number;

  constructor(maxNumOfValues: number) {
    assertCapacity(maxNumOfValues);

    const capacity = Math.floor(maxNumOfValues);

    this.#capacity = capacity;
    this.#cache = new Set<T>();
  }

  has(value: T): boolean {
    const has = this.#cache.has(value);

    if (has) this.#rollup(value);

    return has;
  }

  add(value: T): this {
    if (!this.#capacity) return this;
    if (this.#cache.has(value)) return this.#rollup(value);
    if (this.#capacity <= this.#cache.size) this.#cache.delete(this.#oldest!);

    this.#cache.add(value);

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

  #rollup(value: T): this {
    this.#cache.delete(value);
    this.#cache.add(value);

    return this;
  }

  get #oldest(): T | undefined {
    return this.#cache.values().next().value;
  }
}
