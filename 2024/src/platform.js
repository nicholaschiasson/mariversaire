import Entity from "./entity.js";
import GameState from "./game-state.js";
import Player from "./player.js";
import Vector from "./vector.js";

export default class Platform extends Entity {
	player;

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
	 * @param {Player} player
	 * @param {number} positionY
	 */
	constructor(gameState, player, positionY) {
		const platformWidth = gameState.canvas.width / Platform.widthToScreenWidthFactor;
		const platformHeight = platformWidth / Platform.heightToWidthFactor;
		const platformX = Math.random() * (gameState.canvas.width - platformWidth);
		const position = new Vector(platformX, positionY ?? 0);
		const dimensions = new Vector(platformWidth, platformHeight);

		super(gameState, position, dimensions);
		this.player = player;
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

		// check for player collision
		const playerBottom = this.player.position.y + this.player.dimensions.y;
		const playerRight = this.player.position.x + this.player.dimensions.x;
		const intersection = playerBottom - this.position.y;
		if (
			this.player.velocity.y > 0
			&& intersection > 0
			&& this.position.y > playerBottom - this.player.velocity.y
			&& this.position.x < playerRight
			&& (this.position.x + this.dimensions.x) > this.player.position.x
		) {
			this.player.collide(gameState, this, intersection);
			this.collide(gameState, this.player, intersection);
		}
	}

	/**
	 * @param {GameState} gameState
	 * @param {Entity} entity
	 * @param {number} intersection
	 */
	collide(gameState, entity, intersection) {}
}
