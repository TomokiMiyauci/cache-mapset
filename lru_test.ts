// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { LRUMap, LRUSet } from "./lru.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  assertThrows,
  describe,
  it,
} from "./_dev_deps.ts";

describe("LRUMap", () => {
  it("size should be 0", () => {
    const cache = new LRUMap(1);

    assertEquals(cache.size, 0);
  });

  it("should rollup cache key with max entries are 1", () => {
    const cache = new LRUMap(1);

    cache.set(0, 0);

    assertEquals(cache.size, 1);
    assert(cache.has(0));
    assertEquals(cache.get(0), 0);

    cache.set(1, 1);

    assertEquals(cache.size, 1);
    assertFalse(cache.has(0));
    assert(cache.has(1));
    assertEquals(cache.get(1), 1);
  });

  it("should rollup cache key with max entries are 2", () => {
    const cache = new LRUMap(2);

    cache.set(0, 0);
    cache.set(1, 0);

    assert(cache.has(0));
    assert(cache.has(1));

    cache.set(2, 0);

    assert(cache.has(1));
    assert(cache.has(2));

    cache.set(3, 0);

    assert(cache.has(2));
    assert(cache.has(3));
  });

  it("should not cache if the max entries is 0", () => {
    const cache = new LRUMap(0);

    cache.set(0, 0);

    assertEquals(cache.size, 0);
    assertFalse(cache.has(0));
  });

  it("should update key", () => {
    const cache = new LRUMap(2);

    cache.set(0, 0);
    cache.set(1, 0);

    cache.set(0, 2);

    assertEquals(cache.size, 2);

    cache.set(2, 2);

    assert(cache.has(0));
    assert(cache.has(2));

    assertEquals(cache.size, 2);
  });

  it("should throw error if max entries is negative", () => {
    assertThrows(() => new LRUMap(-1));
  });

  it("clear should delete all entries", () => {
    const cache = new LRUMap(2);

    cache.set(0, 0);
    cache.set(1, 1);

    assertEquals(cache.size, 2);

    cache.clear();

    assertFalse(cache.has(0));
    assertFalse(cache.has(1));
    assertEquals(cache.size, 0);
  });

  it("delete should delete item and return boolean", () => {
    const cache = new LRUMap(1);

    cache.set(0, 0);

    assert(cache.delete(0));
    assertFalse(cache.has(0));
    assertFalse(cache.delete(0));
  });

  it("should accept initial entries", () => {
    const map = new LRUMap(1, [["a", 0]]);

    assertEquals(map.size, 1);
    assertEquals(map.get("a"), 0);
  });

  it("should evict overflow", () => {
    const map = new LRUMap(2, [["a", 0], ["b", 1], ["c", 2]]);

    assertEquals(map.size, 2);
    assertEquals(map.get("b"), 1);
    assertEquals(map.get("c"), 2);
  });
});

describe("LRUSet", () => {
  it("should rollup value with max entries are 1", () => {
    const cache = new LRUSet(1);

    cache.add(0);

    assertEquals(cache.size, 1);
    assert(cache.has(0));

    cache.add(1);

    assertEquals(cache.size, 1);
    assertFalse(cache.has(0));
    assert(cache.has(1));
  });

  it("should rollup value with max entries are 2", () => {
    const cache = new LRUSet(2);

    cache.add(0);
    cache.add(1);

    assert(cache.has(0));
    assert(cache.has(1));
    assertEquals(cache.size, 2);

    cache.add(2);

    assert(cache.has(1));
    assert(cache.has(2));
    assertEquals(cache.size, 2);

    cache.add(3);

    assert(cache.has(2));
    assert(cache.has(3));
    assertEquals(cache.size, 2);
  });

  it("size should be 0", () => {
    const cache = new LRUSet(1);

    assertEquals(cache.size, 0);
  });

  it("should not cache if the max entries is 0", () => {
    const cache = new LRUSet(0);

    cache.add(0);

    assertEquals(cache.size, 0);
    assertFalse(cache.has(0));
  });

  it("should rollup value", () => {
    const cache = new LRUSet(2);

    cache.add(0);
    cache.add(1);

    assertEquals(cache.size, 2);

    cache.add(0);
    cache.add(2);

    assert(cache.has(0));
    assert(cache.has(2));
  });

  it("delete should delete value and return true", () => {
    const cache = new LRUSet(2);

    cache.add(0);

    assert(cache.has(0));
    assert(cache.delete(0));

    assertEquals(cache.size, 0);
  });

  it("clear should clear all values", () => {
    const cache = new LRUSet(2);

    cache.add(0);
    cache.add(1);

    assertEquals(cache.size, 2);

    cache.clear();

    assertEquals(cache.size, 0);
  });

  it("should throw error if max entries is negative", () => {
    assertThrows(() => new LRUSet(-1));
  });

  it("should accept initial values", () => {
    const map = new LRUSet(2, [0, 1, 2]);

    assertEquals(map.size, 2);
    assert(map.has(1));
    assert(map.has(2));
  });
});
