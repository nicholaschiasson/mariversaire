export default class BoundingBox {
	left;
	right;
	top;
	bottom;

	/**
	 * @param {number} left
	 * @param {number} right
	 * @param {number} top
	 * @param {number} bottom
	 */
	constructor(left = 0, right = 0, top = 0, bottom = 0) {
		this.left = left;
		this.right = right;
		this.top = top;
		this.bottom = bottom;
	}
}
