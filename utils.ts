// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isNonNegativeNumber } from "./deps.ts";

export interface EmplaceCallbacks<K, V> {
  /** Add entry. */
  insert: (key: K) => V;

  /** Update the value. */
  update: (existing: V, key: K) => V;
}

export class EmplaceableMap<K, V> extends Map<K, V> {
  /** Add a value to a map if the map does not already have something at {@link key}, and will also update an existing value at {@link key}. */
  emplace(key: K, callbacks: EmplaceCallbacks<K, V>): V {
    const value = this.has(key)
      ? callbacks.update(this.get(key)!, key)
      : callbacks.insert(key);
    this.set(key, value);

    return value;
  }
}

/** Assert capacity is valid. */
export function assertCapacity(capacity: number): asserts capacity {
  if (!isNonNegativeNumber(capacity)) {
    throw RangeError("capacity must be non-negative");
  }
}
