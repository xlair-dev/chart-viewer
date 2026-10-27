import { spawnSync } from "node:child_process";
import { cp, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";

await rm(new URL("../dist/", import.meta.url), {
	recursive: true,
	force: true,
});

await rm(new URL("../src/wasm/", import.meta.url), {
	recursive: true,
	force: true,
});
await cp(
	new URL("../wasm/pkg/", import.meta.url),
	new URL("../src/wasm/", import.meta.url),
	{
		recursive: true,
	},
);

const result = spawnSync(
	process.execPath,
	[
		fileURLToPath(
			new URL("../node_modules/typescript/bin/tsc", import.meta.url),
		),
		"-p",
		fileURLToPath(new URL("../tsconfig.json", import.meta.url)),
	],
	{ stdio: "inherit" },
);

if (result.error) throw result.error;
if (result.status !== 0) {
	process.exitCode = result.status ?? 1;
} else {
	await cp(
		new URL("../src/chart-viewer.css", import.meta.url),
		new URL("../dist/chart-viewer.css", import.meta.url),
	);
	await cp(
		new URL("../wasm/pkg/", import.meta.url),
		new URL("../dist/wasm/", import.meta.url),
		{ recursive: true },
	);
}
