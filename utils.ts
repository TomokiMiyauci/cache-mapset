// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { MapLike, SetLike } from "./types.ts";
import { assertNonNegativeNumber } from "./deps.ts";
import { Msg } from "./constants.ts";

export abstract class BaseMap<K, V> implements MapLike<K, V> {
  protected readonly cache: Readonly<Map<K, V>>;
  protected readonly capacity: number;

  /**
   * @throws {RangeError} If {@link capacity} is invalid range.
   */
  constructor(capacity: number) {
    if (isNaN(capacity)) throw new RangeError(Msg.InvalidCapacity);

    capacity = toIntegerOrInfinity(capacity);

    assertNonNegativeNumber(capacity, Msg.InvalidCapacity, RangeError);

    this.cache = new Map();
    this.capacity = capacity;
  }

  abstract get(key: K): V | undefined;
  abstract set(key: K, value: V): this;

  has(key: K): boolean {
    return this.cache.has(key);
  }

  delete(key: K): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    return this.cache.clear();
  }

  get size(): number {
    return this.cache.size;
  }
}

/** Returns either a normal completion containing either an integer, `Infinity`, or `-Infinity`.
 * @see https://tc39.es/ecma262/#sec-tointegerorinfinity
 */
export function toIntegerOrInfinity(number: number): number {
  if (isNaN(number) || !number) return 0;

  if (number === Infinity || number === -Infinity) return number;

  return Math.trunc(number);
}

export abstract class BaseSet<T> implements SetLike<T> {
  protected abstract cache: MapLike<T, void>;

  has(value: T): boolean {
    return this.cache.has(value);
  }

  add(value: T): this {
    this.cache.set(value);

    return this;
  }

  delete(value: T): boolean {
    return this.cache.delete(value);
  }

  clear(): void {
    this.cache.clear();
  }

  get size(): number {
    return this.cache.size;
  }
}
