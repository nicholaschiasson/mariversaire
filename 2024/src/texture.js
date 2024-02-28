export default class Texture {
	/**
	 * @param {string} url
	 */
	static FromUrl(url) {
		const img = new Image();
		img.src = url;
		return img;
	}
}
