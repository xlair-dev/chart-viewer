#!/usr/bin/env sh
set -eu

repo_root=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
cargo_home=${CARGO_HOME:-"$HOME/.cargo"}
export RUSTFLAGS="${RUSTFLAGS:+$RUSTFLAGS }--remap-path-prefix=$repo_root=/workspace --remap-path-prefix=$cargo_home=/cargo"
wasm-pack build "$repo_root/wasm/chart-parser" --target web --release --out-dir "$repo_root/wasm/pkg"
rm -f "$repo_root/wasm/pkg/.gitignore"
