let chartParser;
function loadChartParser() {
    if (!chartParser) {
        chartParser = import("../wasm/chart_viewer_parser.js")
            .then(async (module) => {
            await module.default();
            return module;
        })
            .catch((error) => {
            chartParser = undefined;
            throw error;
        });
    }
    return chartParser;
}
function chartFormat(file) {
    const extension = file.name.split(".").at(-1)?.toLowerCase();
    if (extension === "c2s" || extension === "sus" || extension === "ugc") {
        return extension;
    }
    throw new Error("C2S、SUS、UGC 形式の譜面を選んでください。");
}
/** Parses chart bytes using the file format selected by the caller. */
export async function parseChartBytes(source, format, mode = "xlair") {
    const module = await loadChartParser();
    return JSON.parse(module.parse_chart_json(format, mode, source));
}
/** Parses a chart file using its extension to select the chart format. */
export async function parseChartFile(file, mode = "xlair") {
    return parseChartBytes(new Uint8Array(await file.arrayBuffer()), chartFormat(file), mode);
}
