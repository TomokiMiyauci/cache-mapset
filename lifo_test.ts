// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { LIFOMap, LIFOSet } from "./lifo.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  assertThrows,
  describe,
  it,
} from "./_dev_deps.ts";

describe("LIFOMap", () => {
  it("size should be 0", () => {
    const cache = new LIFOMap(1);

    assertEquals(cache.size, 0);
  });

  it("should rollup cache key with max entries are 1", () => {
    const cache = new LIFOMap(1);

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
    const cache = new LIFOMap(2);

    cache.set(0, 0);
    cache.set(1, 0);

    assert(cache.has(0));
    assert(cache.has(1));

    cache.set(2, 0);

    assert(cache.has(0));
    assert(cache.has(2));

    cache.set(3, 0);

    assert(cache.has(0));
    assert(cache.has(3));
  });

  it("should not cache if the max entries is 0", () => {
    const cache = new LIFOMap(0);

    cache.set(0, 0);

    assertEquals(cache.size, 0);
    assertFalse(cache.has(0));
  });

  it("should update key", () => {
    const cache = new LIFOMap(2);

    cache.set(0, 0);
    cache.set(1, 1);

    assertEquals(cache.size, 2);

    cache.set(0, 2);
    assertEquals(cache.get(0), 2);

    cache.set(2, 2);

    assert(cache.has(0));
    assert(cache.has(2));

    assertEquals(cache.size, 2);
  });

  it("should throw error if max entries is negative", () => {
    assertThrows(() => new LIFOMap(-1));
  });

  it("clear should delete all entries", () => {
    const cache = new LIFOMap(2);

    cache.set(0, 0);
    cache.set(1, 1);

    assertEquals(cache.size, 2);

    cache.clear();

    assertFalse(cache.has(0));
    assertFalse(cache.has(1));
    assertEquals(cache.size, 0);
  });

  it("delete should delete item and return boolean", () => {
    const cache = new LIFOMap(1);

    cache.set(0, 0);

    assert(cache.delete(0));
    assertFalse(cache.has(0));
    assertFalse(cache.delete(0));
  });
});

describe("LIFOSet", () => {
  it("should rollup value with max entries are 1", () => {
    const cache = new LIFOSet(1);

    cache.add(0);

    assertEquals(cache.size, 1);
    assert(cache.has(0));

    cache.add(1);

    assertEquals(cache.size, 1);
    assertFalse(cache.has(0));
    assert(cache.has(1));
  });

  it("should rollup value with max entries are 2", () => {
    const cache = new LIFOSet(2);

    cache.add(0);
    cache.add(1);

    assert(cache.has(0));
    assert(cache.has(1));
    assertEquals(cache.size, 2);

    cache.add(2);

    assert(cache.has(0));
    assert(cache.has(2));
    assertEquals(cache.size, 2);

    cache.add(3);

    assert(cache.has(0));
    assert(cache.has(3));
    assertEquals(cache.size, 2);
  });

  it("size should be 0", () => {
    const cache = new LIFOSet(1);

    assertEquals(cache.size, 0);
  });

  it("should not cache if the max entries is 0", () => {
    const cache = new LIFOSet(0);

    cache.add(0);

    assertEquals(cache.size, 0);
    assertFalse(cache.has(0));
  });

  it("should not do anything if it is already exist", () => {
    const cache = new LIFOSet(2);

    cache.add(0);
    cache.add(1);

    assertEquals(cache.size, 2);

    cache.add(0);
    cache.add(2);

    assert(cache.has(0));
    assert(cache.has(2));
  });

  it("delete should delete value and return true", () => {
    const cache = new LIFOSet(2);

    cache.add(0);

    assert(cache.has(0));
    assert(cache.delete(0));

    assertEquals(cache.size, 0);
  });

  it("should return false if the key is not exist", () => {
    const cache = new LIFOSet(0);

    assertFalse(cache.delete(0));
  });

  it("clear should clear all values", () => {
    const cache = new LIFOSet(2);

    cache.add(0);
    cache.add(1);

    assertEquals(cache.size, 2);

    cache.clear();

    assertEquals(cache.size, 0);
  });

  it("should throw error if max entries is negative", () => {
    assertThrows(() => new LIFOSet(-1));
  });
});
