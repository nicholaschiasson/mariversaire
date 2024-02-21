export default class Texture {
	/**
	 * @param {string} url 
	 */
  static FromUrl(url) {
    const img = document.createElement("img");
    img.src = url;
    return img;
  }
}
