import { LRUMap } from "./lru.ts";
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
});
