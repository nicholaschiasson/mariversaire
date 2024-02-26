import Texture from "./texture.js";
import Player from "./player.js";
import Platform from "./platform.js";
import MovingPlatform from "./moving-platform.js";
import VanishingPlatform from "./vanishing-platform.js";
import BrokenPlatform from "./broken-platform.js";
import Background from "./background.js";

export default class Content {
	#texture;

	constructor() {
		this.#texture = {};
		this.#texture[Background.name] = Texture.FromUrl("./rsrc/images/background.jpg");
		this.#texture[Player.name] = Texture.FromUrl("./rsrc/images/player.png");
		this.#texture[Platform.name] = Texture.FromUrl("./rsrc/images/hold-01.png");
		this.#texture[MovingPlatform.name] = Texture.FromUrl("./rsrc/images/hold-02.png");
		this.#texture[VanishingPlatform.name] = Texture.FromUrl("./rsrc/images/hold-03.png");
		this.#texture[BrokenPlatform.name] = Texture.FromUrl("./rsrc/images/hold-04.png");
	}

	/**
	 * @returns {HTMLImageElement}
	 */
	texture(type) {
		return this.#texture[type.name];
	}
}
