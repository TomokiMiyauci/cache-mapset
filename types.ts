// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

/** `Map` without `Iterator` and its related members. */
export interface MapLike<K, V> {
  /** The number of entries. */
  size: number;

  /** Whether has an entry with the given {@link key}. */
  has: (key: K) => boolean;

  /** Returns the value of the entry with the given {@link key}, if any such entry exists; otherwise returns `undefined`. */
  get: (key: K) => V | undefined;

  /** Adds an entry with the given {@link key} mapped to the given {@link value}. */
  set: (key: K, value: V) => this;

  /** Deletes the entry with the given {@link key}. */
  delete: (key: K) => boolean;

  /** Removes all entries. */
  clear: () => void;
}

/** `Set` without `Iterator` and its related members. */
export interface SetLike<T> {
  /** The number of values. */
  size: number;

  /** Whether has the given {@link value}. */
  has: (value: T) => boolean;

  /** Adds the given {@link value}. */
  add: (value: T) => this;

  /** Deletes the given {@link value}. */
  delete: (value: T) => boolean;

  /** Removes all values. */
  clear: () => void;
}
