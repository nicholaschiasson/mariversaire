import Entity from "./entity.js";
import GameState from "./game-state.js";
import Vector from "./vector.js";

export default class Fill extends Entity {
	color;

	/**
	 * @param {GameState} gameState
	 * @param {string} color 
	 * @param {Vector} position
	 * @param {Vector} dimensions
	 */
	constructor(gameState, color, position, dimensions) {
		super(gameState, position ?? new Vector(0, 0), dimensions ?? new Vector(gameState.canvas.width, gameState.canvas.height));
		this.color = color;
	}

	/**
	 * @param {GameState} gameState
	 */
	draw(gameState) {
		gameState.context.fillStyle = this.color;
		gameState.context.fillRect(this.position.x, this.position.y, this.dimensions.x, this.dimensions.y);
	}
}
