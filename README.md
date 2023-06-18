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

### FIFO

FIFO(First In, First Out) implementations.

#### FIFOMap

When the upper limit is reached, replaces the entry with FIFO algorithm.

```ts
import { FIFOMap } from "https://deno.land/x/cache_mapset@$VERSION/mod.ts";

declare const maxNumOfEntries: number;
const map = new FIFOMap(maxNumOfEntries);
```

#### FIFOSet

When the upper limit is reached, replaces the value with FIFO algorithm.

```ts
import { FIFOSet } from "https://deno.land/x/cache_mapset@$VERSION/mod.ts";

declare const maxNumOfValues: number;
const set = new FIFOSet(maxNumOfValues);
```

### LIFO

LIFO(Last In, First Out) implementations.

#### LIFOMap

When the upper limit is reached, replaces the entry with LIFO algorithm.

```ts
import { LIFOMap } from "https://deno.land/x/cache_mapset@$VERSION/mod.ts";

declare const maxNumOfEntries: number;
const map = new LIFOMap(maxNumOfEntries);
```

#### LIFOSet

When the upper limit is reached, replaces the value with LIFO algorithm.

```ts
import { LIFOSet } from "https://deno.land/x/cache_mapset@$VERSION/mod.ts";

declare const maxNumOfValues: number;
const set = new LIFOSet(maxNumOfValues);
```

### LRU

LRU(Least Recently Used) implementations.

#### LRUMap

When the upper limit is reached, replaces the entry with LRU algorithm.

```ts
import { LRUMap } from "https://deno.land/x/cache_mapset@$VERSION/mod.ts";

declare const maxNumOfEntries: number;
const map = new LRUMap(maxNumOfEntries);
```

#### LRUSet

When the upper limit is reached, replaces the value with LRU algorithm.

```ts
import { LRUSet } from "https://deno.land/x/cache_mapset@$VERSION/mod.ts";

declare const maxNumOfValues: number;
const set = new LRUSet(maxNumOfValues);
```

### LFU

LFU(Least Frequently Used) implementations.

#### LFUMap

When the upper limit is reached, replaces the entry with LFU algorithm.

```ts
import { LFUMap } from "https://deno.land/x/cache_mapset@$VERSION/mod.ts";

declare const maxNumOfEntries: number;
const map = new LFUMap(maxNumOfEntries);
```

#### LFUSet

When the upper limit is reached, replaces the value with LFU algorithm.

```ts
import { LFUSet } from "https://deno.land/x/cache_mapset@$VERSION/mod.ts";

declare const maxNumOfValues: number;
const set = new LFUSet(maxNumOfValues);
```

## Common

List items common to all implementations.

### Interface

All instance have following members.

MapLike:

```ts
interface MapLike<K, V> {
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
```

SetLike:

```ts
interface SetLike<T> {
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
```

### Throwing error

All constructors specify a capacity as their first argument.

If it is a negative number, an error is thrown.

```ts
import { FIFOMap } from "https://deno.land/x/cache_mapset@$VERSION/mod.ts";
import { assertThrows } from "https://deno.land/std/testing/asserts.ts";

assertThrows(() => new FIFOMap(-1));
```

## API

See [deno doc](https://deno.land/x/cache_mapset?doc) for all APIs.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT](LICENSE) © 2023 Tomoki Miyauchi
