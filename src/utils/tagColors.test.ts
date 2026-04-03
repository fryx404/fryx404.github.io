import { describe, it, expect, beforeEach, afterAll, spyOn } from 'bun:test';
import { GlobalRegistrator } from '@happy-dom/global-registrator';
import { applyRandomTagColors, TAG_COLORS } from './tagColors';

// Setup DOM environment
GlobalRegistrator.register();

describe('applyRandomTagColors', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
	});

	afterAll(() => {
		GlobalRegistrator.unregister();
	});

	it('should do nothing if no elements match the selector', () => {
		applyRandomTagColors('.non-existent-class');
		expect(document.body.innerHTML).toBe('');
	});

	it('should apply correct styles and CSS variables deterministically using mocked Math.random', () => {
		// Create elements
		document.body.innerHTML = `
			<div class="tag">Tag 1</div>
			<div class="tag">Tag 2</div>
		`;

		// Mock Math.random to return predictable values
		// We need two values per tag: one for color index, one for angle
		// colors length is 6.
		// Tag 1: color index (0.1 * 6 = 0.6 -> floor(0) -> index 0), angle (0.2 * 9 = 1.8 -> floor(1) - 4 = -3deg)
		// Tag 2: color index (0.5 * 6 = 3.0 -> floor(3) -> index 3), angle (0.8 * 9 = 7.2 -> floor(7) - 4 = 3deg)

		const randomValues = [0.1, 0.2, 0.5, 0.8];
		let callCount = 0;
		const randomSpy = spyOn(Math, 'random').mockImplementation(() => {
			return randomValues[callCount++];
		});

		applyRandomTagColors('.tag');

		const tags = document.querySelectorAll<HTMLElement>('.tag');
		expect(tags.length).toBe(2);

		// Verify Tag 1
		// Note: happy-dom's CSS parser silently drops `color-mix` since it's a newer CSS feature it doesn't fully support
		// For tests, we'll verify the properties that *are* parsed correctly
		expect(tags[0].style.color).toBe(TAG_COLORS[0].text);
		expect(tags[0].style.getPropertyValue('--tag-rotation')).toBe('-3deg');

		// Verify Tag 2
		expect(tags[1].style.color).toBe(TAG_COLORS[3].text);
		expect(tags[1].style.getPropertyValue('--tag-rotation')).toBe('3deg');

		randomSpy.mockRestore();
	});

	it('should accept and use a custom array of colors', () => {
		document.body.innerHTML = '<span class="custom-tag">Custom</span>';

		const customColors = [
			{ bg: 'rgb(255, 0, 0)', text: 'white' }
		];

		const randomSpy = spyOn(Math, 'random').mockReturnValue(0); // Will pick index 0, angle -4deg

		applyRandomTagColors('.custom-tag', customColors);

		const tag = document.querySelector<HTMLElement>('.custom-tag');

		expect(tag?.style.backgroundColor).toBe('rgb(255, 0, 0)');
		expect(tag?.style.color).toBe('white');
		expect(tag?.style.getPropertyValue('--tag-rotation')).toBe('-4deg');

		randomSpy.mockRestore();
	});
});
