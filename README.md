# `@xlair-dev/chart-viewer`

A reusable React chart viewer for `xlair-dev/chart-review` and `xlair-dev/dashboard`.

The package is under development. Supported chart formats and the public API will be documented as they are implemented.

## Install from GitHub

```sh
pnpm add github:xlair-dev/chart-viewer#<tag>
```

The generated `dist` files are committed so consumers can install a tagged Git dependency without running package build scripts.

## Development

```sh
pnpm install --frozen-lockfile
pnpm lint
pnpm build
```

The parser build requires the Rust `wasm32-unknown-unknown` target and `wasm-pack` 0.15.0. `pnpm build` rebuilds the parser and packages its generated WebAssembly files with the TypeScript output.
