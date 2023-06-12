// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { EmplaceableMap } from "./utils.ts";
import {
  assertEquals,
  assertSpyCalls,
  describe,
  it,
  spy,
} from "./_dev_deps.ts";

describe("EmplaceableMap", () => {
  it("should call insert if the key is not exist", () => {
    const map = new EmplaceableMap();

    const insert = spy(() => "b");
    const update = spy(() => "c");

    assertEquals(map.emplace("a", { insert, update }), "b");
    assertSpyCalls(insert, 1);
    assertSpyCalls(update, 0);
  });

  it("should call update if the key is exist", () => {
    const map = new EmplaceableMap([["a", "a"]]);

    const insert = spy(() => "b");
    const update = spy(() => "c");

    assertEquals(map.emplace("a", { insert, update }), "c");
    assertSpyCalls(insert, 0);
    assertSpyCalls(update, 1);
  });
});
