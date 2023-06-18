// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

/** A `Map` or `Set` like constructor with a cache replacement policy.
 * It is implementation for TC39 [proposal-policy-map-set](https://github.com/tc39/proposal-policy-map-set).
 *
 * @module
 */

export { FIFOMap, FIFOSet } from "./fifo.ts";
export { LIFOMap, LIFOSet } from "./lifo.ts";
export { LRUMap, LRUSet } from "./lru.ts";
export { LFUMap, LFUSet } from "./lfu.ts";
export type { MapLike, SetLike } from "./types.ts";
