// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { MapLike, SetLike } from "./types.ts";
import { assertNonNegativeNumber } from "./deps.ts";
import { Msg } from "./constants.ts";

export abstract class BaseMap<K, V> implements MapLike<K, V> {
  protected readonly cache: Readonly<Map<K, V>>;
  protected readonly capacity: number;

  constructor(maxNumOfValues: number) {
    assertNonNegativeNumber(maxNumOfValues, Msg.InvalidCapacity, RangeError);

    const capacity = Math.floor(maxNumOfValues);

    this.capacity = capacity;
    this.cache = new Map();
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
