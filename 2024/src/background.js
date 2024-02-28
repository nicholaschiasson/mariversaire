import Entity from "./entity.js";
import GameState from "./game-state.js";
import Vector from "./vector.js";

export default class Background extends Entity {
	/**
	 * @param {GameState} gameState
	 */
	constructor(gameState) {
		super(gameState, new Vector(0, 0));
		this.layer = -1;
	}

	/**
	 * @param {GameState} gameState
	 * @param {number} deltaTime
	 */
	update(gameState, deltaTime) {
		const scale = gameState.canvas.width / this.texture.width;
		if (this.position.y >= this.texture.height * scale) {
			this.position.y = 0;
		}
	}

	/**
	 * @param {GameState} gameState
	 */
	draw(gameState) {
		const scale = gameState.canvas.width / this.texture.width;
		const height = this.texture.height * scale;
		for (let y = this.position.y - height; y < gameState.canvas.height; y += height - 1) {
			gameState.context.drawImage(this.texture, this.position.x, y, gameState.canvas.width, height);
		}
	}
}
