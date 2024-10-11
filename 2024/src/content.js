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
		this.#audio.sound[Player.name] = new Audio("./rsrc/audio/sounds/miaou.mp3");
		this.#audio.sound[Platform.name] = new Audio("./rsrc/audio/sounds/boing.mp3");
		this.#audio.sound[MovingPlatform.name] = new Audio("./rsrc/audio/sounds/boing.mp3");
		this.#audio.sound[VanishingPlatform.name] = new Audio("./rsrc/audio/sounds/pop.mp3");
		this.#audio.sound[BrokenPlatform.name] = new Audio("./rsrc/audio/sounds/crack.mp3");
		this.#audio.sound[undefined] = {
			reward: new Audio("./rsrc/audio/sounds/reward.mp3"),
			whoosh: new Audio("./rsrc/audio/sounds/whoosh.mp3")
		};
		this.#texture = {};
		this.#texture[Background.name] = Texture.FromUrl("./rsrc/images/background.jpg");
		this.#texture[Player.name] = Texture.FromUrl("./rsrc/images/player.png");
		this.#texture[Platform.name] = Texture.FromUrl("./rsrc/images/hold-01.png");
		this.#texture[MovingPlatform.name] = Texture.FromUrl("./rsrc/images/hold-02.png");
		this.#texture[VanishingPlatform.name] = Texture.FromUrl("./rsrc/images/hold-03.png");
		this.#texture[BrokenPlatform.name] = Texture.FromUrl("./rsrc/images/hold-04.png");
		this.#texture[undefined] = {
			playerWithShoes: Texture.FromUrl("./rsrc/images/player-with-shoes.png"),
			title: [
				Texture.FromUrl("./rsrc/images/title-01.png"),
				Texture.FromUrl("./rsrc/images/title-02.png"),
				Texture.FromUrl("./rsrc/images/title-03.png"),
				Texture.FromUrl("./rsrc/images/title-04.png"),
				Texture.FromUrl("./rsrc/images/title-05.png")
			]
		};
		addEventListener("click", this.#requestPlaybackPermission);
	}

	#requestPlaybackPermission = async () => {
		const sound = this.#audio.sound[undefined].whoosh;
		try {
			await sound.play();
		} catch (e) {
			console.warn(e);
		}
		sound.pause();
		sound.currentTime = 0;
		removeEventListener("click", this.#requestPlaybackPermission);
	};

	async load() {
		const promises = [];
		const media = [];
		const content = [];
		let elts = Object.values(this.#audio).concat(Object.values(this.#texture));

		for (let elt = elts.shift(); elt !== undefined; elt = elts.shift()) {
			if (elt instanceof HTMLMediaElement) {
				media.push(elt);
				continue;
			}
			if (elt instanceof HTMLElement) {
				content.push(elt);
				continue;
			}
			elts = elts.concat(Object.values(elt));
		}

		for (let m of media) {
			promises.push(
				new Promise((res) =>
					m.addEventListener("canplaythrough", () => res()),
				),
			);
		}

		for (let c of content) {
			promises.push(
				new Promise((res) =>
					c.addEventListener("load", () => res()),
				),
			);
		}

		await Promise.all(promises);
	}

	/**
	 * @param {number} [index=-1]
	 * @returns {HTMLAudioElement}
	 */
	music(index = -1) {
		if (index < 0) {
			return this.#audio.music[Math.floor(Math.random() * this.#audio.music.length)];
		} else {
			return this.#audio.music[index];
		}
	}

	/**
	 * @param {Entity} entity
	 * @returns {HTMLAudioElement}
	 */
	sound(entity) {
		return this.#audio.sound[entity?.constructor?.name];
	}

	/**
	 * @param {Entity} entity
	 * @returns {HTMLImageElement}
	 */
	texture(entity) {
		return this.#texture[entity?.constructor?.name];
	}
}
