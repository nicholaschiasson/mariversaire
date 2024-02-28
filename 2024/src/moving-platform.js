import Platform from "./platform.js";

const VELOCITY = 250;

export default class MovingPlatform extends Platform {
	direction;

	/**
	 * @param {GameState} gameState
	 * @param {HTMLImageElement} texture
	 * @param {Player} player
	 * @param {number} positionY
	 */
	constructor(gameState, player, positionY) {
		super(gameState, player, positionY);
		this.direction = Math.round(Math.random()) * 2 - 1;
	}

	/**
	 * @param {GameState} gameState
	 * @param {number} deltaTime
	 */
	update(gameState, deltaTime) {
		this.position.x += this.direction * VELOCITY * deltaTime;
		const intersect = Math.max(-this.position.x, this.position.x + this.dimensions.x - gameState.canvas.width);
		if (
			(this.direction < 0 && this.position.x < 0)
			|| (this.direction > 0 && this.position.x + this.dimensions.x > gameState.canvas.width)
		) {
			this.direction *= -1;
			this.position.x += intersect * this.direction * 2;
		}
		super.update(gameState, deltaTime);
	}
}
