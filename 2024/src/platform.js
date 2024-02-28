import Entity from "./entity.js";
import GameState from "./game-state.js";
import Vector from "./vector.js";

export default class Platform extends Entity {

	static get widthToScreenWidthFactor() {
		return 4;
	}

	static get heightToWidthFactor() {
		return 5;
	}

	static get heightToScreenWidthFactor() {
		return this.heightToWidthFactor * this.widthToScreenWidthFactor;
	}

	/**
	 * @param {GameState} gameState
	 * @param {HTMLImageElement} texture
	 * @param {number} positionY
	 */
	constructor(gameState, positionY) {
		const platformWidth = gameState.canvas.width / Platform.widthToScreenWidthFactor;
		const platformHeight = platformWidth / Platform.heightToWidthFactor;
		const platformX = Math.random() * (gameState.canvas.width - platformWidth);
		const position = new Vector(platformX, positionY ?? 0);
		const dimensions = new Vector(platformWidth, platformHeight);

		super(gameState, position, dimensions);
	}

	/**
	 * @param {GameState} gameState
	 * @param {number} deltaTime
	 */
	update(gameState, deltaTime) {
		if (this.position.y > gameState.canvas.height) {
			this.alive = false;
			return;
		}
	}

	/**
	 * @param {GameState} gameState
	 * @param {Entity} entity
	 * @param {number} intersection
	 */
	collide(gameState, entity, intersection) {
		gameState.sound.play(gameState, this);
	}
}
