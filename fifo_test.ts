// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.

import { FIFOMap, FIFOSet } from "./fifo.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  assertThrows,
  describe,
  it,
} from "./_dev_deps.ts";

describe("FIFOMap", () => {
  it("size should be 0", () => {
    const cache = new FIFOMap(1);

    assertEquals(cache.size, 0);
  });

  it("should rollup cache key with max entries are 1", () => {
    const cache = new FIFOMap(1);

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
    const cache = new FIFOMap(2);

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
    const cache = new FIFOMap(0);

    cache.set(0, 0);

    assertEquals(cache.size, 0);
    assertFalse(cache.has(0));
  });

  it("should update key", () => {
    const cache = new FIFOMap(2);

    cache.set(0, 0);
    cache.set(1, 1);

    assertEquals(cache.size, 2);

    cache.set(0, 2);
    assertEquals(cache.get(0), 2);

    cache.set(2, 2);

    assert(cache.has(1));
    assert(cache.has(2));

    assertEquals(cache.size, 2);
  });

  it("should throw error if max entries is negative", () => {
    assertThrows(() => new FIFOMap(-1));
  });

  it("clear should delete all entries", () => {
    const cache = new FIFOMap(2);

    cache.set(0, 0);
    cache.set(1, 1);

    assertEquals(cache.size, 2);

    cache.clear();

    assertFalse(cache.has(0));
    assertFalse(cache.has(1));
    assertEquals(cache.size, 0);
  });

  it("delete should delete item and return boolean", () => {
    const cache = new FIFOMap(1);

    cache.set(0, 0);

    assert(cache.delete(0));
    assertFalse(cache.has(0));
    assertFalse(cache.delete(0));
  });

  it("should accept initial entries", () => {
    const map = new FIFOMap(1, [["a", 0]]);

    assertEquals(map.size, 1);
    assertEquals(map.get("a"), 0);
  });

  it("should evict overflow", () => {
    const map = new FIFOMap(2, [["a", 0], ["b", 1], ["c", 2]]);

    assertEquals(map.size, 2);
    assertEquals(map.get("b"), 1);
    assertEquals(map.get("c"), 2);
  });
});

describe("FIFOSet", () => {
  it("should rollup value with max entries are 1", () => {
    const cache = new FIFOSet(1);

    cache.add(0);

    assertEquals(cache.size, 1);
    assert(cache.has(0));

    cache.add(1);

    assertEquals(cache.size, 1);
    assertFalse(cache.has(0));
    assert(cache.has(1));
  });

  it("should rollup value with max entries are 2", () => {
    const cache = new FIFOSet(2);

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
    const cache = new FIFOSet(1);

    assertEquals(cache.size, 0);
  });

  it("should not cache if the max entries is 0", () => {
    const cache = new FIFOSet(0);

    cache.add(0);

    assertEquals(cache.size, 0);
    assertFalse(cache.has(0));
  });

  it("should not do anything if it is already exist", () => {
    const cache = new FIFOSet(2);

    cache.add(0);
    cache.add(1);

    assertEquals(cache.size, 2);

    cache.add(0);
    cache.add(2);

    assert(cache.has(1));
    assert(cache.has(2));
  });

  it("delete should delete value and return true", () => {
    const cache = new FIFOSet(2);

    cache.add(0);

    assert(cache.has(0));
    assert(cache.delete(0));

    assertEquals(cache.size, 0);
  });

  it("clear should clear all values", () => {
    const cache = new FIFOSet(2);

    cache.add(0);
    cache.add(1);

    assertEquals(cache.size, 2);

    cache.clear();

    assertEquals(cache.size, 0);
  });

  it("should throw error if max entries is negative", () => {
    assertThrows(() => new FIFOSet(-1));
  });

  it("should accept initial values", () => {
    const map = new FIFOSet(2, [0, 1, 2]);

    assertEquals(map.size, 2);
    assert(map.has(1));
    assert(map.has(2));
  });
});
