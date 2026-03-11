export const TAG_COLORS = [
	{ name: "red",    bg: "color-mix(in srgb, #ff4b4b 15%, #ffffff)", text: "#c92a2a" },
	{ name: "blue",   bg: "color-mix(in srgb, #22b8cf 15%, #ffffff)", text: "#0b7285" },
	{ name: "purple", bg: "color-mix(in srgb, #845ef7 15%, #ffffff)", text: "#5f3dc4" },
	{ name: "orange", bg: "color-mix(in srgb, #ff922b 15%, #ffffff)", text: "#d9480f" },
	{ name: "green",  bg: "color-mix(in srgb, #94d82d 15%, #ffffff)", text: "#5c940d" },
	{ name: "pink",   bg: "color-mix(in srgb, #f06595 15%, #ffffff)", text: "#a61e4d" },
];

export function applyRandomTagColors(
	selector: string,
	colors: { bg: string; text: string }[] = TAG_COLORS,
	root: Element | Document = document,
): void {
	root.querySelectorAll<HTMLElement>(selector).forEach((tag) => {
		const randomColor = colors[Math.floor(Math.random() * colors.length)];
		const randomAngle = Math.floor(Math.random() * 9) - 4;
		tag.style.backgroundColor = randomColor.bg;
		tag.style.color = randomColor.text;
		tag.style.setProperty("--tag-rotation", `${randomAngle}deg`);
	});
}
