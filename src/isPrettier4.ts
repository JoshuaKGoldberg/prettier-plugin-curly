export function isPrettier4(options: unknown) {
	return (
		isObjectWith(options, "printer") &&
		isObjectWith(options.printer, "features") &&
		isObjectWith(options.printer.features, "experimental_frontMatterSupport")
	);
}

function isObjectWith<Key extends string>(
	container: unknown,
	key: Key,
): container is Record<Key, unknown> & Record<string, unknown> {
	return (
		typeof container === "object" && container !== null && key in container
	);
}
