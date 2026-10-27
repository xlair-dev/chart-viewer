import type { ChartData } from "./chart-model.js";
export declare function supportsChartTiming(chart: ChartData): boolean;
export declare function secondsAtBeat(chart: ChartData, beat: number): number;
export declare function positionAtSeconds(chart: ChartData, seconds: number): number;
/** Maps chart time to audio time using the SUS sign convention. */
export declare function audioSecondsAtBeat(chart: ChartData, beat: number): number;
/** Maps audio file time to chart time using the SUS sign convention. */
export declare function positionAtAudioSeconds(chart: ChartData, seconds: number): number;
