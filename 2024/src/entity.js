import GameState from "./game-state.js";
import Vector from "./vector.js";

export default class Entity {
	position;
	texture;
	dimensions;

	alive;
	fixed;
	layer;

	/**
	 * @param {GameState} gameState
	 * @param {Vector} position
	 * @param {Vector} dimensions
	 */
	constructor(gameState, position, dimensions) {
		this.position = position;
		this.texture = gameState.content.texture(this);
		this.dimensions = dimensions;
		this.alive = true;
		this.fixed = false;
		this.layer = 0;
	}

	/**
	 * @param {GameState} gameState
	 */
	draw(gameState) {
		if (this.position && this.texture && this.dimensions) {
			gameState.context.drawImage(this.texture, this.position.x, this.position.y, this.dimensions.x, this.dimensions.y);
			const screenIntersection = this.position.x + this.dimensions.x - gameState.canvas.width;
			if (screenIntersection > 0) {
				gameState.context.drawImage(
					this.texture,
					screenIntersection - this.dimensions.x,
					this.position.y,
					this.dimensions.x,
					this.dimensions.y,
				);
			}
		}
	}
}
