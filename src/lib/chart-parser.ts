import type { ChartData, ChartFormat } from "./chart-model.js";

interface ChartParserModule {
	default: () => Promise<unknown>;
	parse_chart_json: (
		format: string,
		mode: ChartMode,
		source: Uint8Array,
	) => string;
}

export type ChartMode = "normal" | "xlair";

let chartParser: Promise<ChartParserModule> | undefined;

function loadChartParser(): Promise<ChartParserModule> {
	if (!chartParser) {
		chartParser = import("../wasm/chart_viewer_parser.js")
			.then(async (module: ChartParserModule) => {
				await module.default();
				return module;
			})
			.catch((error: unknown) => {
				chartParser = undefined;
				throw error;
			});
	}

	return chartParser;
}

function chartFormat(file: File): ChartFormat {
	const extension = file.name.split(".").at(-1)?.toLowerCase();
	if (extension === "c2s" || extension === "sus" || extension === "ugc") {
		return extension;
	}

	throw new Error("C2S、SUS、UGC 形式の譜面を選んでください。");
}

/** Parses chart bytes using the file format selected by the caller. */
export async function parseChartBytes(
	source: Uint8Array,
	format: ChartFormat,
	mode: ChartMode = "xlair",
): Promise<ChartData> {
	const module = await loadChartParser();
	return JSON.parse(module.parse_chart_json(format, mode, source)) as ChartData;
}

/** Parses a chart file using its extension to select the chart format. */
export async function parseChartFile(
	file: File,
	mode: ChartMode = "xlair",
): Promise<ChartData> {
	return parseChartBytes(
		new Uint8Array(await file.arrayBuffer()),
		chartFormat(file),
		mode,
	);
}
