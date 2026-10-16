import type { Position } from "./chart-model.js";
/** Approximates exact beat positions to bounded precision for Canvas geometry. */
export declare function positionValue(position: Position): number;
export declare function positionFromValue(value: number): Position;
