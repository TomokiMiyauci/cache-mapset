// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { assertNonNegativeNumber, EmplaceableMap } from "./deps.ts";
import { Msg } from "./constants.ts";
import { BaseSet } from "./utils.ts";
import type { MapLike } from "./types.ts";

const INIT = 1;

class Container<T> {
  value: T;
  count = INIT;

  constructor(value: T) {
    this.value = value;
  }

  inc(): number {
    return ++this.count;
  }
}

/** `Map` with an upper limit, objects like. When the upper limit is reached, replaces the entry with LFU algorithm.
 * @example
 * ```ts
 * import { LFUMap } from "https://deno.land/x/cache_mapset@$VERSION/lfu.ts";
 *
 * declare const maxNumOfEntries: number;
 * const map = new LFUMap(maxNumOfEntries);
 * ```
 */
export class LFUMap<K, V> implements MapLike<K, V> {
  #values: Map<K, Container<V>> = new Map();
  #frequency: EmplaceableMap<number, Set<K>>;
  #minFrequency = INIT;
  #capacity: number;

  /**
   * @throws {RangeError} If {@link maxNumOfEntries} is invalid range.
   */
  constructor(
    maxNumOfEntries: number,
    entries?: Readonly<Iterable<readonly [K, V]>>,
  ) {
    assertNonNegativeNumber(maxNumOfEntries, Msg.InvalidCapacity, RangeError);

    const capacity = Math.floor(maxNumOfEntries);

    this.#frequency = new EmplaceableMap();
    this.#capacity = capacity;

    if (entries) for (const [key, value] of entries) this.set(key, value);
  }

  has(key: K): boolean {
    return this.#values.has(key);
  }

  get(key: K): V | undefined {
    if (!this.#values.has(key)) return;

    this.#updateFrequency(key);

    return this.#values.get(key)!.value;
  }

  set(key: K, value: V): this {
    if (!this.#capacity) return this;

    if (this.#values.has(key)) {
      const container = this.#values.get(key)!;
      container.value = value;

      this.#updateFrequency(key);

      return this;
    }

    if (this.#values.size >= this.#capacity) {
      this.#evict();
    }

    this.#values.set(key, new Container(value));
    this.#minFrequency = INIT;
    this.#frequency.emplace(this.#minFrequency, {
      insert: () => new Set<K>([key]),
      update: (existing) => existing.add(key),
    });

    return this;
  }

  delete(key: K): boolean {
    if (!this.#values.has(key)) return false;

    const container = this.#values.get(key)!;

    this.#values.delete(key);
    this.#frequency.get(container.count)!.delete(key);

    return true;
  }

  clear(): void {
    this.#values.clear();
    this.#frequency.clear();
    this.#minFrequency = INIT;
  }

  #evict(): void {
    const keys = this.#frequency.get(this.#minFrequency)!;
    const key = keys.keys().next().value;

    keys.delete(key);
    this.#values.delete(key);
  }

  #updateFrequency(key: K): void {
    const container = this.#values.get(key)!;
    const count = container.count;
    const set = this.#frequency.get(count)!;

    container.inc();
    set.delete(key);

    if (!set.size) this.#frequency.delete(count);

    if (count === this.#minFrequency && !set.size) {
      this.#minFrequency++;
    }

    this.#frequency.emplace(count + 1, {
      insert: () => new Set<K>([key]),
      update: (existing) => existing.add(key),
    });
  }

  get size(): number {
    return this.#values.size;
  }
}

/** `Set` with an upper limit, objects like. When the upper limit is reached, replaces the value with LFU algorithm.
 * @example
 * ```ts
 * import { LFUSet } from "https://deno.land/x/cache_mapset@$VERSION/lfu.ts";
 *
 * declare const maxNumOfValues: number;
 * const set = new LFUSet(maxNumOfValues);
 * ```
 */
export class LFUSet<T> extends BaseSet<T> {
  protected cache: LFUMap<T, void>;

  /**
   * @throws {RangeError} If {@link maxNumOfValues} is invalid range.
   */
  constructor(maxNumOfValues: number, values?: Readonly<Iterable<T>>) {
    super();
    this.cache = new LFUMap(maxNumOfValues);

    if (values) for (const el of values) this.add(el);
  }
}
