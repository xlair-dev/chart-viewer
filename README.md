# `@xlair-dev/chart-viewer`

A reusable React chart viewer for `xlair-dev/chart-review` and `xlair-dev/dashboard`.

The package is under development. Supported chart formats and the public API will be documented as they are implemented.

## Viewer

`ChartViewer` displays the sheet, the simplified playfield, or both. The caller owns playback and can pass the current beat as `position`; omitting `position` lets the sheet view keep a local position. The sheet's seek control is hidden by default so hosts can supply their own playback UI.

```tsx
import { ChartViewer, type ChartData } from "@xlair-dev/chart-viewer";
import "@xlair-dev/chart-viewer/style.css";

export function Preview({ chart, position, onPositionChange }: { chart: ChartData; position: number; onPositionChange: (beat: number) => void }) {
	return <ChartViewer chart={chart} mode="both" position={position} onPositionChange={onPositionChange} />;
}
```

The package uses BPM changes to map chart beats to audio time. Visual travel uses the chart's scroll-speed changes independently, so BPM fluctuations do not change note travel speed. Sheet overlays are provided by the host through `sheetOverlay`.

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
