// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

export interface EmplaceCallbacks<K, V> {
  insert: (key: K) => V;

  update: (existing: V, key: K) => V;
}

export class NextMap<K, V> extends Map<K, V> {
  emplace(key: K, callbacks: EmplaceCallbacks<K, V>): void {
    const value = this.has(key)
      ? callbacks.update(this.get(key)!, key)
      : callbacks.insert(key);
    this.set(key, value);
  }
}
