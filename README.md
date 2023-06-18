# cache-mapset

[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno)](https://deno.land/x/cache_mapset)
[![deno doc](https://doc.deno.land/badge.svg)](https://deno.land/x/cache_mapset?doc)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/TomokiMiyauci/cache-mapset)](https://github.com/TomokiMiyauci/cache-mapset/releases)
[![codecov](https://codecov.io/github/TomokiMiyauci/cache-mapset/branch/main/graph/badge.svg)](https://codecov.io/gh/TomokiMiyauci/cache-mapset)
[![License](https://img.shields.io/github/license/TomokiMiyauci/cache-mapset)](LICENSE)

[![test](https://github.com/TomokiMiyauci/cache-mapset/actions/workflows/test.yaml/badge.svg)](https://github.com/TomokiMiyauci/cache-mapset/actions/workflows/test.yaml)
[![NPM](https://nodei.co/npm/cache-mapset.png?mini=true)](https://nodei.co/npm/cache-mapset/)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg)](https://github.com/RichardLitt/standard-readme)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

Maps and Sets with cache replacement policies, TC39
[proposal-policy-map-set](https://github.com/tc39/proposal-policy-map-set)
implementation. This can be used as a cache for TC39
[proposal-function-memo](https://github.com/tc39/proposal-function-memo) and its
[implementation](https://github.com/TomokiMiyauci/memo).

## Usage

All Map-like constructors specify capacity.

When the limit is reached, the cache is adjusted according to the cache
replacement policy.

```ts
import { LRUMap } from "https://deno.land/x/cache_mapset@$VERSION/mod.ts";
import { assert, assertEquals } from "https://deno.land/std/testing/asserts.ts";

declare const capacity: 2;

const map = new LRUMap<number, string>(capacity);

map.set(200, "Ok");
map.set(201, "Created");

assertEquals(map.size, 2);

map.set(202, "Accepted");

assertEquals(map.size, 2);
assert(map.has(201));
assert(map.has(202));
```

It provides a Map-like constructor with the following cache-replacement-policy:

- [FIFO](https://en.wikipedia.org/wiki/FIFO_(computing_and_electronics))
- [LIFO](https://en.wikipedia.org/wiki/LIFO)
- [LRU](https://en.wikipedia.org/wiki/Cache_replacement_policies#LRU)
- [LFU](https://en.wikipedia.org/wiki/Least_frequently_used)

### Set like

`SetLike` is a set-like constructor, with the same cache-replacement-policy.

`LFUSet` preferentially removes item with fewer references (by `has` or `add`).

```ts
import { LFUSet } from "https://deno.land/x/cache_mapset@$VERSION/mod.ts";
import { assert, assertEquals } from "https://deno.land/std/testing/asserts.ts";

declare const capacity: 2;

const set = new LFUSet<number>(capacity);

set.add(200);
set.add(201);

assertEquals(set.size, 2);
assert(set.has(200));

set.add(202);

assert(set.has(200));
assert(set.has(202));
```

### Initial value

Accepts an initial value, like `Map` or `Set`. If overcapacity occurs, the cache
is adjusted according to the policy.

```ts
import { FIFOSet } from "https://deno.land/x/cache_mapset@$VERSION/mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

const set = new FIFOSet<number>(3, [0, 1, 2, 3, 4, 5]);
assertEquals(set.size, 3);
```

### Errors

All constructors specify a capacity as their first argument.

If it is a negative number, an error is thrown.

```ts
import { FIFOMap } from "https://deno.land/x/cache_mapset@$VERSION/mod.ts";
import { assertThrows } from "https://deno.land/std/testing/asserts.ts";

assertThrows(() => new FIFOMap(-1));
```

### Difference from Map and Set

`MapLike` and `SetLike` are not `Iterable`.

The following members are not implemented.

- `Symbol.iterator`
- `forEach`
- `entries`
- `keys`
- `values`

Currently, these are outside the scope of the specification. For more
information, check
[Data iteration and order](https://github.com/tc39/proposal-policy-map-set/issues/3).

## API

See [deno doc](https://deno.land/x/cache_mapset?doc) for all APIs.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT](LICENSE) © 2023 Tomoki Miyauchi
