// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { BaseMap, BaseSet } from "./utils.ts";

/** `Map` with an upper limit, objects like. When the upper limit is reached, replaces the entry with LRU algorithm.
 * @example
 * ```ts
 * import { LRUMap } from "https://deno.land/x/cache_mapset/lru.ts";
 *
 * declare const maxNumOfEntries: number;
 * const map = new LRUMap(maxNumOfEntries);
 * ```
 */
export class LRUMap<K, V> extends BaseMap<K, V> {
  /**
   * @throws {RangeError} If {@link maxNumOfEntries} is invalid range.
   */
  constructor(
    maxNumOfEntries: number,
    entries?: Readonly<Iterable<readonly [K, V]>>,
  ) {
    super(maxNumOfEntries);

    if (entries) for (const [key, value] of entries) this.set(key, value);
  }

  get(key: K): V | undefined {
    const has = this.cache.has(key);
    const value = this.cache.get(key);

    if (has) this.#rollup(key, value!);

    return value;
  }

  set(key: K, value: V): this {
    if (!this.capacity) return this;
    if (this.cache.has(key)) return this.#rollup(key, value);
    if (this.capacity <= this.cache.size) this.cache.delete(this.#oldestKey!);

    this.cache.set(key, value);

    return this;
  }

  get #oldestKey(): K | undefined {
    return this.cache.keys().next().value;
  }

  #rollup(key: K, value: V): this {
    this.cache.delete(key);
    this.cache.set(key, value);

    return this;
  }
}

/** `Set` with an upper limit, objects like. When the upper limit is reached, replaces the value with LRU algorithm.
 * @example
 * ```ts
 * import { LRUSet } from "https://deno.land/x/cache_mapset/lru.ts";
 *
 * declare const maxNumOfValues: number;
 * const set = new LRUSet(maxNumOfValues);
 * ```
 */
export class LRUSet<T> extends BaseSet<T> {
  protected cache: LRUMap<T, void>;

  /**
   * @throws {RangeError} If {@link maxNumOfValues} is invalid range.
   */
  constructor(maxNumOfValues: number, values?: Readonly<Iterable<T>>) {
    super();
    this.cache = new LRUMap(maxNumOfValues);

    if (values) for (const el of values) this.add(el);
  }
}
