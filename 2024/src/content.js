import Texture from "./texture.js";
import Player from "./player.js";
import Platform from "./platform.js";
import MovingPlatform from "./moving-platform.js";
import VanishingPlatform from "./vanishing-platform.js";
import BrokenPlatform from "./broken-platform.js";

export default class Content {
	#texture;

	constructor() {
		this.#texture = {};
		this.#texture[Player.name] = Texture.FromUrl("/rsrc/images/birthday-cake.png");
		this.#texture[Platform.name] = Texture.FromUrl("/rsrc/images/birthday-cake.png");
		this.#texture[MovingPlatform.name] = Texture.FromUrl("/rsrc/images/birthday-cake.png");
		this.#texture[BrokenPlatform.name] = Texture.FromUrl("/rsrc/images/birthday-cake.png");
		this.#texture[VanishingPlatform.name] = Texture.FromUrl("/rsrc/images/birthday-cake.png");
	}

	/**
	 * @returns {HTMLImageElement}
	 */
	texture(type) {
		return this.#texture[type.name];
	}
}
