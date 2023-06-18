import { BuildOptions } from "https://deno.land/x/dnt@0.37.0/mod.ts";

export const makeOptions = (version: string): BuildOptions => ({
  test: false,
  shims: {},
  typeCheck: "both",
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  package: {
    name: "cache-mapset",
    version,
    description:
      "Maps and Sets with cache replacement policies, TC39 proposal-policy-map-set implementation",
    keywords: [
      "cache",
      "map",
      "set",
      "map-like",
      "set-like",
      "lru",
      "lfu",
      "fifo",
      "tc39",
      "proposal-policy-map-set",
    ],
    license: "MIT",
    homepage: "https://github.com/TomokiMiyauci/cache-mapset",
    repository: {
      type: "git",
      url: "git+https://github.com/TomokiMiyauci/cache-mapset.git",
    },
    bugs: {
      url: "https://github.com/TomokiMiyauci/cache-mapset/issues",
    },
    sideEffects: false,
    type: "module",
  },
  packageManager: "pnpm",
  mappings: {
    "https://deno.land/x/assertion@1.0.0/number/assert_non_negative_number.ts":
      {
        name: "@miyauci/assertion",
        version: "1.0.0",
        subPath: "number/assert_non_negative_number.js",
      },
    "https://deno.land/x/upsert@1.1.0/mod.ts": {
      name: "@miyauci/upsert",
      version: "1.1.0",
    },
  },
});
