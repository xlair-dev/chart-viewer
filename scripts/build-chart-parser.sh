#!/usr/bin/env sh
set -eu

repo_root=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
wasm-pack build "$repo_root/wasm/chart-parser" --target web --release --out-dir "$repo_root/wasm/pkg"
rm -f "$repo_root/wasm/pkg/.gitignore"
