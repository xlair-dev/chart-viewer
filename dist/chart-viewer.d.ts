import { type CSSProperties, type ReactNode } from "react";
import type { ChartData } from "./lib/chart-model.js";
export type ChartViewMode = "sheet" | "playfield" | "both";
export interface ChartSheetOverlayGeometry {
    currentBeat: number;
    endBeat: number;
    positionStyle: (beat: number) => string;
    laneStyle: (lane: number) => string;
    laneTransform: (lane: number) => string;
    formatPosition: (beat: number) => string;
}
/** Returns the final beat used by ChartViewer's rendered chart. */
export declare function chartEndBeat(chart: ChartData): number;
export declare function ChartViewer({ chart, position, onPositionChange, onSheetPositionSelect, noteSpeed, displayNoteSpeed, onNoteSpeedChange, onNoteSpeedCommit, mode, showSeekBar, sheetOverlay, sheetFooter, sidePanel, className, style, }: {
    chart: ChartData;
    position?: number;
    onPositionChange?: (position: number) => void;
    onSheetPositionSelect?: (position: number, lanePosition: number) => void;
    noteSpeed?: number;
    displayNoteSpeed?: string;
    onNoteSpeedChange?: (speed: string) => void;
    onNoteSpeedCommit?: () => void;
    mode?: ChartViewMode;
    showSeekBar?: boolean;
    sheetOverlay?: (geometry: ChartSheetOverlayGeometry) => ReactNode;
    sheetFooter?: ReactNode | ((geometry: ChartSheetOverlayGeometry) => ReactNode);
    sidePanel?: ReactNode | ((geometry: ChartSheetOverlayGeometry) => ReactNode);
    className?: string;
    style?: CSSProperties;
}): import("react").JSX.Element;
