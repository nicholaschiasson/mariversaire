const KEYBOARD_LAYOUT = [
	["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
	["a", "s", "d", "f", "g", "h", "j", "k", "l", "'"],
	["z", "x", "c", "v", "b", "n", "m", ",", ".", "?"]
];

export default class KeyboardLayout {
	static getAdjacent(key) {
		const flatLayout = KEYBOARD_LAYOUT.flat();
		const keyIndex = flatLayout.indexOf(key);
		if (keyIndex < 0) {
			// Intentionally not erroring here so that the space and backspace keys pass.
			return key;
		}
		const xLen = KEYBOARD_LAYOUT[0].length;
		const yLen = KEYBOARD_LAYOUT.length;
		const xIndex = keyIndex % xLen;
		const yIndex = Math.floor(keyIndex / xLen);
		const randAxis = Math.round(Math.random());
		const y = randAxis ? Math.max(Math.min(yIndex + Math.round((0.5 - Math.random()) * 2), yLen - 1), 0) : yIndex;
		const x = !randAxis ? Math.max(Math.min(xIndex + Math.round((0.5 - Math.random()) * 2), xLen - 1), 0) : xIndex;
		return KEYBOARD_LAYOUT[y][x];
	}
}
