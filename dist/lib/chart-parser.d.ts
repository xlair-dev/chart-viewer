import type { ChartData, ChartFormat } from "./chart-model.js";
export type ChartMode = "normal" | "xlair";
/** Parses chart bytes using the file format selected by the caller. */
export declare function parseChartBytes(source: Uint8Array, format: ChartFormat, mode?: ChartMode): Promise<ChartData>;
/** Parses a chart file using its extension to select the chart format. */
export declare function parseChartFile(file: File, mode?: ChartMode): Promise<ChartData>;
