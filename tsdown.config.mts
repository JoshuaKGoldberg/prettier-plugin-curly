import { defineConfig } from "tsdown";

export default defineConfig({
	unbundle: true,
	clean: true,
	dts: true,
	entry: ["src/**/*.ts", "!src/**/*.test.*"],
	format: ["cjs", "esm"],
	outDir: "lib",
});
