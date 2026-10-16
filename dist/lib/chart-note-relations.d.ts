import type { ChartData, SideButton } from "./chart-model.js";
export interface SideXTapPair {
    parentId: number;
    airNoteId: number;
    button: SideButton;
}
/** Resolves converter-encoded side X-taps represented by X-tap parents and diagonal AIR children. */
export declare function sideXTapPairs(chart: ChartData): SideXTapPair[];
