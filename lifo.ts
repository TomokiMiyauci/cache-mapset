// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { BaseMap, BaseSet } from "./utils.ts";

/** `Map` with an upper limit, objects like. When the upper limit is reached, replaces the entry with LIFO algorithm.
 * @example
 * ```ts
 * import { LIFOMap } from "https://deno.land/x/cache_mapset@$VERSION/lifo.ts";
 *
 * declare const maxNumOfEntries: number;
 * const map = new LIFOMap(maxNumOfEntries);
 * ```
 */
export class LIFOMap<K, V> extends BaseMap<K, V> {
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
    return this.cache.get(key);
  }

  set(key: K, value: V): this {
    if (!this.capacity) return this;
    if (this.cache.has(key)) {
      this.cache.set(key, value);

      return this;
    }
    if (this.capacity <= this.cache.size) {
      this.cache.delete(this.#latestKey!);
    }

    this.cache.set(key, value);

    return this;
  }

  get #latestKey(): K | undefined {
    return [...this.cache.keys()].pop();
  }
}

/** `Set` with an upper limit, objects like. When the upper limit is reached, replaces the value with LIFO algorithm.
 * @example
 * ```ts
 * import { LIFOSet } from "https://deno.land/x/cache_mapset@$VERSION/lifo.ts";
 *
 * declare const maxNumOfValues: number;
 * const set = new LIFOSet(maxNumOfValues);
 * ```
 */
export class LIFOSet<T> extends BaseSet<T> {
  protected cache: LIFOMap<T, void>;
  constructor(maxNumOfValues: number) {
    super();
    this.cache = new LIFOMap(maxNumOfValues);
  }
}
