export const normalizeRichTextColors = (html: string) =>
	html.replaceAll(/hsl\(var\((--[A-Za-z0-9-]+)\)\)/g, "var($1)");
