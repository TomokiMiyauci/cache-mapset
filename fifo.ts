// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { BaseMap, BaseSet } from "./utils.ts";

/** `Map` with an upper limit, objects like. When the upper limit is reached, replaces the entry with FIFO algorithm.
 * @example
 * ```ts
 * import { FIFOMap } from "https://deno.land/x/cache_mapset@$VERSION/fifo.ts";
 *
 * declare const maxNumOfEntries: number;
 * const map = new FIFOMap(maxNumOfEntries);
 * ```
 */
export class FIFOMap<K, V> extends BaseMap<K, V> {
  get(key: K): V | undefined {
    return this.cache.get(key);
  }

  set(key: K, value: V): this {
    if (!this.capacity) return this;
    if (this.cache.has(key)) {
      this.cache.set(key, value);

      return this;
    }
    if (this.capacity <= this.cache.size) this.cache.delete(this.#firstKey!);

    this.cache.set(key, value);

    return this;
  }

  get #firstKey(): K | undefined {
    return this.cache.keys().next().value;
  }
}

/** `Set` with an upper limit, objects like. When the upper limit is reached, replaces the value with FIFO algorithm.
 * @example
 * ```ts
 * import { FIFOSet } from "https://deno.land/x/cache_mapset@$VERSION/fifo.ts";
 *
 * declare const maxNumOfValues: number;
 * const set = new FIFOSet(maxNumOfValues);
 * ```
 */
export class FIFOSet<T> extends BaseSet<T> {
  protected cache: FIFOMap<T, void>;

  constructor(maxNumOfValues: number) {
    super();
    this.cache = new FIFOMap(maxNumOfValues);
  }
}
