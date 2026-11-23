import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		clearMocks: true,
		coverage: {
			exclude: ["lib"],
			include: ["src"],
			reporter: ["html", "lcov"],
		},
		exclude: ["dist", "node_modules"],
		setupFiles: ["console-fail-test/setup"],
	},
});
