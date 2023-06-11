// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

export interface MapLike<K, V> {
  size: number;

  has: (key: K) => boolean;

  get: (key: K) => V | undefined;

  set: (key: K, value: V) => this;

  delete: (key: K) => boolean;

  clear: () => void;
}
