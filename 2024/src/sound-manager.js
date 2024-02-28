import Entity from "./entity.js";
import GameState from "./game-state.js";

export default class SoundManager {
	enabled;

	/**
	 * @param {boolean} [enabled=false]
	 */
	constructor(enabled = false) {
		this.enabled = enabled;
	}

	/**
	 * @param {GameState} gameState 
	 * @param {Entity} entity
	 * @param {string} name 
	 */
	play(gameState, entity, name) {
		if (this.enabled) {
			let sound = gameState.content.sound(entity);
			if (sound && name) {
				sound = sound[name];
			}
			if (sound) {
				sound.fastSeek(0);
				sound.play();
			}
		}
	}
}
