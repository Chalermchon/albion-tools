export function convertToTitleCase(text: string, separator = '_', joiner = ' ') {
	if (!separator) {
		return text;
	}
	return text
		.split(separator)
		.map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`)
		.join(joiner);
}
