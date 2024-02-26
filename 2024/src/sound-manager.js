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
	 */
	play(gameState, entity) {
		if (this.enabled) {
			const sound = gameState.content.sound(entity);
			if (sound) {
				sound.fastSeek(0);
				sound.play();
			}
		}
	}
}
