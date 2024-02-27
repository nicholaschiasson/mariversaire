import Entity from "./entity.js";
import GameState from "./game-state.js";
import Platform from "./platform.js";
import MovingPlatform from "./moving-platform.js";
import VanishingPlatform from "./vanishing-platform.js";
import BrokenPlatform from "./broken-platform.js";
import Vector from "./vector.js";

const GRAVITY = 28;
const JUMP_FORCE = 18;

export default class Player extends Entity {
	onGameOver;
	velocity;

	/**
	 * @param {GameState} gameState
	 */
	constructor(gameState) {
		const playerWidth = gameState.canvas.width / 7;
		const position = new Vector(
			gameState.canvas.width / 2 - playerWidth / 2,
			gameState.canvas.height / 2 - playerWidth / 2,
		);
		const dimensions = new Vector(playerWidth, 0);

		super(gameState, position, dimensions);
		this.dimensions.y = this.texture.height * (playerWidth / this.texture.width);
		this.velocity = new Vector(0, 0);
	}

	/**
	 * @param {GameState} gameState
	 * @param {number} deltaTime
	 */
	update(gameState, deltaTime) {
		// calculate velocity
		const mouseMovement = gameState.input.mouse.movement;
		if (document.pointerLockElement) {
			this.velocity.x = mouseMovement.x / 2;
		}

		this.velocity.y += GRAVITY * deltaTime;

		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		this.position.x = (this.position.x + gameState.canvas.width) % gameState.canvas.width;

		this.climb(gameState);

		if (this.position.y > gameState.canvas.height) {
			this.alive = false;
			if (gameState.playing) {
				gameState.playing = false;
				if (this.onGameOver) {
					this.onGameOver(gameState);
				}
			}
		}
	}

	/**
	 * @param {GameState} gameState
	 */
	climb(gameState) {
		const moveUpBoundary = gameState.canvas.height / 2 - this.position.y - this.dimensions.y / 2;
		if (moveUpBoundary > 0) {
			gameState.world.y += moveUpBoundary;
			gameState.score.score += moveUpBoundary / 100;
		}
	}

	/**
	 * @param {GameState} gameState
	 * @param {Entity} entity
	 * @param {number} intersection
	 */
	collide(gameState, entity, intersection) {
		switch (entity.constructor) {
			case Platform:
			case MovingPlatform:
			case VanishingPlatform:
				this.position.y -= intersection;
				this.velocity.y = -JUMP_FORCE;
				this.climb(gameState);
				break;
			case BrokenPlatform:
				break;
			default:
				console.warn(`unhandled collision with entity of type ${entity.constructor.name}`);
				break;
		}
	}
}
