import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
	audioSecondsAtBeat,
	positionAtAudioSeconds,
} from "../dist/lib/chart-timing.js";
import init, { parse_chart_json } from "../dist/wasm/chart_viewer_parser.js";

await init({
	module_or_path: await readFile(
		new URL("../dist/wasm/chart_viewer_parser_bg.wasm", import.meta.url),
	),
});

function parse(source, format, mode) {
	return JSON.parse(
		parse_chart_json(format, mode, new TextEncoder().encode(source)),
	);
}

for (const mode of ["normal", "xlair"]) {
	for (const offset of [-0.5, 0, 1.25]) {
		test(`${mode}: UGC BGMOFS ${offset} reaches audio timing`, () => {
			const chart = parse(
				`@MAINBPM\t120\n@BGMOFS\t${offset}\n@ENDHEAD\n#0'480:t04\n`,
				"ugc",
				mode,
			);
			assert.equal(chart.audioOffsetSeconds, offset);
			assert.deepEqual(chart.notes[0].position, {
				numerator: "1",
				denominator: "1",
			});
			assert.equal(audioSecondsAtBeat(chart, 4), 2 - offset);
			assert.equal(positionAtAudioSeconds(chart, 2 - offset), 4);
		});
	}

	test(`${mode}: missing UGC BGMOFS leaves timing unchanged`, () => {
		const chart = parse("@MAINBPM\t120\n@ENDHEAD\n", "ugc", mode);
		assert.equal(chart.audioOffsetSeconds, null);
		assert.equal(audioSecondsAtBeat(chart, 4), 2);
	});

	for (const invalid of ["NaN", "inf", "-inf"]) {
		test(`${mode}: UGC rejects non-finite BGMOFS ${invalid}`, () => {
			assert.throws(() =>
				parse(`@BGMOFS\t${invalid}\n@ENDHEAD\n`, "ugc", mode),
			);
		});
	}

	test(`${mode}: SUS WAVEOFFSET keeps the same audio sign convention`, () => {
		const chart = parse(
			"#BASEBPM 120\n#WAVEOFFSET 1.25\n#00010:14\n",
			"sus",
			mode,
		);
		assert.equal(chart.audioOffsetSeconds, 1.25);
		assert.equal(audioSecondsAtBeat(chart, 4), 0.75);
	});
}

test("UGC BGMOFS preserves main and explicit zero timelines", () => {
	const chart = parse(
		"@MAINBPM\t120\n@BGMOFS\t0.25\n@MAINTIL\t2\n@ENDHEAD\n#0'480:t04\n@USETIL\t0\n#0'960:t84\n",
		"ugc",
		"xlair",
	);
	assert.equal(chart.audioOffsetSeconds, 0.25);
	assert.equal(chart.mainSpeedGroup, 2);
	assert.deepEqual(
		chart.notes.map((note) => note.speedGroup),
		[2, 0],
	);
});

test("UGC speed fields stay aligned with notes in variable meters", () => {
	const chart = parse(
		"@MAINBPM\t120\n@TICKS\t960\n@BEAT\t0\t3\t4\n@FLAG\tSOFFSET\tTRUE\n@BGMOFS\t0.25\n@SPDDEF\t1\t0\t0.5\n@SPDFLD\t1\t0'960\t0\t4\t960\n@ENDHEAD\n#0'960:t04\n",
		"ugc",
		"xlair",
	);
	const field = chart.scrollSpeedChanges.find(
		(change) => change.scope.type === "lane",
	);
	assert.ok(field);
	assert.equal(chart.audioOffsetSeconds, 0.25);
	assert.deepEqual(chart.notes[0].position, {
		numerator: "4",
		denominator: "1",
	});
	assert.deepEqual(field.position, chart.notes[0].position);
	assert.deepEqual(field.duration, { numerator: "1", denominator: "1" });
	assert.equal(audioSecondsAtBeat(chart, 4), 1.75);
});
