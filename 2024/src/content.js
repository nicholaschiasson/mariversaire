import Texture from "./texture.js";
import Player from "./player.js";
import Platform from "./platform.js";
import MovingPlatform from "./moving-platform.js";
import VanishingPlatform from "./vanishing-platform.js";
import BrokenPlatform from "./broken-platform.js";
import Background from "./background.js";
import Entity from "./entity.js";

export default class Content {
	#audio;
	#texture;

	constructor() {
		this.#audio = {
			music: [
	      new Audio("./rsrc/audio/music/Mitski - My Love Mine All Mine.mp3"),
	      new Audio("./rsrc/audio/music/NewJeans - ETA.mp3"),
	      new Audio("./rsrc/audio/music/The Cranberries - Dreams.mp3"),
	      new Audio("./rsrc/audio/music/The Weeknd, Madonna, Playboi Carti - Popular.mp3"),
				new Audio("./rsrc/audio/music/Bilmuri - KEEPINITBEEFY.mp3"),
	      new Audio("./rsrc/audio/music/Bilmuri - VASCULAR DEMI GOTH.mp3"),
	      new Audio("./rsrc/audio/music/Eels - I Need Some Sleep.mp3"),
	      new Audio("./rsrc/audio/music/Justin Hurwitz - Mia & Sebastians Theme.mp3")
			],
			sound: {}
		};
		this.#audio.sound[Platform.name] = new Audio("./rsrc/audio/sounds/boing.mp3");
		this.#audio.sound[MovingPlatform.name] = new Audio("./rsrc/audio/sounds/boing.mp3");
		this.#texture = {};
		this.#texture[Background.name] = Texture.FromUrl("./rsrc/images/background.jpg");
		this.#texture[Player.name] = Texture.FromUrl("./rsrc/images/player.png");
		this.#texture[Platform.name] = Texture.FromUrl("./rsrc/images/hold-01.png");
		this.#texture[MovingPlatform.name] = Texture.FromUrl("./rsrc/images/hold-02.png");
		this.#texture[VanishingPlatform.name] = Texture.FromUrl("./rsrc/images/hold-03.png");
		this.#texture[BrokenPlatform.name] = Texture.FromUrl("./rsrc/images/hold-04.png");
	}

	/**
	 * @param {number} [index=-1]
	 * @returns {HTMLAudioElement}
	 */
	music(index = -1) {
		if (index < 0) {
			return this.#audio.music[Math.floor(Math.random() * this.#audio.music.length)]
		} else {
			return this.#audio.music[index];
		}
	}

	/**
	 * @param {Entity} entity
	 * @returns {HTMLAudioElement}
	 */
	sound(entity) {
		return this.#audio.sound[entity.constructor?.name];
	}

	/**
	 * @returns {HTMLImageElement}
	 */
	texture(type) {
		return this.#texture[type.name];
	}
}
