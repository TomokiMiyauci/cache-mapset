// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { BaseMap, BaseSet } from "./utils.ts";

/** `Map` with an upper limit, objects like. When the upper limit is reached, replaces the entry with FIFO algorithm.
 * @example
 * ```ts
 * import { FIFOMap } from "https://deno.land/x/cache_mapset/fifo.ts";
 *
 * declare const maxNumOfEntries: number;
 * const map = new FIFOMap(maxNumOfEntries);
 * ```
 */
export class FIFOMap<K, V> extends BaseMap<K, V> {
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
 * import { FIFOSet } from "https://deno.land/x/cache_mapset/fifo.ts";
 *
 * declare const maxNumOfValues: number;
 * const set = new FIFOSet(maxNumOfValues);
 * ```
 */
export class FIFOSet<T> extends BaseSet<T> {
  protected cache: FIFOMap<T, void>;

  /**
   * @throws {RangeError} If {@link maxNumOfValues} is invalid range.
   */
  constructor(maxNumOfValues: number, values?: Readonly<Iterable<T>>) {
    super();
    this.cache = new FIFOMap(maxNumOfValues);

    if (values) for (const el of values) this.add(el);
  }
}
